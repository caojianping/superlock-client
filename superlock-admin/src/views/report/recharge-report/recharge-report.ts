import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { ISelectOption, IPageParameters, IRechargeReportPageParameters } from '@/ts/interfaces';
import { RechargeReportModel } from '@/ts/models';

const reportModule = namespace('report');

@Component({
    name: 'RechargeReport',
    components: {}
})
export default class RechargeReport extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('coinOptions') coinOptions!: Array<ISelectOption>;

    @reportModule.State('rechargeParameters') rechargeParameters!: IPageParameters<IRechargeReportPageParameters>;
    @reportModule.State('totalCount') totalCount!: number;
    @reportModule.State('list') list!: Array<RechargeReportModel>;

    @reportModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @reportModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @reportModule.Action('fetchRechargeReports') fetchRechargeReports!: () => any;
    @reportModule.Action('exportRechargeReports') exportRechargeReports!: () => any;

    columns: Array<any> = [
        {
            title: '日期',
            dataIndex: 'date'
        },
        {
            title: '充值币种',
            dataIndex: 'coinCode'
        },
        {
            title: '充值数量',
            dataIndex: 'amount'
        },
        {
            title: '入账币种',
            dataIndex: 'gotCoin'
        },
        {
            title: '入账数量',
            dataIndex: 'gotAmount'
        }
    ];

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let rechargeParameters = Utils.duplicate(this.rechargeParameters);
        rechargeParameters.conditions[key] = value;
        this.setStates({ rechargeParameters });
    }

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let rechargeParameters = Utils.duplicate(this.rechargeParameters);
        rechargeParameters.conditions.beginTime = dateStrings[0];
        rechargeParameters.conditions.endTime = dateStrings[1];
        this.setStates({ rechargeParameters });
    }

    // 搜索
    async search() {
        try {
            let rechargeParameters = Utils.duplicate(this.rechargeParameters);
            rechargeParameters.pageNum = 1;
            this.setStates({ rechargeParameters });
            await this.fetchRechargeReports();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportRechargeReports();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let rechargeParameters = Utils.duplicate(this.rechargeParameters);
        rechargeParameters.pageNum = page;
        rechargeParameters.pageSize = pageSize;
        this.setStates({ rechargeParameters });
        this.fetchRechargeReports();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let rechargeParameters = Utils.duplicate(this.rechargeParameters);
        rechargeParameters.pageNum = 1;
        rechargeParameters.pageSize = pageSize;
        this.setStates({ rechargeParameters });
        this.fetchRechargeReports();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchRechargeReports();
    }
}
