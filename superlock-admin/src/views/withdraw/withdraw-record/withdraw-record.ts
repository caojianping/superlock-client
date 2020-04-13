import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { ReviewStatus } from '@/ts/config';
import { Utils, Prompt } from '@/ts/common';
import {
    ISelectOption,
    IPageParameters,
    IWithdrawRecordPageParameters,
    WithdrawRecordModel
} from '@/ts/models';

const withdrawModule = namespace('withdraw');

@Component({
    name: 'WithdrawRecord',
    components: {}
})
export default class WithdrawRecord extends Vue {
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('isPageLoading') isPageLoading!: boolean;
    @State('auditColors') auditColors!: any;
    @State('auditNames') auditNames!: any;

    @withdrawModule.State('statusOptions') statusOptions!: Array<ISelectOption>;
    @withdrawModule.State('recordParameters')
    recordParameters!: IPageParameters<IWithdrawRecordPageParameters>;
    @withdrawModule.State('totalCount') totalCount!: number;
    @withdrawModule.State('list') list!: Array<WithdrawRecordModel>;

    @withdrawModule.Mutation(TYPES.SET_STATES) setStates!: (
        payload: any
    ) => any;
    @withdrawModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @withdrawModule.Action('fetchPageWithdrawRecords')
    fetchPageWithdrawRecords!: () => any;
    @withdrawModule.Action('exportWithdrawRecords')
    exportWithdrawRecords!: () => any;
    @withdrawModule.Action('setReview') setReviewAction!: (payload: any) => any;

    statusColors: any = {
        '0': 'text-grey',
        '10': 'text-black',
        '20': 'text-green',
        '30': 'text-red'
    };

    statusNames: any = {
        '0': '未提现',
        '10': '提现中',
        '20': '提现成功',
        '30': '提现失败'
    };

    columns: Array<any> = [
        {
            title: '订单号',
            dataIndex: '',
            key: 'serial',
            scopedSlots: { customRender: 'serial' }
        },
        {
            title: 'UID',
            dataIndex: 'uid'
        },
        {
            title: '提现到账地址',
            dataIndex: '',
            key: 'address',
            scopedSlots: { customRender: 'address' }
        },
        {
            title: '提现币种',
            dataIndex: 'coinCode'
        },
        {
            title: '提现数量',
            dataIndex: 'amount'
        },
        {
            title: '创建时间',
            dataIndex: '',
            key: 'createDate',
            scopedSlots: { customRender: 'createDate' }
        },
        {
            title: '完结时间',
            dataIndex: '',
            key: 'finishDate',
            scopedSlots: { customRender: 'finishDate' }
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
            let recordParameters = Utils.duplicate(this.recordParameters);
            recordParameters.pageNum = 1;
            this.setStates({ recordParameters });
            await this.fetchPageWithdrawRecords();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportWithdrawRecords();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let recordParameters = Utils.duplicate(this.recordParameters);
        recordParameters.conditions[key] = value;
        this.setStates({ recordParameters });
    }

    // 处理开始日期change事件
    handleCreateRangePickerChange(
        dates: Array<any>,
        dateStrings: Array<string>
    ) {
        let recordParameters = Utils.duplicate(this.recordParameters);
        recordParameters.conditions.createBeginTime = dateStrings[0];
        recordParameters.conditions.createEndTime = dateStrings[1];
        this.setStates({ recordParameters });
    }

    // 处理结束日期change事件
    handleFinishRangePickerChange(
        dates: Array<any>,
        dateStrings: Array<string>
    ) {
        let recordParameters = Utils.duplicate(this.recordParameters);
        recordParameters.conditions.finishBeginTime = dateStrings[0];
        recordParameters.conditions.finishEndTime = dateStrings[1];
        this.setStates({ recordParameters });
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let recordParameters = Utils.duplicate(this.recordParameters);
        recordParameters.pageNum = page;
        recordParameters.pageSize = pageSize;
        this.setStates({ recordParameters });
        this.fetchPageWithdrawRecords();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let recordParameters = Utils.duplicate(this.recordParameters);
        recordParameters.pageNum = 1;
        recordParameters.pageSize = pageSize;
        this.setStates({ recordParameters });
        this.fetchPageWithdrawRecords();
    }

    // 设置审查操作
    async setReview(serial: string, status: ReviewStatus) {
        try {
            let result = await this.setReviewAction({ serial, status });
            if (!result) Prompt.error('操作失败');
            else await this.fetchPageWithdrawRecords();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchPageWithdrawRecords();
    }
}
