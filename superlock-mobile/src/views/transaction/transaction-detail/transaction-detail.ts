import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
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
        let params = this.$route.params || {},
            { type, orderId } = params;
        this.setStates({
            type: isNaN(Number(type)) ? 0 : Number(type),
            orderId: orderId || ''
        });
    }

    created() {
        this.clearStates(true);
        this.initData();
    }

    mounted() {
        this.fetchTransaction();
    }
}
