import Vue from 'vue';
import { namespace, State, Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import {
    QuotaModel,
    UserInfoModel,
    TransferFormModel,
    TransferChildModel,
    TransferModel
} from '@/ts/models';
import { TransferService } from '@/ts/services';

import { Toast, Field, Icon, Button } from 'vant';
import Header from '@/components/common/header';
import PasswordModal from '@/components/common/password-modal';

const userModule = namespace('user');
const transferModule = namespace('transfer');

@Component({
    name: 'TransferIndex',
    components: { Field, Icon, Button, Header, PasswordModal }
})
export default class TransferIndex extends Vue {
    @State('quota') quota?: QuotaModel | null;
    @Action('fetchQuota') fetchQuota!: () => any;

    @userModule.State('userInfo') userInfo!: UserInfoModel;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: () => any;

    @transferModule.State('transferForm') transferForm!: TransferFormModel;
    @transferModule.State('transfers') transfers!: Array<TransferModel>;
    @transferModule.State('selectedTransferChild')
    selectedTransferChild?: TransferChildModel;
    @transferModule.Mutation(TYPES.SET_STATES) setStates!: (
        payload: any
    ) => any;
    @transferModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @transferModule.Action('executeTransfer') executeTransfer!: () => any;
    @transferModule.Action('fetchTransfers') fetchTransfers!: () => any;

    isShow: boolean = false; // 是否显示密码模态框

    // 跳转转账下级页面
    goChild() {
        this.$router.push('/transfer/child');
    }

    // 转账全部金额
    transferAll() {
        let transferForm = Utils.duplicate(this.transferForm);
        transferForm.quota = this.quota ? this.quota.amount : 0;
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
        let haveFundPasswd = this.userInfo.haveFundPasswd;
        if (!haveFundPasswd) {
            Prompt.info('您未设置资金密码，请先设置资金密码').then(() => {
                this.$router.push({
                    path: '/security/fund/password',
                    query: { from: '/transfer/index' }
                });
            });
            return;
        }

        let result: ValidationResult = TransferService.validateTransferForm(
            this.transferForm,
            false
        );
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
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
            if (!result) Prompt.error('转账失败');
            else {
                Prompt.success('转账成功');
                await this.fetchQuota();
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 获取数据
    async fetchData() {
        Toast.loading({
            mask: true,
            duration: 0,
            message: '加载中...'
        });
        await await this.fetchQuota();
        await this.fetchUserInfo();

        let transferForm = Utils.duplicate(this.transferForm);
        transferForm.maxAmount = this.quota ? this.quota.amount : 0;

        let selectedTransferChild = this.selectedTransferChild;
        if (selectedTransferChild) {
            // 如果已经有选择的转账下级
            transferForm.toUid = selectedTransferChild.uid;
            this.setStates({ transferForm });
        }
        Toast.clear();
    }

    mounted() {
        this.fetchData();
    }
}
