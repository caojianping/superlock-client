import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { SessionStorage } from 'jts-storage';

import TYPES from '@/store/types';
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
    @rechargeModule.State('recharge') recharge?: RechargeModel | null;
    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    // 初始化数据
    initData() {
        let recharge = this.recharge;
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
