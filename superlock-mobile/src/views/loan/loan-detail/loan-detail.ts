import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { SessionStorage } from 'jts-storage';

import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { Token } from '@/ts/common';
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

    from: string = ''; // 页面来源

    get title() {
        let loan = this.loan;
        return loan && loan.status === 0 ? '贷款申请信息' : '贷款明细';
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
        this.from = query.from || Token.getLoanFrom();
    }

    created() {
        this.initData();
    }

    mounted() {
        this.id && this.fetchLoan();
    }
}
