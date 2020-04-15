import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { ReviewType, ReviewStatus } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { IPageParameters, IFinancePageParameters } from '@/ts/interfaces';
import { FinanceInterestModel } from '@/ts/models';

const financeModule = namespace('finance');

@Component({
    name: 'FinanceInterest',
    components: {}
})
export default class FinanceInterest extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('statusColors') statusColors!: any;
    @State('auditColors') auditColors!: any;
    @State('statusNames') statusNames!: any;
    @State('auditNames') auditNames!: any;

    @financeModule.State('parameters') parameters!: IPageParameters<IFinancePageParameters>;
    @financeModule.State('totalCount') totalCount!: number;
    @financeModule.State('list') list!: Array<FinanceInterestModel>;
    @financeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @financeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @financeModule.Action('fetchFinanceInterests') fetchFinanceInterests!: () => any;
    @financeModule.Action('exportFinanceInterests') exportFinanceInterests!: () => any;
    @financeModule.Action('setReview') setReviewAction!: (payload: any) => any;

    columns: Array<any> = [
        {
            title: '资金流水号',
            dataIndex: '',
            key: 'fundSerial',
            scopedSlots: { customRender: 'fundSerial' }
        },
        {
            title: '关联锁仓订单号',
            dataIndex: '',
            key: 'serial',
            scopedSlots: { customRender: 'serial' }
        },
        {
            title: 'UID',
            dataIndex: 'uid'
        },
        {
            title: '锁仓价值(DC)',
            dataIndex: '',
            key: 'value',
            scopedSlots: { customRender: 'value' }
        },
        {
            title: '锁仓利息(DC)',
            dataIndex: '',
            key: 'amount',
            scopedSlots: { customRender: 'amount' }
        },
        {
            title: '汇率(DC:BCB)',
            dataIndex: '',
            key: 'rate',
            scopedSlots: { customRender: 'rate' }
        },
        {
            title: '到账利息(BCB)',
            dataIndex: '',
            key: 'interest',
            scopedSlots: { customRender: 'interest' }
        },
        {
            title: '到账时间',
            dataIndex: '',
            key: 'date',
            scopedSlots: { customRender: 'date' }
        },
        {
            title: '状态',
            dataIndex: '',
            key: 'status',
            scopedSlots: { customRender: 'status' }
        },
        {
            title: '审核状态',
            dataIndex: '',
            key: 'auditStatus',
            scopedSlots: { customRender: 'auditStatus' }
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'review',
            scopedSlots: { customRender: 'review' }
        }
    ];

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let parameters = Utils.duplicate(this.parameters);
        parameters.conditions[key] = value;
        this.setStates({ parameters });
    }

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let parameters = Utils.duplicate(this.parameters);
        parameters.conditions.beginDate = dateStrings[0];
        parameters.conditions.endDate = dateStrings[1];
        this.setStates({ parameters });
    }

    // 搜索
    async search() {
        try {
            let parameters = Utils.duplicate(this.parameters);
            parameters.pageNum = 1;
            this.setStates({ parameters });
            await this.fetchFinanceInterests();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportFinanceInterests();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let parameters = Utils.duplicate(this.parameters);
        parameters.pageNum = page;
        parameters.pageSize = pageSize;
        this.setStates({ parameters });
        this.fetchFinanceInterests();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let parameters = Utils.duplicate(this.parameters);
        parameters.pageNum = 1;
        parameters.pageSize = pageSize;
        this.setStates({ parameters });
        this.fetchFinanceInterests();
    }

    // 设置审查操作
    async setReview(serial: string, status: ReviewStatus) {
        try {
            let result = await this.setReviewAction({
                serial,
                type: ReviewType.Interest,
                status
            });
            if (!result) Prompt.error('操作失败');
            else await this.fetchFinanceInterests();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchFinanceInterests();
    }
}
