import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace, State } from 'vuex-class';
import { SessionStorage } from 'jts-storage';
import { ValidationResult } from 'jpts-validator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { CONSTANTS } from '@/ts/config';
import { Prompt, From } from '@/ts/common';
import { UserLockQuotaModel, ProjectModel, LockFormModel, AssetStatsModel, UserInfoModel, LockResultModel } from '@/ts/models';
import { LockService } from '@/ts/services';

import { Toast, PullRefresh, Field, Button } from 'vant';
import Header from '@/components/common/header';
import PasswordModal from '@/components/common/password-modal';

const userModule = namespace('user');
const lockModule = namespace('lock');
const projectModule = namespace('project');

@Component({
    name: 'LockCreate',
    components: { PullRefresh, Field, Button, Header, PasswordModal }
})
export default class LockCreate extends Vue {
    @State('unitTypes') unitTypes!: Array<string>;

    @userModule.State('userInfo') userInfo?: UserInfoModel | null;
    @userModule.State('userLockQuota') userLockQuota?: UserLockQuotaModel | null;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: (isLoading?: boolean) => any;
    @userModule.Action('fetchUserLockQuota') fetchUserLockQuota!: () => any;

    @projectModule.State('assetStats') assetStats?: AssetStatsModel | null;
    @projectModule.Action('fetchAssetStats') fetchAssetStats!: () => any;

    @lockModule.State('lockProject') lockProject?: ProjectModel | null;
    @lockModule.State('lockForm') lockForm!: LockFormModel;
    @lockModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @lockModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @lockModule.Action('fetchMinLockAmount') fetchMinLockAmount!: () => any;
    @lockModule.Action('createLock') createLock!: () => any;

    isPulling: boolean = false; // 是否下拉刷新
    isShow: boolean = false; // 是否显示密码模态框

    // 处理Field组件input事件
    handleFieldInput(key: string, value: string) {
        let lockForm = Utils.duplicate(this.lockForm);
        lockForm[key] = value;
        this.setStates({ lockForm });
    }

    // 提交锁仓
    async submit() {
        let result: ValidationResult = LockService.validateLockForm(this.lockForm, false);
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        if (!this.userInfo || !this.userInfo.haveFundPasswd) {
            Prompt.info('您未设置资金密码，请先设置资金密码').then(() => {
                From.setFundFrom('/lock/create');
                this.$router.push({
                    path: '/security/fund/password',
                    query: { from: '/lock/create' }
                });
            });
            return;
        }

        this.isShow = true;
    }

    // 处理密码模态框submit事件
    async handlePasswordModalSubmit(password: string) {
        let lockForm = Utils.duplicate(this.lockForm);
        lockForm.fundPasswd = password;
        this.setStates({ lockForm });

        try {
            Toast.loading({ mask: true, duration: 0, message: '加载中...' });
            let lockResult = await this.createLock();
            if (!lockResult) {
                Toast.clear();
                Prompt.error('锁仓失败');
            } else {
                await this.fetchUserLockQuota();
                await this.fetchAssetStats();
                SessionStorage.setItem<LockResultModel>(CONSTANTS.LOCK_RESULT, lockResult);
                Toast.clear();
                this.$router.push('/lock/result');
            }
        } catch (error) {
            Toast.clear();
            Prompt.error(error.message || error);
        }
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        Toast.loading({ mask: true, duration: 0, message: '加载中...' });
        (!this.userLockQuota || isRefresh) && (await this.fetchUserLockQuota());
        (!this.userInfo || isRefresh) && (await this.fetchUserInfo());
        (!this.assetStats || isRefresh) && (await this.fetchAssetStats());

        let minAmount = await this.fetchMinLockAmount(),
            lockProject: any = Utils.duplicate(this.lockProject || {}),
            lockForm = new LockFormModel();
        lockForm.length = lockProject.length;
        lockForm.unit = lockProject.unit;
        lockForm.rate = lockProject.rate;
        lockForm.minAmount = minAmount;
        lockForm.maxAmount = this.assetStats ? this.assetStats.bcbHotAmount : 0;
        this.setStates({ lockForm });
        Toast.clear();
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData(true);
        this.isPulling = false;
        Toast('刷新成功');
    }

    // 初始化数据
    initData() {
        // 锁仓项目缓存数据校验处理
        if (!this.lockProject) {
            let lockProjectCache = SessionStorage.getItem<ProjectModel>(CONSTANTS.LOCK_PROJECT);
            if (!lockProjectCache) {
                Prompt.error('异常的锁仓项目信息，数据丢失');
                this.$router.push('/home/index');
                return;
            }

            this.setStates({ lockProject: lockProjectCache });
        }
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchData(false);
    }
}
