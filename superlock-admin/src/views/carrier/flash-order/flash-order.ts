import Vue from 'vue';
import { namespace, State, Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { IPageParameters, IFlashOrderPageParameters, ISelectOption } from '@/ts/interfaces';
import { FlashOrderModel } from '@/ts/models';

const carrierModule = namespace('carrier');

@Component({
    name: 'FlashOrder',
    components: {}
})
export default class FlashOrder extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('carrierOptions') carrierOptions!: Array<ISelectOption>;
    @Action('fetchCarrierOptions') fetchCarrierOptions!: () => any;

    @carrierModule.State('flashParameters') flashParameters!: IPageParameters<IFlashOrderPageParameters>;
    @carrierModule.State('totalCount') totalCount!: number;
    @carrierModule.State('list') list!: Array<FlashOrderModel>;
    @carrierModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @carrierModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @carrierModule.Action('fetchFlashOrders') fetchFlashOrders!: () => any;
    @carrierModule.Action('exportFlashOrders') exportFlashOrders!: () => any;

    statusOptions: Array<ISelectOption> = [
        { label: '全部', value: '' },
        { label: '成功', value: '20' },
        { label: '失败', value: '30' },
        { label: '闪兑中', value: '10' },
        { label: '订单创建中', value: '0' },
        { label: '订单已关闭', value: '40' }
    ];
    statusNames: any = {
        '0': '订单创建中',
        '10': '闪兑中',
        '20': '成功',
        '30': '失败',
        '40': '订单已关闭'
    };
    statusColors: any = {
        '0': 'text-black',
        '10': 'text-grey',
        '20': 'text-green',
        '30': 'text-red',
        '40': 'text-grey'
    };

    columns: Array<any> = [
        {
            title: '订单号',
            dataIndex: '',
            key: 'serial',
            scopedSlots: { customRender: 'serial' }
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
            title: '原币种',
            dataIndex: 'coinCode'
        },
        {
            title: '原币种数量',
            dataIndex: 'amount'
        },
        {
            title: '目标币种',
            dataIndex: 'flashCoinCode'
        },
        {
            title: '到账币种数量',
            dataIndex: 'flashAmount'
        },
        {
            title: '汇率',
            dataIndex: 'rate'
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
            dataIndex: '',
            key: 'status',
            scopedSlots: { customRender: 'status' }
        }
    ];

    // 运营商过滤选项
    carrierFilterOption(input: string, option: any) {
        let text = option.componentOptions.children[0].text.toLowerCase(),
            tinput = input.toLowerCase();
        return text.indexOf(tinput) > -1;
    }

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let flashParameters = Utils.duplicate(this.flashParameters);
        flashParameters.conditions[key] = value;
        this.setStates({ flashParameters });
    }

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let flashParameters = Utils.duplicate(this.flashParameters);
        flashParameters.conditions.beginTime = dateStrings[0];
        flashParameters.conditions.endTime = dateStrings[1];
        this.setStates({ flashParameters });
    }

    // 搜索
    async search() {
        try {
            let flashParameters = Utils.duplicate(this.flashParameters);
            flashParameters.pageNum = 1;
            this.setStates({ flashParameters });
            await this.fetchFlashOrders();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportFlashOrders();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let flashParameters = Utils.duplicate(this.flashParameters);
        flashParameters.pageNum = page;
        flashParameters.pageSize = pageSize;
        this.setStates({ flashParameters });
        this.fetchFlashOrders();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let flashParameters = Utils.duplicate(this.flashParameters);
        flashParameters.pageNum = 1;
        flashParameters.pageSize = pageSize;
        this.setStates({ flashParameters });
        this.fetchFlashOrders();
    }

    // 获取数据，同时请求
    fetchData() {
        this.fetchCarrierOptions();
        this.fetchFlashOrders();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchData();
    }
}
