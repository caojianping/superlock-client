import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { ISelectOption, IPageParameters, IRechargePageParameters } from '@/ts/interfaces';
import { RechargeModel } from '@/ts/models';

const rechargeModule = namespace('recharge');

@Component({
    name: 'RechargeOrder',
    components: {}
})
export default class RechargeOrder extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('coinOptions') coinOptions!: Array<ISelectOption>;

    @rechargeModule.State('rechargeParameters') rechargeParameters!: IPageParameters<IRechargePageParameters>;
    @rechargeModule.State('totalCount') totalCount!: number;
    @rechargeModule.State('list') list!: Array<RechargeModel>;
    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @rechargeModule.Action('fetchRecharges') fetchRecharges!: () => any;
    @rechargeModule.Action('exportRecharges') exportRecharges!: () => any;

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
            title: '交易hash',
            dataIndex: '',
            key: 'hash',
            scopedSlots: { customRender: 'hash' }
        },
        {
            title: '充值地址',
            dataIndex: '',
            key: 'address',
            scopedSlots: { customRender: 'address' }
        },
        {
            title: '充值时间',
            dataIndex: '',
            key: 'date',
            scopedSlots: { customRender: 'date' }
        },
        {
            title: '充值币种',
            dataIndex: 'coinCode'
        },
        {
            title: '充值数量',
            dataIndex: 'amount'
        },
        {
            title: '汇率',
            dataIndex: 'rate'
        },
        {
            title: '入账币种',
            dataIndex: 'rechargeCoinCode'
        },
        {
            title: '入账数量',
            dataIndex: 'rechargeAmount'
        },
        {
            title: '状态',
            dataIndex: 'status'
        }
    ];

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let rechargeParameters = Utils.duplicate(this.rechargeParameters);
        rechargeParameters.conditions[key] = value;
        this.setStates({ rechargeParameters });
    }

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let rechargeParameters = Utils.duplicate(this.rechargeParameters);
        rechargeParameters.conditions.beginTime = dateStrings[0];
        rechargeParameters.conditions.endTime = dateStrings[1];
        this.setStates({ rechargeParameters });
    }

    // 搜索
    async search() {
        try {
            let rechargeParameters = Utils.duplicate(this.rechargeParameters);
            rechargeParameters.pageNum = 1;
            this.setStates({ rechargeParameters });
            await this.fetchRecharges();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportRecharges();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let rechargeParameters = Utils.duplicate(this.rechargeParameters);
        rechargeParameters.pageNum = page;
        rechargeParameters.pageSize = pageSize;
        this.setStates({ rechargeParameters });
        this.fetchRecharges();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let rechargeParameters = Utils.duplicate(this.rechargeParameters);
        rechargeParameters.pageNum = 1;
        rechargeParameters.pageSize = pageSize;
        this.setStates({ rechargeParameters });
        this.fetchRecharges();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchRecharges();
    }
}
