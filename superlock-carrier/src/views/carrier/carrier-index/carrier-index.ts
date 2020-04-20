import Vue from 'vue';
import { namespace, State, Mutation } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { CarrierInfoModel, WithdrawFormModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';
import ExchangeModal from '@/components/carrier/exchange-modal';
import WithdrawModal from '@/components/carrier/withdraw-modal';

const carrierModule = namespace('carrier');

const enum ModalType {
    ExchangeModal = 1, // 兑换模态框
    WithdrawModal = 2 // 提现模态框
}

@Component({
    name: 'CarrierIndex',
    components: { SecondVerify, ExchangeModal, WithdrawModal }
})
export default class CarrierIndex extends Vue {
    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;
    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;
    @Mutation(TYPES.CLEAR_STATES) clearRootStates!: () => any;

    @carrierModule.State('carrierInfo') carrierInfo?: CarrierInfoModel | null;
    @carrierModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @carrierModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @carrierModule.Action('fetchCarrierInfo') fetchCarrierInfo!: () => any;
    @carrierModule.Action('confirmExchange') confirmExchange!: (isCode?: boolean) => any;
    @carrierModule.Action('withdrawCoin') withdrawCoin!: (isCode?: boolean) => any;

    isExchangeShow: boolean = false; // 是否显示兑换模态框
    isWithdrawShow: boolean = false; // 是否显示提现模态框
    modalType: ModalType = ModalType.ExchangeModal; // 模态框类型

    // 打开模态框
    openModal(modalType: ModalType) {
        this.modalType = modalType;
        this[{ 1: 'isExchangeShow', 2: 'isWithdrawShow' }[modalType]] = true;
    }

    // 私有函数：提交兑换表单、提现表单
    async _submitForm(isCode?: boolean) {
        try {
            let modalType = this.modalType,
                msg = { 1: '兑换', 2: '提现' }[modalType],
                result = modalType === ModalType.ExchangeModal ? await this.confirmExchange(isCode) : await this.withdrawCoin(isCode);
            if (!result) Prompt.error(`${msg}失败`);
            else {
                Prompt.success(`${msg}成功`);
                await this.fetchCarrierInfo();
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理兑换模态框submit事件
    async handleExchangeModalSubmit(orderId: string) {
        this.setStates({ orderId });
        this._submitForm(false);
    }

    // 处理提现模态框submit事件
    async handleWithdrawModalSubmit(withdrawForm: WithdrawFormModel) {
        this.setStates({ withdrawForm });
        this._submitForm(false);
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit() {
        await this._submitForm(true);
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchCarrierInfo();
    }
}
