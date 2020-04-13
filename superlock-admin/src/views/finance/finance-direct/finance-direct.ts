import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { Utils, Prompt } from '@/ts/common';
import {
    IPageParameters,
    IFinancePageParameters,
    FinanceDirectModel
} from '@/ts/models';

const financeModule = namespace('finance');

@Component({
    name: 'FinanceDirect',
    components: {}
})
export default class FinanceDirect extends Vue {
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('isPageLoading') isPageLoading!: boolean;

    @financeModule.State('parameters') parameters!: IPageParameters<
        IFinancePageParameters
    >;
    @financeModule.State('totalCount') totalCount!: number;
    @financeModule.State('list') list!: Array<FinanceDirectModel>;

    @financeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @financeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @financeModule.Action('fetchPageFinanceDirects')
    fetchPageFinanceDirects!: () => any;
    @financeModule.Action('exportFinanceDirects')
    exportFinanceDirects!: () => any;

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
            title: '直推返奖比例',
            dataIndex: '',
            key: 'proportion',
            scopedSlots: { customRender: 'proportion' }
        },
        {
            title: '直推奖励(DC)',
            dataIndex: '',
            key: 'amount',
            scopedSlots: { customRender: 'amount' }
        },
        {
            title: '汇率(BCB:DC)',
            dataIndex: '',
            key: 'rate',
            scopedSlots: { customRender: 'rate' }
        },
        {
            title: '到账奖励(BCB)',
            dataIndex: '',
            key: 'interest',
            scopedSlots: { customRender: 'interest' }
        },
        {
            title: '到账时间',
            dataIndex: '',
            key: 'date',
            scopedSlots: { customRender: 'date' }
        }
    ];

    // 搜索
    async search() {
        try {
            let parameters = Utils.duplicate(this.parameters);
            parameters.pageNum = 1;
            this.setStates({ parameters });
            await this.fetchPageFinanceDirects();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportFinanceDirects();
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
        this.fetchPageFinanceDirects();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let parameters = Utils.duplicate(this.parameters);
        parameters.pageNum = 1;
        parameters.pageSize = pageSize;
        this.setStates({ parameters });
        this.fetchPageFinanceDirects();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchPageFinanceDirects();
    }
}
