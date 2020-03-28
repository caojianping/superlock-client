import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';

import { Button } from 'vant';
import Header from '@/components/common/header';
import RechargePrompt from '@/components/recharge/recharge-prompt';

const rechargeModule = namespace('recharge');

@Component({
    name: 'RechargeCode',
    components: { Button, Header, RechargePrompt }
})
export default class RechargeCode extends Vue {
    @rechargeModule.State('rechargeCoin') rechargeCoin!: string;
    @rechargeModule.State('rechargeAddress') rechargeAddress!: string;

    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (
        payload: any
    ) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @rechargeModule.Action('fetchRechargeAddress')
    fetchRechargeAddress!: () => any;

    copyAddress() {}

    created() {
        let coin = this.$route.params.coin;
        this.setStates({ coin });
    }

    mounted() {
        this.fetchRechargeAddress();
    }
}
