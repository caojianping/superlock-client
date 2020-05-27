import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component, Model, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { CarrierInfoModel, WithdrawFormModel } from '@/ts/models';

import VerifyModal from '@/components/verify/verify-modal';

const carrierModule = namespace('carrier');

@Component({
    name: 'WithdrawModal',
    components: { VerifyModal }
})
export default class WithdrawModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model

    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;

    @carrierModule.State('carrierInfo') carrierInfo?: CarrierInfoModel | null;
    @carrierModule.State('withdrawForm') withdrawForm!: WithdrawFormModel;
    @carrierModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @carrierModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @carrierModule.Action('withdrawCoin') withdrawCoin!: (isCode?: boolean) => any;

    isShow: boolean = this.value; // 是否显示模态框

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let withdrawForm = Utils.duplicate(this.withdrawForm);
        withdrawForm[key] = value;
        this.setStates({ withdrawForm });
    }

    // 提现全部余额
    withdrawAll() {
        let withdrawForm = Utils.duplicate(this.withdrawForm);
        withdrawForm.value = withdrawForm.maxAmount;
        this.setStates({ withdrawForm });
    }

    // 提交提现表单
    async submit(isCode?: boolean) {
        try {
            let result = await this.withdrawCoin(isCode);
            if (!result) Prompt.error('提现失败');
            else {
                Prompt.success('提现成功');
                this.$emit('close', false);
                this.$emit('submit');
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 初始化数据
    initData() {
        let withdrawForm = new WithdrawFormModel(),
            carrierInfo = this.carrierInfo;
        if (carrierInfo) {
            withdrawForm.carrierId = 0; // todo: 运营商编号待讨论
            withdrawForm.maxAmount = carrierInfo.bcbBalance;
        }
        this.setStates({ withdrawForm });
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            this.initData();
        }
    }
}
