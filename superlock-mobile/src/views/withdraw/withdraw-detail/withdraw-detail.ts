import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { SessionStorage } from 'jts-storage';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { CONSTANTS } from '@/ts/config';
import { Clipboard } from '@/ts/common';
import { WithdrawModel } from '@/ts/models';

import { CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const withdrawModule = namespace('withdraw');

@Component({
    name: 'WithdrawDetail',
    components: { CellGroup, Cell, Header }
})
export default class WithdrawDetail extends Vue {
    @withdrawModule.State('withdraws') withdraws?: Array<WithdrawModel>;
    @withdrawModule.State('withdraw') withdraw?: WithdrawModel | null;
    @withdrawModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @withdrawModule.Mutation(TYPES.CLEAR_STATES) clearStates!: (withoutSelected: boolean) => any;

    // 初始化数据
    initData() {
        let params: any = this.$route.params || {},
            withdraws = Utils.duplicate(this.withdraws || []),
            withdraw: any = withdraws.filter((withdraw: WithdrawModel) => withdraw.orderId === params.id)[0];
        if (!withdraw) {
            withdraw = SessionStorage.getItem<WithdrawModel>(CONSTANTS.WITHDRAW);
        }
        this.setStates({ withdraw });
    }

    created() {
        this.initData();
    }

    mounted() {
        Clipboard.copy('orderId', '交易单号');
        Clipboard.copy('txhash', '交易hash');
    }
}
