import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { ISelectOption, IPageParameters, IWithdrawReportPageParameters } from '@/ts/interfaces';
import { WithdrawReportModel } from '@/ts/models';

const reportModule = namespace('report');

@Component({
    name: 'WithdrawReport',
    components: {}
})
export default class WithdrawReport extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('coinOptions') coinOptions!: Array<ISelectOption>;

    @reportModule.State('withdrawParameters') withdrawParameters!: IPageParameters<IWithdrawReportPageParameters>;
    @reportModule.State('totalCount') totalCount!: number;
    @reportModule.State('list') list!: Array<WithdrawReportModel>;

    @reportModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @reportModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @reportModule.Action('fetchWithdrawReports') fetchWithdrawReports!: () => any;
    @reportModule.Action('exportWithdrawReports') exportWithdrawReports!: () => any;

    columns: Array<any> = [
        {
            title: '日期',
            dataIndex: 'date'
        },
        {
            title: '提现币种',
            dataIndex: 'coinCode'
        },
        {
            title: '提现笔数',
            dataIndex: '',
            key: 'totalCount',
            scopedSlots: { customRender: 'totalCount' }
        },
        {
            title: '提现数量',
            dataIndex: '',
            key: 'amount',
            scopedSlots: { customRender: 'amount' }
        }
    ];

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let withdrawParameters = Utils.duplicate(this.withdrawParameters);
        withdrawParameters.conditions[key] = value;
        this.setStates({ withdrawParameters });
    }

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let withdrawParameters = Utils.duplicate(this.withdrawParameters);
        withdrawParameters.conditions.beginTime = dateStrings[0];
        withdrawParameters.conditions.endTime = dateStrings[1];
        this.setStates({ withdrawParameters });
    }

    // 搜索
    async search() {
        try {
            let withdrawParameters = Utils.duplicate(this.withdrawParameters);
            withdrawParameters.pageNum = 1;
            this.setStates({ withdrawParameters });
            await this.fetchWithdrawReports();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportWithdrawReports();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let withdrawParameters = Utils.duplicate(this.withdrawParameters);
        withdrawParameters.pageNum = page;
        withdrawParameters.pageSize = pageSize;
        this.setStates({ withdrawParameters });
        this.fetchWithdrawReports();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let withdrawParameters = Utils.duplicate(this.withdrawParameters);
        withdrawParameters.pageNum = 1;
        withdrawParameters.pageSize = pageSize;
        this.setStates({ withdrawParameters });
        this.fetchWithdrawReports();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchWithdrawReports();
    }
}
