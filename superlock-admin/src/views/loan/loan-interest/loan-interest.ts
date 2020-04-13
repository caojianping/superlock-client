import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { Utils } from '@/ts/common';
import {
    IPageParameters,
    ILoanInterestPageParameters,
    LoanInterestModel
} from '@/ts/models';

const loanModule = namespace('loan');

@Component({
    name: 'LoanInterest',
    components: {}
})
export default class LoanInterest extends Vue {
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('isPageLoading') isPageLoading!: boolean;

    @loanModule.State('interestParameters')
    interestParameters!: IPageParameters<ILoanInterestPageParameters>;
    @loanModule.State('totalCount') totalCount!: number;
    @loanModule.State('list') list!: Array<LoanInterestModel>;

    @loanModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loanModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @loanModule.Action('fetchPageLoanInterests')
    fetchPageLoanInterests!: () => any;

    columns: Array<any> = [];

    handleFormChange(key: string, value: string) {
        let interestParameters = Utils.duplicate(this.interestParameters);
        interestParameters.conditions[key] = value;
        this.setStates({ interestParameters });
    }

    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let interestParameters = Utils.duplicate(this.interestParameters);
        // interestParameters.conditions.beginTime = dateStrings[0];
        // interestParameters.conditions.endTime = dateStrings[1];
        this.setStates({ interestParameters });
    }

    handlePageNumChange(page: number, pageSize: number) {
        let interestParameters = Utils.duplicate(this.interestParameters);
        interestParameters.pageNum = page;
        interestParameters.pageSize = pageSize;
        this.setStates({ interestParameters });
        this.fetchPageLoanInterests();
    }

    handlePageSizeChange(current: number, pageSize: number) {
        let interestParameters = Utils.duplicate(this.interestParameters);
        interestParameters.pageNum = current;
        interestParameters.pageSize = pageSize;
        this.setStates({ interestParameters });
        this.fetchPageLoanInterests();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchPageLoanInterests();
    }
}
