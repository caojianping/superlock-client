import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import TYPES from '@/store/types';
import { WithdrawModel } from '@/ts/models';

import { CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const withdrawModule = namespace('withdraw');

@Component({
    name: 'WithdrawDetail',
    components: { CellGroup, Cell, Header }
})
export default class WithdrawDetail extends Vue {
    @withdrawModule.State('withdraws') withdraws!: Array<WithdrawModel>;
    @withdrawModule.State('withdraw') withdraw!: WithdrawModel;

    @withdrawModule.Mutation(TYPES.SET_STATES) setStates!: (
        payload: any
    ) => any;
    @withdrawModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    created() {
        let id = this.$route.params.id,
            withdraw =
                this.withdraws.filter(
                    (withdraw: WithdrawModel) => withdraw.orderId === id
                )[0] || new WithdrawModel();
        this.setStates({ withdraw });
    }
}
