import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { SessionStorage } from 'jts-storage';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { CONSTANTS } from '@/ts/config';
import { Clipboard } from '@/ts/common';
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
    @rechargeModule.State('recharge') recharge?: RechargeModel | null;
    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    // 初始化数据
    initData() {
        let params: any = this.$route.params || {},
            recharges = Utils.duplicate(this.recharges || []),
            recharge: any = recharges.filter((recharge: RechargeModel) => recharge.orderId === params.id)[0];
        if (!recharge) {
            recharge = SessionStorage.getItem<RechargeModel>(CONSTANTS.RECHARGE);
        }
        this.setStates({ recharge });
    }

    created() {
        this.initData();
    }

    mounted() {
        Clipboard.copy('orderId', '交易单号');
        Clipboard.copy('txhash', '交易hash');
    }
}
