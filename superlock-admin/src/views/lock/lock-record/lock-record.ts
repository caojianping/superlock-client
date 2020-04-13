import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { Utils, Prompt } from '@/ts/common';
import {
    ISelectOption,
    IPageParameters,
    ILockRecordPageParameters,
    LockRecordModel
} from '@/ts/models';

const lockModule = namespace('lock');

@Component({
    name: 'LockRecord',
    components: {}
})
export default class LockRecord extends Vue {
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('isPageLoading') isPageLoading!: boolean;

    @lockModule.State('statusOptions') statusOptions!: Array<ISelectOption>;
    @lockModule.State('recordParameters') recordParameters!: IPageParameters<
        ILockRecordPageParameters
    >;
    @lockModule.State('totalCount') totalCount!: number;
    @lockModule.State('list') list!: Array<LockRecordModel>;

    @lockModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @lockModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @lockModule.Action('fetchPageLockRecords') fetchPageLockRecords!: () => any;
    @lockModule.Action('exportLockRecords') exportLockRecords!: () => any;

    statusColors = {
        '0': 'text-grey',
        '10': 'text-green',
        '20': 'text-green',
        '30': 'text-red',
        '40': 'text-red'
    };

    statusNames = {
        '0': '创建',
        '10': '锁仓资金操作中',
        '20': '锁仓中',
        '30': '锁仓到期',
        '40': '锁仓失败'
    };

    columns: Array<any> = [
        {
            title: '锁仓订单号',
            dataIndex: '',
            key: 'serial',
            scopedSlots: { customRender: 'serial' }
        },
        {
            title: 'UID',
            dataIndex: 'uid'
        },
        {
            title: '锁仓数量(BCB)',
            dataIndex: '',
            key: 'amount',
            scopedSlots: { customRender: 'amount' }
        },
        {
            title: '锁仓利率(%)',
            dataIndex: '',
            key: 'rate',
            scopedSlots: { customRender: 'rate' }
        },
        {
            title: '锁仓价值(DC)',
            dataIndex: '',
            key: 'value',
            scopedSlots: { customRender: 'value' }
        },
        {
            title: '锁仓周期',
            dataIndex: 'cycle'
        },
        {
            title: '订单创建时间',
            dataIndex: '',
            key: 'createDate',
            scopedSlots: { customRender: 'createDate' }
        },
        {
            title: '开始日期',
            dataIndex: 'beginDate'
        },
        {
            title: '结束日期',
            dataIndex: 'endDate'
        },
        {
            title: '状态',
            dataIndex: '',
            key: 'status',
            scopedSlots: { customRender: 'status' }
        }
    ];

    // 搜索
    async search() {
        try {
            let recordParameters = Utils.duplicate(this.recordParameters);
            recordParameters.pageNum = 1;
            this.setStates({ recordParameters });
            await this.fetchPageLockRecords();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportLockRecords();
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

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let recordParameters = Utils.duplicate(this.recordParameters);
        recordParameters.conditions.beginTime = dateStrings[0];
        recordParameters.conditions.endTime = dateStrings[1];
        this.setStates({ recordParameters });
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let recordParameters = this.recordParameters;
        recordParameters.pageNum = page;
        recordParameters.pageSize = pageSize;
        this.setStates({ recordParameters });
        this.fetchPageLockRecords();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let recordParameters = this.recordParameters;
        recordParameters.pageNum = 1;
        recordParameters.pageSize = pageSize;
        this.setStates({ recordParameters });
        this.fetchPageLockRecords();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchPageLockRecords();
    }
}
