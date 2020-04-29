import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { IPageParameters, IExpendReportPageParameters, ISelectOption } from '@/ts/interfaces';
import { ExpendReportModel } from '@/ts/models';

const reportModule = namespace('report');

@Component({
    name: 'ExpendReport',
    components: {}
})
export default class ExpendReport extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;

    @reportModule.State('expendTypeOptions') expendTypeOptions!: Array<ISelectOption>;
    @reportModule.State('expendParameters') expendParameters!: IPageParameters<IExpendReportPageParameters>;
    @reportModule.State('totalCount') totalCount!: number;
    @reportModule.State('list') list!: Array<ExpendReportModel>;

    @reportModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @reportModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @reportModule.Action('fetchExpendReports') fetchExpendReports!: () => any;
    @reportModule.Action('exportExpendReports') exportExpendReports!: () => any;

    columns: Array<any> = [
        {
            title: '日期',
            dataIndex: 'date'
        },
        {
            title: '支出类型',
            dataIndex: 'type'
        },
        {
            title: '支出价值(DC)',
            dataIndex: '',
            key: 'dcAmount',
            scopedSlots: { customRender: 'dcAmount' }
        },
        {
            title: '支出数量(BCB)',
            dataIndex: '',
            key: 'bcbAmount',
            scopedSlots: { customRender: 'bcbAmount' }
        }
    ];

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let expendParameters = Utils.duplicate(this.expendParameters);
        expendParameters.conditions[key] = value;
        this.setStates({ expendParameters });
    }

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let expendParameters = Utils.duplicate(this.expendParameters);
        expendParameters.conditions.beginTime = dateStrings[0];
        expendParameters.conditions.endTime = dateStrings[1];
        this.setStates({ expendParameters });
    }

    // 搜索
    async search() {
        try {
            let expendParameters = Utils.duplicate(this.expendParameters);
            expendParameters.pageNum = 1;
            this.setStates({ expendParameters });
            await this.fetchExpendReports();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportExpendReports();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let expendParameters = Utils.duplicate(this.expendParameters);
        expendParameters.pageNum = page;
        expendParameters.pageSize = pageSize;
        this.setStates({ expendParameters });
        this.fetchExpendReports();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let expendParameters = Utils.duplicate(this.expendParameters);
        expendParameters.pageNum = 1;
        expendParameters.pageSize = pageSize;
        this.setStates({ expendParameters });
        this.fetchExpendReports();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchExpendReports();
    }
}
