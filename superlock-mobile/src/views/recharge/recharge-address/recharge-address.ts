import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { RechargeCoinModel } from '@/ts/models';

import { CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const rechargeModule = namespace('recharge');

@Component({
    name: 'RechargeAddress',
    components: { CellGroup, Cell, Header }
})
export default class RechargeAddress extends Vue {
    @rechargeModule.State('rechargeCoins') rechargeCoins?: Array<RechargeCoinModel>;
    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @rechargeModule.Action('fetchRechargeCoins') fetchRechargeCoins!: (isLoading: boolean) => any;

    created() {
        this.clearStates();
    }

    mounted() {
        this.fetchRechargeCoins(true);
    }
}
