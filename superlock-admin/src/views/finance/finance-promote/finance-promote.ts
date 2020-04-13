import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { ReviewType, ReviewStatus } from '@/ts/config';
import { Utils, Prompt } from '@/ts/common';
import {
    IPageParameters,
    IFinancePageParameters,
    FinancePromoteModel
} from '@/ts/models';

const financeModule = namespace('finance');

@Component({
    name: 'FinancePromote',
    components: {}
})
export default class FinancePromote extends Vue {
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('isPageLoading') isPageLoading!: boolean;
    @State('statusColors') statusColors!: any;
    @State('auditColors') auditColors!: any;
    @State('statusNames') statusNames!: any;
    @State('auditNames') auditNames!: any;

    @financeModule.State('parameters') parameters!: IPageParameters<
        IFinancePageParameters
    >;
    @financeModule.State('totalCount') totalCount!: number;
    @financeModule.State('list') list!: Array<FinancePromoteModel>;

    @financeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @financeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @financeModule.Action('fetchPageFinancePromotes')
    fetchPageFinancePromotes!: () => any;
    @financeModule.Action('exportFinancePromotes')
    exportFinancePromotes!: () => any;
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
            title: '锁仓数量(DC)',
            dataIndex: '',
            key: 'lockValue',
            scopedSlots: { customRender: 'lockValue' }
        },
        {
            title: '推广奖励(DC)',
            dataIndex: '',
            key: 'popularValue',
            scopedSlots: { customRender: 'popularValue' }
        },
        {
            title: '汇率(DC:BCB)',
            dataIndex: '',
            key: 'rate',
            scopedSlots: { customRender: 'rate' }
        },
        {
            title: '到账BCB数量',
            dataIndex: '',
            key: 'amount',
            scopedSlots: { customRender: 'amount' }
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

    // 搜索
    async search() {
        try {
            let parameters = Utils.duplicate(this.parameters);
            parameters.pageNum = 1;
            this.setStates({ parameters });
            await this.fetchPageFinancePromotes();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportFinancePromotes();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

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

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let parameters = Utils.duplicate(this.parameters);
        parameters.pageNum = page;
        parameters.pageSize = pageSize;
        this.setStates({ parameters });
        this.fetchPageFinancePromotes();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let parameters = Utils.duplicate(this.parameters);
        parameters.pageNum = 1;
        parameters.pageSize = pageSize;
        this.setStates({ parameters });
        this.fetchPageFinancePromotes();
    }

    // 设置审查操作
    async setReview(serial: string, status: ReviewStatus) {
        try {
            let result = await this.setReviewAction({
                serial,
                type: ReviewType.Promote,
                status
            });
            if (!result) Prompt.error('操作失败');
            else await this.fetchPageFinancePromotes();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchPageFinancePromotes();
    }
}
