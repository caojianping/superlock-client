import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { IPageParameters, ILockReportPageParameters } from '@/ts/interfaces';
import { LockReportModel } from '@/ts/models';

const reportModule = namespace('report');

@Component({
    name: 'LockReport',
    components: {}
})
export default class LockReport extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;

    @reportModule.State('lockParameters') lockParameters!: IPageParameters<ILockReportPageParameters>;
    @reportModule.State('totalCount') totalCount!: number;
    @reportModule.State('list') list!: Array<LockReportModel>;

    @reportModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @reportModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @reportModule.Action('fetchLockReports') fetchLockReports!: () => any;
    @reportModule.Action('exportLockReports') exportLockReports!: () => any;

    columns: Array<any> = [
        {
            title: '日期',
            dataIndex: 'date'
        },
        {
            title: '锁仓期限',
            dataIndex: '',
            key: 'deadline',
            scopedSlots: { customRender: 'deadline' }
        },
        {
            title: '锁仓价值(DC)',
            dataIndex: 'lockValue'
        },
        {
            title: '锁仓数量(BCB)',
            dataIndex: 'lockAmount'
        }
    ];

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let lockParameters = Utils.duplicate(this.lockParameters);
        lockParameters.conditions[key] = value;
        this.setStates({ lockParameters });
    }

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let lockParameters = Utils.duplicate(this.lockParameters);
        lockParameters.conditions.beginTime = dateStrings[0];
        lockParameters.conditions.endTime = dateStrings[1];
        this.setStates({ lockParameters });
    }

    // 搜索
    async search() {
        try {
            let lockParameters = Utils.duplicate(this.lockParameters);
            lockParameters.pageNum = 1;
            this.setStates({ lockParameters });
            await this.fetchLockReports();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportLockReports();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let lockParameters = Utils.duplicate(this.lockParameters);
        lockParameters.pageNum = page;
        lockParameters.pageSize = pageSize;
        this.setStates({ lockParameters });
        this.fetchLockReports();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let lockParameters = Utils.duplicate(this.lockParameters);
        lockParameters.pageNum = 1;
        lockParameters.pageSize = pageSize;
        this.setStates({ lockParameters });
        this.fetchLockReports();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchLockReports();
    }
}
