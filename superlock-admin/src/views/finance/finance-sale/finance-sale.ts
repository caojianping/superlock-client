import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { IPageParameters, IFinancePageParameters } from '@/ts/interfaces';
import { FinanceSaleModel } from '@/ts/models';

const financeModule = namespace('finance');

@Component({
    name: 'FinanceSale',
    components: {}
})
export default class FinanceSale extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('statusColors') statusColors!: any;
    @State('statusNames') statusNames!: any;

    @financeModule.State('parameters') parameters!: IPageParameters<IFinancePageParameters>;
    @financeModule.State('totalCount') totalCount!: number;
    @financeModule.State('list') list!: Array<FinanceSaleModel>;
    @financeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @financeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @financeModule.Action('fetchFinanceSales') fetchFinanceSales!: () => any;
    @financeModule.Action('exportFinanceSales') exportFinanceSales!: () => any;

    columns: Array<any> = [
        {
            title: '资金流水号',
            dataIndex: '',
            key: 'fundSerial',
            scopedSlots: { customRender: 'fundSerial' }
        },
        {
            title: '触发达标锁仓订单号',
            dataIndex: '',
            key: 'serial',
            scopedSlots: { customRender: 'serial' }
        },
        {
            title: 'UID',
            dataIndex: 'uid'
        },
        {
            title: '日销锁仓量(DC)',
            dataIndex: 'lockValue'
        },
        {
            title: '达标范围',
            dataIndex: 'sales'
        },
        {
            title: '返奖利率',
            dataIndex: '',
            key: 'salesRate',
            scopedSlots: { customRender: 'salesRate' }
        },
        {
            title: '达标奖励(DC)',
            dataIndex: 'salesRewardValue'
        },
        {
            title: '汇率(DC:BCB)',
            dataIndex: 'rate'
        },
        {
            title: '到账BCB数量',
            dataIndex: 'amount'
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
            await this.fetchFinanceSales();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportFinanceSales();
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
        this.fetchFinanceSales();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let parameters = Utils.duplicate(this.parameters);
        parameters.pageNum = 1;
        parameters.pageSize = pageSize;
        this.setStates({ parameters });
        this.fetchFinanceSales();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchFinanceSales();
    }
}
