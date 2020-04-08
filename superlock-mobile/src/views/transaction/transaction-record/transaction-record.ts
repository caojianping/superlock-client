import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { TransactionTypeModel, TransactionModel } from '@/ts/models';

import { List, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';
import TransactionFilter from '@/components/transaction/transaction-filter';

const transactionModule = namespace('transaction');

@Component({
    name: 'TransactionRecord',
    components: { List, CellGroup, Cell, Header, TransactionFilter }
})
export default class TransactionRecord extends Vue {
    @transactionModule.State('pageNum') pageNum!: number;
    @transactionModule.State('transactions') transactions?: Array<
        TransactionModel
    >;

    @transactionModule.Mutation(TYPES.SET_STATES) setStates!: (
        payload: any
    ) => any;
    @transactionModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @transactionModule.Action('fetchTransactions')
    fetchTransactions!: () => any;

    isShow: boolean = false; // 是否显示过滤组件
    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束

    // 打开过滤组件
    openFilter() {
        this.isShow = true;
    }

    // 处理过滤组件change事件
    handleFilterChange(transactionType: TransactionTypeModel) {
        this.setStates({ pageNum: 1, transactionType });
        this.fetchTransactions();
    }

    // 获取数据
    async fetchData() {
        let transactions = await this.fetchTransactions();
        this.isLoading = false;
        this.isFinished = transactions && transactions.length <= 0;
    }

    created() {
        this.clearStates();
    }

    mounted() {
        this.fetchData();
    }
}