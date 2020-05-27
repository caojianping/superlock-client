import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { CarrierInfoModel } from '@/ts/models';

import ExchangeModal from '@/components/carrier/exchange-modal';
import WithdrawModal from '@/components/carrier/withdraw-modal';

const carrierModule = namespace('carrier');

@Component({
    name: 'CarrierIndex',
    components: { ExchangeModal, WithdrawModal }
})
export default class CarrierIndex extends Vue {
    @carrierModule.State('carrierInfo') carrierInfo?: CarrierInfoModel | null;
    @carrierModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @carrierModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @carrierModule.Action('fetchCarrierInfo') fetchCarrierInfo!: () => any;

    isExchangeShow: boolean = false; // 是否显示兑换模态框
    isWithdrawShow: boolean = false; // 是否显示提现模态框

    // 打开模态框
    openModal(key: string) {
        this[key] = true;
    }

    // 处理模态框submit事件
    handleModalSubmit() {
        this.fetchCarrierInfo();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchCarrierInfo();
    }
}
