import Vue from 'vue';
import { namespace, State, Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { ReviewType, ReviewStatus } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { IPageParameters, IRebateOrderPageParameters, ISelectOption } from '@/ts/interfaces';
import { RebateOrderModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const financeModule = namespace('finance');
const carrierModule = namespace('carrier');

@Component({
    name: 'RebateOrder',
    components: { SecondVerify }
})
export default class RebateOrder extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('carrierOptions') carrierOptions!: Array<ISelectOption>;
    @Action('fetchCarrierOptions') fetchCarrierOptions!: () => any;

    @carrierModule.State('rebateParameters') rebateParameters!: IPageParameters<IRebateOrderPageParameters>;
    @carrierModule.State('totalCount') totalCount!: number;
    @carrierModule.State('list') list!: Array<RebateOrderModel>;
    @carrierModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @carrierModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @carrierModule.Action('fetchRebateOrders') fetchRebateOrders!: () => any;
    @carrierModule.Action('exportRebateOrders') exportRebateOrders!: () => any;
    @financeModule.Action('setReview') setReview!: (payload: any) => any;

    serial: string = '';
    status: ReviewStatus = ReviewStatus.Audit;

    statusColors: any = {
        '1': 'text-grey',
        '3': 'text-green',
        '5': 'text-red'
    };

    statusNames: any = {
        '1': '待审核',
        '3': '审核成功',
        '5': '审核驳回'
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
            title: '结算周期',
            dataIndex: 'billingCycle'
        },
        {
            title: '新增锁仓(DC)',
            dataIndex: 'lockAmount'
        },
        {
            title: '返点比例(%)',
            dataIndex: '',
            key: 'rebateRatio',
            scopedSlots: { customRender: 'rebateRatio' }
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
            dataIndex: '',
            key: 'status',
            scopedSlots: { customRender: 'status' }
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'operation',
            scopedSlots: { customRender: 'operation' }
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

    // 设置审查操作
    async _setReview(isCode: boolean = false) {
        try {
            let { serial, status } = this,
                result = await this.setReview({ serial, type: ReviewType.Rebate, status, isCode });
            if (!result) Prompt.error('操作失败');
            else await this.fetchRebateOrders();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 设置操作
    async setOperate(serial: string, status: ReviewStatus) {
        this.serial = serial;
        this.status = status;
        await this._setReview(false);
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit() {
        await this._setReview(true);
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

    // 获取数据
    async fetchData() {
        if (this.carrierOptions.length <= 0) {
            await this.fetchCarrierOptions();
        }
        await this.fetchRebateOrders();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchData();
    }
}
