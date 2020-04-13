import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { Utils } from '@/ts/common';
import {
    IPageParameters,
    ILoanRecordPageParameters,
    LoanRecordModel
} from '@/ts/models';

const loanModule = namespace('loan');

@Component({
    name: 'LoanRecord',
    components: {}
})
export default class LoanRecord extends Vue {
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('isPageLoading') isPageLoading!: boolean;

    @loanModule.State('recordParameters') recordParameters!: IPageParameters<ILoanRecordPageParameters>;
    @loanModule.State('totalCount') totalCount!: number;
    @loanModule.State('list') list!: Array<LoanRecordModel>;
    @loanModule.State('statusOptions') statusOptions!: Array<any>;

    @loanModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loanModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @loanModule.Action('fetchPageLoanRecords') fetchPageLoanRecords!: () => any;

    columns: Array<any> = [];

    handleFormChange(key: string, value: string) {
        let recordParameters = Utils.duplicate(this.recordParameters);
        recordParameters.conditions[key] = value;
        this.setStates({ recordParameters });
    }

    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let recordParameters = Utils.duplicate(this.recordParameters);
        // recordParameters.conditions.beginTime = dateStrings[0];
        // recordParameters.conditions.endTime = dateStrings[1];
        this.setStates({ recordParameters });
    }

    handlePageNumChange(page: number, pageSize: number) {
        let recordParameters = Utils.duplicate(this.recordParameters);
        recordParameters.pageNum = page;
        recordParameters.pageSize = pageSize;
        this.setStates({ recordParameters });
        this.fetchPageLoanRecords();
    }

    handlePageSizeChange(current: number, pageSize: number) {
        let recordParameters = Utils.duplicate(this.recordParameters);
        recordParameters.pageNum = current;
        recordParameters.pageSize = pageSize;
        this.setStates({ recordParameters });
        this.fetchPageLoanRecords();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchPageLoanRecords();
    }
}
