import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { TransactionModel } from '@/ts/models';

import { CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const transactionModule = namespace('transaction');

@Component({
    name: 'TransactionDetail',
    components: { CellGroup, Cell, Header }
})
export default class TransactionDetail extends Vue {
    @transactionModule.State('transactions') transactions?: Array<TransactionModel>;
    @transactionModule.State('transaction') transaction!: TransactionModel;

    @transactionModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @transactionModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    created() {
        let id = this.$route.params.id,
            transactions = this.transactions || [],
            transaction =
                transactions.filter(
                    (transaction: TransactionModel) =>
                        transaction.orderId === id
                )[0] || new TransactionModel();
        this.setStates({ transaction });
    }
}
