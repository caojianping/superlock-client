import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { IPageParameters, ILoanPageParameters } from '@/ts/interfaces';
import { LoanModel } from '@/ts/models';

const loanModule = namespace('loan');

@Component({
    name: 'LoanOrder',
    components: {}
})
export default class LoanOrder extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;

    @loanModule.State('loanParameters') loanParameters!: IPageParameters<ILoanPageParameters>;
    @loanModule.State('totalCount') totalCount!: number;
    @loanModule.State('list') list!: Array<LoanModel>;
    @loanModule.State('statusOptions') statusOptions!: Array<any>;
    @loanModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loanModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @loanModule.Action('fetchLoans') fetchLoans!: () => any;

    columns: Array<any> = [];

    handleFormChange(key: string, value: string) {
        let loanParameters = Utils.duplicate(this.loanParameters);
        loanParameters.conditions[key] = value;
        this.setStates({ loanParameters });
    }

    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let loanParameters = Utils.duplicate(this.loanParameters);
        // loanParameters.conditions.beginTime = dateStrings[0];
        // loanParameters.conditions.endTime = dateStrings[1];
        this.setStates({ loanParameters });
    }

    handlePageNumChange(page: number, pageSize: number) {
        let loanParameters = Utils.duplicate(this.loanParameters);
        loanParameters.pageNum = page;
        loanParameters.pageSize = pageSize;
        this.setStates({ loanParameters });
        this.fetchLoans();
    }

    handlePageSizeChange(current: number, pageSize: number) {
        let loanParameters = Utils.duplicate(this.loanParameters);
        loanParameters.pageNum = current;
        loanParameters.pageSize = pageSize;
        this.setStates({ loanParameters });
        this.fetchLoans();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchLoans();
    }
}
