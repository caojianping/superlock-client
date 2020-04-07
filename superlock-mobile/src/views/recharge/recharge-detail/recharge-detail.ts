import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { RechargeModel } from '@/ts/models';

import { CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const rechargeModule = namespace('recharge');

@Component({
    name: 'RechargeDetail',
    components: { CellGroup, Cell, Header }
})
export default class RechargeDetail extends Vue {
    @rechargeModule.State('recharges') recharges?: Array<RechargeModel>;
    @rechargeModule.State('recharge') recharge!: RechargeModel;

    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (
        payload: any
    ) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    created() {
        let id = this.$route.params.id,
            recharges = this.recharges || [],
            recharge =
                recharges.filter(
                    (recharge: RechargeModel) => recharge.orderId === id
                )[0] || new RechargeModel();
        this.setStates({ recharge });
    }
}
