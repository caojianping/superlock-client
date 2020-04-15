import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { ISelectOption, IPageParameters, IFundPageParameters } from '@/ts/interfaces';
import { FundModel } from '@/ts/models';

const fundModule = namespace('fund');

@Component({
    name: 'FundRecord',
    components: {}
})
export default class FundRecord extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;

    @fundModule.State('coinOptions') coinOptions!: Array<ISelectOption>;
    @fundModule.State('orderOptions') orderOptions!: Array<ISelectOption>;
    @fundModule.State('accountOptions') accountOptions!: Array<ISelectOption>;
    @fundModule.State('parameters') parameters!: IPageParameters<IFundPageParameters>;
    @fundModule.State('totalCount') totalCount!: number;
    @fundModule.State('list') list!: Array<FundModel>;
    @fundModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @fundModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @fundModule.Action('fetchFunds') fetchFunds!: () => any;
    @fundModule.Action('exportFunds') exportFunds!: () => any;

    columns: Array<any> = [
        {
            title: '时间',
            dataIndex: '',
            key: 'createTime',
            scopedSlots: { customRender: 'createTime' }
        },
        {
            title: '订单号',
            dataIndex: '',
            key: 'orderId',
            scopedSlots: { customRender: 'orderId' }
        },
        {
            title: '订单类型',
            dataIndex: 'orderType'
        },
        {
            title: '账户UID',
            dataIndex: '',
            key: 'uid',
            scopedSlots: { customRender: 'uid' }
        },
        {
            title: '账户名称',
            dataIndex: 'accountName'
        },
        {
            title: '交易币种',
            dataIndex: 'coinCode'
        },
        {
            title: '交易数量',
            dataIndex: 'value'
        },
        {
            title: '操作',
            dataIndex: 'operating'
        },
        {
            title: '变动前币种数量',
            dataIndex: 'beforeMoney'
        },
        {
            title: '变动后币种数量',
            dataIndex: 'afterMoney'
        },
        {
            title: '备注',
            dataIndex: 'memo'
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
        parameters.conditions.beginTime = dateStrings[0];
        parameters.conditions.endTime = dateStrings[1];
        this.setStates({ parameters });
    }

    // 搜索
    async search() {
        try {
            let parameters = Utils.duplicate(this.parameters);
            parameters.pageNum = 1;
            this.setStates({ parameters });
            await this.fetchFunds();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportFunds();
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
        this.fetchFunds();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let parameters = Utils.duplicate(this.parameters);
        parameters.pageNum = 1;
        parameters.pageSize = pageSize;
        this.setStates({ parameters });
        this.fetchFunds();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchFunds();
    }
}
