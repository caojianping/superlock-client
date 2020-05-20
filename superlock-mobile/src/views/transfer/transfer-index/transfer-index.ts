import Vue from 'vue';
import { namespace, State, Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt, From } from '@/ts/common';
import { UsableQuotaModel, UserInfoModel, TransferFormModel, TransferChildModel, TransferModel } from '@/ts/models';
import { TransferService } from '@/ts/services';

import { Toast, PullRefresh, Field, Icon, Button } from 'vant';
import Header from '@/components/common/header';
import PasswordModal from '@/components/common/password-modal';

const userModule = namespace('user');
const transferModule = namespace('transfer');

@Component({
    name: 'TransferIndex',
    components: { PullRefresh, Field, Icon, Button, Header, PasswordModal }
})
export default class TransferIndex extends Vue {
    @State('usableQuota') usableQuota?: UsableQuotaModel | null;
    @Action('fetchUsableQuota') fetchUsableQuota!: () => any;

    @userModule.State('userInfo') userInfo?: UserInfoModel | null;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: (isLoading?: boolean) => any;

    @transferModule.State('transferForm') transferForm!: TransferFormModel;
    @transferModule.State('transfers') transfers!: Array<TransferModel>;
    @transferModule.State('selectedTransferChild') selectedTransferChild?: TransferChildModel;
    @transferModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @transferModule.Mutation(TYPES.CLEAR_STATES) clearStates!: (withoutSelected: boolean) => any;
    @transferModule.Action('executeTransfer') executeTransfer!: () => any;
    @transferModule.Action('fetchTransfers') fetchTransfers!: () => any;

    isPulling: boolean = false; // 是否下拉刷新
    isShow: boolean = false; // 是否显示密码模态框

    // 转账全部金额
    transferAll() {
        let transferForm = Utils.duplicate(this.transferForm);
        transferForm.quota = this.usableQuota ? this.usableQuota.amount : 0;
        this.setStates({ transferForm });
    }

    // 处理Field组件input事件
    handleFieldInput(key: string, value: string) {
        let transferForm = Utils.duplicate(this.transferForm);
        transferForm[key] = value;
        this.setStates({ transferForm });
    }

    // 提交转账
    async submit() {
        let result: ValidationResult = TransferService.validateTransferForm(this.transferForm, false);
        if (!result.status) return Prompt.error(Utils.getFirstValue(result.data));

        if (!this.userInfo || !this.userInfo.haveFundPasswd) {
            Prompt.info('您未设置资金密码，请先设置资金密码').then(() => {
                From.setFundFrom('/transfer/index');
                this.$router.push({
                    path: '/security/fund/password',
                    query: { from: '/transfer/index' }
                });
            });
            return;
        }

        this.isShow = true;
    }

    // 处理密码模态框submit事件
    async handlePasswordModalSubmit(password: string) {
        let transferForm = Utils.duplicate(this.transferForm);
        transferForm.fundPasswd = password;
        this.setStates({ transferForm });

        try {
            let result = await this.executeTransfer();
            if (!result) this.$router.push({ path: '/transfer/result/0' });
            else
                this.$router.push({
                    path: '/transfer/result/1',
                    query: { amount: String(transferForm.quota) }
                });
        } catch (error) {
            this.$router.push({
                path: '/transfer/result/0',
                query: { msg: error.message || error }
            });
        }
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        Toast.loading({ mask: true, duration: 0, message: '加载中...' });
        (!this.usableQuota || isRefresh) && (await await this.fetchUsableQuota());
        (!this.userInfo || isRefresh) && (await this.fetchUserInfo());

        let transferForm = Utils.duplicate(this.transferForm);
        transferForm.maxAmount = this.usableQuota ? this.usableQuota.amount : 0;

        // 如果已经有选择的转账下级
        let selectedTransferChild = this.selectedTransferChild;
        if (selectedTransferChild) {
            transferForm.toUid = selectedTransferChild.uid;
        }
        this.setStates({ transferForm });
        Toast.clear();
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData(true);
        this.isPulling = false;
        Toast('刷新成功');
    }

    mounted() {
        this.fetchData(false);
    }
}
