import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { IPageParameters, IRebateOrderPageParameters } from '@/ts/interfaces';
import { RebateOrderModel } from '@/ts/models';

const carrierModule = namespace('carrier');

@Component({
    name: 'RebateOrder',
    components: {}
})
export default class RebateOrder extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('carrierOptions') carrierOptions!: Array<any>;

    @carrierModule.State('rebateParameters') rebateParameters!: IPageParameters<IRebateOrderPageParameters>;
    @carrierModule.State('totalCount') totalCount!: number;
    @carrierModule.State('list') list!: Array<RebateOrderModel>;
    @carrierModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @carrierModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @carrierModule.Action('fetchRebateOrders') fetchRebateOrders!: () => any;
    @carrierModule.Action('exportRebateOrders') exportRebateOrders!: () => any;

    columns: Array<any> = [
        {
            title: '订单号',
            dataIndex: 'serial'
        },
        {
            title: '运营商ID',
            dataIndex: 'carrierId'
        },
        {
            title: '运营商名称',
            dataIndex: 'carrierName'
        },
        {
            title: '结算周期',
            dataIndex: 'billingCycle'
        },
        {
            title: '新增锁仓(DC)',
            dataIndex: 'lockAmount'
        },
        {
            title: '返点比例(%)',
            dataIndex: 'rebateRatio'
        },
        {
            title: '返点价值(DC)',
            dataIndex: 'rebateValue'
        },
        {
            title: '创建时间',
            dataIndex: '',
            key: 'createTime',
            scopedSlots: { customRender: 'createTime' }
        },
        {
            title: '完结时间',
            dataIndex: '',
            key: 'endTime',
            scopedSlots: { customRender: 'endTime' }
        },
        {
            title: '状态',
            dataIndex: 'status'
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'operation',
            scopedSlots: { customRender: 'operation' }
        }
    ];

    // 自动完成组件filterOption
    filterOption(input: string, option: any) {
        let text = option.componentOptions.children[0].text.toUpperCase(),
            key = option.key,
            uinput = input.toUpperCase();
        return text.indexOf(uinput) > -1 || key.indexOf(uinput) > -1;
    }

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let rebateParameters = Utils.duplicate(this.rebateParameters);
        rebateParameters.conditions[key] = value;
        this.setStates({ rebateParameters });
    }

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let rebateParameters = Utils.duplicate(this.rebateParameters);
        rebateParameters.conditions.beginTime = dateStrings[0];
        rebateParameters.conditions.endTime = dateStrings[1];
        this.setStates({ rebateParameters });
    }

    // 搜索
    async search() {
        try {
            let rebateParameters = Utils.duplicate(this.rebateParameters);
            rebateParameters.pageNum = 1;
            this.setStates({ rebateParameters });
            await this.fetchRebateOrders();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportRebateOrders();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let rebateParameters = Utils.duplicate(this.rebateParameters);
        rebateParameters.pageNum = page;
        rebateParameters.pageSize = pageSize;
        this.setStates({ rebateParameters });
        this.fetchRebateOrders();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let rebateParameters = Utils.duplicate(this.rebateParameters);
        rebateParameters.pageNum = 1;
        rebateParameters.pageSize = pageSize;
        this.setStates({ rebateParameters });
        this.fetchRebateOrders();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchRebateOrders();
    }
}
