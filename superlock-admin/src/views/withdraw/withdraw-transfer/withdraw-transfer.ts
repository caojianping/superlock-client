import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { Utils, Prompt } from '@/ts/common';
import {
    IPageParameters,
    IWithdrawTransferPageParameters,
    WithdrawTransferModel
} from '@/ts/models';

const withdrawModule = namespace('withdraw');

@Component({
    name: 'WithdrawTransfer',
    components: {}
})
export default class WithdrawTransfer extends Vue {
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('isPageLoading') isPageLoading!: boolean;

    @withdrawModule.State('transferParameters')
    transferParameters!: IPageParameters<IWithdrawTransferPageParameters>;
    @withdrawModule.State('totalCount') totalCount!: number;
    @withdrawModule.State('list') list!: Array<WithdrawTransferModel>;

    @withdrawModule.Mutation(TYPES.SET_STATES) setStates!: (
        payload: any
    ) => any;
    @withdrawModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @withdrawModule.Action('fetchPageWithdrawTransfers')
    fetchPageWithdrawTransfers!: () => any;
    @withdrawModule.Action('exportWithdrawTransfers')
    exportWithdrawTransfers!: () => any;

    columns: Array<any> = [
        {
            title: '订单号',
            dataIndex: '',
            key: 'serial',
            scopedSlots: { customRender: 'serial' }
        },
        {
            title: '转账UID',
            dataIndex: 'fromId'
        },
        {
            title: '到账UID',
            dataIndex: 'toId'
        },
        {
            title: '转账币种',
            dataIndex: 'coin'
        },
        {
            title: '转账数量',
            dataIndex: '',
            key: 'amount',
            scopedSlots: { customRender: 'amount' }
        },
        {
            title: '时间',
            dataIndex: '',
            key: 'date',
            scopedSlots: { customRender: 'date' }
        },
        {
            title: '状态',
            dataIndex: 'status'
        }
    ];

    // 搜索
    async search() {
        try {
            let transferParameters = Utils.duplicate(this.transferParameters);
            transferParameters.pageNum = 1;
            this.setStates({ transferParameters });
            await this.fetchPageWithdrawTransfers();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportWithdrawTransfers();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let transferParameters = Utils.duplicate(this.transferParameters);
        transferParameters.conditions[key] = value;
        this.setStates({ transferParameters });
    }

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let transferParameters = Utils.duplicate(this.transferParameters);
        transferParameters.conditions.beginTime = dateStrings[0];
        transferParameters.conditions.endTime = dateStrings[1];
        this.setStates({ transferParameters });
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let transferParameters = this.transferParameters;
        transferParameters.pageNum = page;
        transferParameters.pageSize = pageSize;
        this.setStates({ transferParameters });
        this.fetchPageWithdrawTransfers();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let transferParameters = this.transferParameters;
        transferParameters.pageNum = 1;
        transferParameters.pageSize = pageSize;
        this.setStates({ transferParameters });
        this.fetchPageWithdrawTransfers();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchPageWithdrawTransfers();
    }
}
