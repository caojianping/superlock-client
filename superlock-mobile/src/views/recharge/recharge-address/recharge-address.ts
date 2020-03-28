import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { RechargeCoinModel } from '@/ts/models';

import { CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';
import Spin from '@/components/common/spin';

const rechargeModule = namespace('recharge');

@Component({
    name: 'RechargeAddress',
    components: { CellGroup, Cell, Header, Spin }
})
export default class RechargeAddress extends Vue {
    @rechargeModule.State('rechargeCoins') rechargeCoins!: Array<
        RechargeCoinModel
    >;

    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (
        payload: any
    ) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @rechargeModule.Action('fetchRechargeCoins') fetchRechargeCoins!: () => any;

    isSpinning: boolean = false;

    // 获取数据
    async fetchData() {
        let rechargeCoins = this.rechargeCoins;
        if (rechargeCoins.length <= 0) {
            this.isSpinning = true;
            await this.fetchRechargeCoins();
            this.isSpinning = false;
        }
    }

    mounted() {
        this.fetchData();
    }
}
