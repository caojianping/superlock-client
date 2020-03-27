import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { RechargeCoinModel } from '@/ts/models';

import { CellGroup, Cell } from 'vant';
import Header from '@/components/layout/header';
import Spin from '@/components/common/spin';

const rechargeModule = namespace('recharge');

@Component({
    name: 'RechargeAddresses',
    components: { CellGroup, Cell, Header, Spin }
})
export default class RechargeAddresses extends Vue {
    @rechargeModule.State('coins') coins!: Array<RechargeCoinModel>;

    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (
        payload: any
    ) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @rechargeModule.Action('fetchRechargeCoins') fetchRechargeCoins!: () => any;

    isSpinning: boolean = false;

    // 前往充值地址页面
    goAddress(coin: RechargeCoinModel) {
        this.$router.push(`/recharge/address/${coin.symbol}`);
    }

    // 获取数据
    async fetchData() {
        let coins = this.coins;
        if (coins.length <= 0) {
            this.isSpinning = true;
            await this.fetchRechargeCoins();
            this.isSpinning = false;
        }
    }

    mounted() {
        this.fetchData();
    }
}
