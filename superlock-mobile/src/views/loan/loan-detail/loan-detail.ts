import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { SessionStorage } from 'jts-storage';

import Locales from '@/locales';
import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { From, Clipboard } from '@/ts/common';
import { LoanModel } from '@/ts/models';

import { Toast, PullRefresh, CellGroup, Cell, Button } from 'vant';
import Header from '@/components/common/header';

const i18n = Locales.buildLocale();
const loanModule = namespace('loan');

@Component({
    name: 'LoanDetail',
    components: { PullRefresh, CellGroup, Cell, Button, Header }
})
export default class LoanDetail extends Vue {
    @loanModule.State('loanColors') loanColors!: Map<number, string>;
    @loanModule.State('loanStatuses') loanStatuses!: Map<number, string>;
    @loanModule.State('id') id!: string;
    @loanModule.State('loan') loan?: LoanModel | null;

    @loanModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loanModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @loanModule.Action('fetchLoan') fetchLoan!: () => any;

    from: string = ''; // 页面来源
    isPulling: boolean = false; // 是否下拉刷新

    get title() {
        let loan = this.loan;
        return loan && (loan.status === 0 || loan.status === 10) ? i18n.tc('LOAN.LOAN_APPLY_INFO') : i18n.tc('LOAN.LOAN_DETAILS');
    }

    // 获取数据
    async fetchData() {
        this.id && (await this.fetchLoan());

        Clipboard.copy('loanDetailOrderId', i18n.tc('LOAN.LOAN_ORDER_ID')); // id添加前缀，防止复制元素重复
        Clipboard.copy('loanDetailLockOrderId', i18n.tc('LOAN.PLEDGE_LOCK_ORDER_ID')); // id添加前缀，防止复制元素重复
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData();
        this.isPulling = false;
        Toast(i18n.tc('COMMON.REFRESH_SUCCESS'));
    }

    // 初始化数据
    initData() {
        let params: any = this.$route.params || {},
            id = params.id || '';
        if (!id) {
            this.setStates({ id: '' });
            let loan = SessionStorage.getItem<LoanModel>(CONSTANTS.LOAN);
            this.setStates({ loan });
        }
        this.setStates({ id });

        let query: any = this.$route.query || {};
        this.from = query.from || From.getLoanFrom();
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchData();
    }
}
