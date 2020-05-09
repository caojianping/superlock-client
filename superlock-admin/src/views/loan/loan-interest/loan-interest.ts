import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { IPageParameters, ILoanPageParameters } from '@/ts/interfaces';
import { LoanInterestModel } from '@/ts/models';
import { Prompt } from '@/ts/common';

const loanModule = namespace('loan');

@Component({
    name: 'LoanInterest',
    components: {}
})
export default class LoanInterest extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;

    @loanModule.State('loanParameters') loanParameters!: IPageParameters<ILoanPageParameters>;
    @loanModule.State('totalCount') totalCount!: number;
    @loanModule.State('list') list!: Array<LoanInterestModel>;

    @loanModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loanModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @loanModule.Action('fetchLoanInterests') fetchLoanInterests!: () => any;
    @loanModule.Action('exportLoanInterests') exportLoanInterests!: () => any;

    columns: Array<any> = [
        {
            title: '时间',
            dataIndex: 'createTime'
        },
        {
            title: '贷款订单号',
            dataIndex: 'loanSerial'
        },
        {
            title: 'UID',
            dataIndex: 'uid'
        },
        {
            title: '抵押锁仓订单号',
            dataIndex: 'lockSerial'
        },
        {
            title: '抵押锁仓价值(DC)',
            dataIndex: 'lockAmount'
        },
        {
            title: '贷款年利率(%)',
            dataIndex: 'loanRate'
        },
        {
            title: '贷款价值(DC)',
            dataIndex: 'loanAmount'
        },
        {
            title: '每日利息(DC)',
            dataIndex: 'interest'
        },
        {
            title: '备注',
            dataIndex: 'memo'
        }
    ];

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let loanParameters = Utils.duplicate(this.loanParameters);
        loanParameters.conditions[key] = value;
        this.setStates({ loanParameters });
    }

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let loanParameters = Utils.duplicate(this.loanParameters);
        loanParameters.conditions.beginTime = dateStrings[0];
        loanParameters.conditions.endTime = dateStrings[1];
        this.setStates({ loanParameters });
    }

    // 搜索
    async search() {
        try {
            let loanParameters = Utils.duplicate(this.loanParameters);
            loanParameters.pageNum = 1;
            this.setStates({ loanParameters });
            await this.fetchLoanInterests();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportLoanInterests();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let loanParameters = Utils.duplicate(this.loanParameters);
        loanParameters.pageNum = page;
        loanParameters.pageSize = pageSize;
        this.setStates({ loanParameters });
        this.fetchLoanInterests();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let loanParameters = Utils.duplicate(this.loanParameters);
        loanParameters.pageNum = current;
        loanParameters.pageSize = pageSize;
        this.setStates({ loanParameters });
        this.fetchLoanInterests();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchLoanInterests();
    }
}
