import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Clipboard } from '@/ts/common';
import { TransactionInfoModel, RechargeModel, WithdrawModel, TransferModel } from '@/ts/models';

import { CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const transactionModule = namespace('transaction');

@Component({
    name: 'TransactionDetail',
    components: { CellGroup, Cell, Header }
})
export default class TransactionDetail extends Vue {
    @transactionModule.State('type') type!: number;
    @transactionModule.State('transaction') transaction?: TransactionInfoModel | RechargeModel | WithdrawModel | TransferModel | null;
    @transactionModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @transactionModule.Mutation(TYPES.CLEAR_STATES) clearStates!: (withoutType: boolean) => any;
    @transactionModule.Action('fetchTransaction') fetchTransaction!: () => any;

    // 初始化数据
    initData() {
        let params = this.$route.params || {};
        this.setStates({
            type: Utils.digitConvert(params.type),
            orderId: params.orderId || ''
        });
    }

    // 获取数据
    async fetchData() {
        await this.fetchTransaction();
        Clipboard.copy('orderId', '交易单号');
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchData();
    }
}
