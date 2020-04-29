import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { ISelectOption, IPageParameters, IWithdrawOrderPageParameters } from '@/ts/interfaces';
import { WithdrawOrderModel } from '@/ts/models';

const carrierModule = namespace('carrier');

@Component({
    name: 'WithdrawOrder',
    components: {}
})
export default class WithdrawOrder extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('withdrawOptions') withdrawOptions!: Array<ISelectOption>;
    @State('auditColors') auditColors!: any;
    @State('auditNames') auditNames!: any;

    @carrierModule.State('withdrawParameters') withdrawParameters!: IPageParameters<IWithdrawOrderPageParameters>;
    @carrierModule.State('totalCount') totalCount!: number;
    @carrierModule.State('list') list!: Array<WithdrawOrderModel>;
    @carrierModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @carrierModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @carrierModule.Action('fetchWithdrawOrders') fetchWithdrawOrders!: () => any;
    @carrierModule.Action('exportWithdrawOrders') exportWithdrawOrders!: () => any;

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
            title: '提现地址',
            dataIndex: '',
            key: 'address',
            scopedSlots: { customRender: 'address' }
        },
        {
            title: '交易hash',
            dataIndex: '',
            key: 'txHash',
            scopedSlots: { customRender: 'txHash' }
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
            title: '提现时间',
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
            title: '账户余额',
            dataIndex: 'balance'
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
        let withdrawParameters = Utils.duplicate(this.withdrawParameters);
        withdrawParameters.conditions[key] = value;
        this.setStates({ withdrawParameters });
    }

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let withdrawParameters = Utils.duplicate(this.withdrawParameters);
        withdrawParameters.conditions.beginTime = dateStrings[0];
        withdrawParameters.conditions.endTime = dateStrings[1];
        this.setStates({ withdrawParameters });
    }

    // 搜索
    async search() {
        try {
            let withdrawParameters = Utils.duplicate(this.withdrawParameters);
            withdrawParameters.pageNum = 1;
            this.setStates({ withdrawParameters });
            await this.fetchWithdrawOrders();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportWithdrawOrders();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let withdrawParameters = Utils.duplicate(this.withdrawParameters);
        withdrawParameters.pageNum = page;
        withdrawParameters.pageSize = pageSize;
        this.setStates({ withdrawParameters });
        this.fetchWithdrawOrders();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let withdrawParameters = Utils.duplicate(this.withdrawParameters);
        withdrawParameters.pageNum = 1;
        withdrawParameters.pageSize = pageSize;
        this.setStates({ withdrawParameters });
        this.fetchWithdrawOrders();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchWithdrawOrders();
    }
}
