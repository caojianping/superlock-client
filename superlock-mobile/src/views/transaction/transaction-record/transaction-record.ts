import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { TransactionTypeModel, TransactionModel } from '@/ts/models';

import { Toast, PullRefresh, List, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';
import TransactionFilter from '@/components/transaction/transaction-filter';

const transactionModule = namespace('transaction');

@Component({
    name: 'TransactionRecord',
    components: { PullRefresh, List, CellGroup, Cell, Header, TransactionFilter }
})
export default class TransactionRecord extends Vue {
    @transactionModule.State('pageNum') pageNum!: number;
    @transactionModule.State('pageSize') pageSize!: number;
    @transactionModule.State('transactions') transactions?: Array<TransactionModel>;
    @transactionModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @transactionModule.Mutation(TYPES.CLEAR_STATES) clearStates!: (withoutType: boolean) => any;
    @transactionModule.Action('fetchTransactions') fetchTransactionsAction!: () => any;

    isPulling: boolean = false; // 是否下拉刷新
    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束
    isShow: boolean = false; // 是否显示过滤组件

    // 打开过滤组件
    openFilter() {
        this.isShow = true;
    }

    // 处理过滤组件change事件
    handleFilterChange(transactionType: TransactionTypeModel) {
        this.setStates({ pageNum: 1, transactionType });
        this.fetchTransactions();
    }

    // 获取交易列表
    async fetchTransactions() {
        let transactions = await this.fetchTransactionsAction();
        this.isLoading = false;
        this.isFinished = transactions && transactions.length <= 0;
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        if (!this.transactions || isRefresh) {
            this.setStates({ pageNum: 1 });
            await this.fetchTransactions();
        }
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData(true);
        this.isPulling = false;
        Toast('刷新成功');
    }

    mounted() {
        this.fetchData(false);
    }
}
