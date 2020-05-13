import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { LoanModel } from '@/ts/models';

import { CellGroup, Cell, Button } from 'vant';
import Header from '@/components/common/header';

const loanModule = namespace('loan');

@Component({
    name: 'LoanDetail',
    components: { CellGroup, Cell, Button, Header }
})
export default class LoanDetail extends Vue {
    @loanModule.State('id') id!: string;
    @loanModule.State('loanStatuses') loanStatuses!: Map<number, string>;
    @loanModule.State('loan') loan?: LoanModel | null;

    @loanModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loanModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @loanModule.Action('fetchLoan') fetchLoan!: () => any;

    get title() {
        let loan = this.loan;
        return loan && loan.status === 0 ? '贷款申请信息' : '贷款明细';
    }

    // 初始化数据
    initData() {
        let params: any = this.$route.params || {};
        this.setStates({ id: params.id });
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchLoan();
    }
}
