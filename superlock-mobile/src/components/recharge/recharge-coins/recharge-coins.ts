import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component, Model, Watch } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { RechargeCoinModel } from '@/ts/models';

import { Popup, CellGroup, Cell } from 'vant';
import Spin from '@/components/common/spin';

const rechargeModule = namespace('recharge');

@Component({
    name: 'RechargeCoins',
    components: { Popup, CellGroup, Cell, Spin }
})
export default class RechargeCoins extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model

    @rechargeModule.State('rechargeCoins') rechargeCoins?: Array<RechargeCoinModel>;
    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @rechargeModule.Action('fetchRechargeCoins') fetchRechargeCoins!: (isLoading: boolean) => any;

    isShow: boolean = this.value;
    isSpinning: boolean = false;

    // 处理弹出框close事件
    handlePopupClose() {
        this.$emit('close', false);
    }

    // 获取数据
    async fetchData() {
        let rechargeCoins = this.rechargeCoins;
        if (!rechargeCoins || rechargeCoins.length <= 0) {
            this.isSpinning = true;
            await this.fetchRechargeCoins(false);
            this.isSpinning = false;
        }
    }

    mounted() {
        this.fetchData();
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            this.fetchData();
        }
    }
}
