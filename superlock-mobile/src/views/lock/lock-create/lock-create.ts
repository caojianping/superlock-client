import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace, State } from 'vuex-class';
import { SessionStorage } from 'jts-storage';
import { ValidationResult } from 'jpts-validator';
import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { CONSTANTS } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { UserLockQuotaModel, ProjectModel, LockFormModel, AssetStatsModel, UserInfoModel } from '@/ts/models';
import { LockService } from '@/ts/services';

import { Toast, Field, Button } from 'vant';
import Header from '@/components/common/header';
import PasswordModal from '@/components/common/password-modal';

const userModule = namespace('user');
const lockModule = namespace('lock');
const projectModule = namespace('project');

@Component({
    name: 'LockCreate',
    components: { Field, Button, Header, PasswordModal }
})
export default class LockCreate extends Vue {
    @State('unitTypes') unitTypes!: Array<string>;

    @userModule.State('userInfo') userInfo!: UserInfoModel;
    @userModule.State('userLockQuota') userLockQuota?: UserLockQuotaModel | null;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: () => any;
    @userModule.Action('fetchUserLockQuota') fetchUserLockQuota!: () => any;

    @projectModule.State('assetStats') assetStats?: AssetStatsModel | null;
    @projectModule.Action('fetchAssetStats') fetchAssetStats!: () => any;

    @lockModule.State('lockProject') lockProject?: ProjectModel | null;
    @lockModule.State('lockForm') lockForm!: LockFormModel;
    @lockModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @lockModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @lockModule.Action('fetchMinLockAmount') fetchMinLockAmount!: () => any;
    @lockModule.Action('createLock') createLock!: () => any;

    isShow: boolean = false; // 是否显示密码模态框

    // 处理Field组件input事件
    handleFieldInput(key: string, value: string) {
        let lockForm = Utils.duplicate(this.lockForm);
        lockForm[key] = value;
        this.setStates({ lockForm });
    }

    // 提交锁仓
    async submit() {
        let haveFundPasswd = this.userInfo.haveFundPasswd;
        if (!haveFundPasswd) {
            Prompt.info('您未设置资金密码，请先设置资金密码').then(() => {
                this.$router.push({
                    path: '/security/fund/password',
                    query: { from: '/lock/create' }
                });
            });
            return;
        }

        let result: ValidationResult = LockService.validateLockForm(this.lockForm, false);
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
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
            let result = await this.createLock();
            if (!result) Prompt.error('锁仓成功');
            else {
                Prompt.success('锁仓成功');
                await this.fetchUserLockQuota();
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
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

    // 获取数据
    async fetchData() {
        Toast.loading({
            mask: true,
            duration: 0,
            message: '加载中...'
        });
        await this.fetchUserInfo();
        await this.fetchUserLockQuota();
        await this.fetchAssetStats();

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

    created() {
        this.clearStates();
        this.initData();
    }

    mounted() {
        this.fetchData();
    }
}
