import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { ReviewStatus, ReviewType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { IPageParameters, ILoanPageParameters, ISelectOption } from '@/ts/interfaces';
import { LoanModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const financeModule = namespace('finance');
const loanModule = namespace('loan');

@Component({
    name: 'LoanOrder',
    components: { SecondVerify }
})
export default class LoanOrder extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('auditColors') auditColors!: any;
    @State('auditNames') auditNames!: any;

    @loanModule.State('statusOptions') statusOptions!: Array<ISelectOption>;
    @loanModule.State('statusColors') statusColors!: any;
    @loanModule.State('statusNames') statusNames!: any;

    @loanModule.State('loanParameters') loanParameters!: IPageParameters<ILoanPageParameters>;
    @loanModule.State('totalCount') totalCount!: number;
    @loanModule.State('list') list!: Array<LoanModel>;

    @loanModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loanModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @loanModule.Action('fetchLoans') fetchLoans!: () => any;
    @loanModule.Action('exportLoans') exportLoans!: () => any;

    @financeModule.Action('setReview') setReview!: (payload: any) => any;

    serial: string = '';
    status: ReviewStatus = ReviewStatus.Audit;

    columns: Array<any> = [
        {
            title: '贷款订单号',
            dataIndex: '',
            key: 'loanSerial',
            scopedSlots: { customRender: 'loanSerial' }
        },
        {
            title: 'UID',
            dataIndex: 'uid'
        },
        {
            title: '抵押锁仓订单号',
            dataIndex: '',
            key: 'lockSerial',
            scopedSlots: { customRender: 'lockSerial' }
        },
        {
            title: '抵押锁仓价值(DC)',
            dataIndex: 'lockAmount'
        },
        {
            title: '年利率(%)',
            dataIndex: '',
            key: 'loanRate',
            scopedSlots: { customRender: 'loanRate' }
        },
        {
            title: '贷款价值(DC)',
            dataIndex: 'loanAmount'
        },
        {
            title: '放贷汇率(DC:BCB)',
            dataIndex: 'rate'
        },
        {
            title: '贷款时长(天)',
            dataIndex: 'loanDate'
        },
        {
            title: '申请时间',
            dataIndex: 'applyTime'
        },
        {
            title: '放款时间',
            dataIndex: 'lendingTime'
        },
        {
            title: '累计利息(DC)',
            dataIndex: 'interest'
        },
        {
            title: '应还本息(DC)',
            dataIndex: 'totalAmount'
        },
        {
            title: '还款汇率(DC:BCB)',
            dataIndex: 'repaymentRate'
        },
        {
            title: '实际还款价值(BCB)',
            dataIndex: 'repaymentAmount'
        },
        {
            title: '还款时间',
            dataIndex: 'repaymentTime'
        },
        {
            title: '状态',
            dataIndex: '',
            key: 'status',
            scopedSlots: { customRender: 'status' }
        },
        {
            title: '审核状态',
            dataIndex: '',
            key: 'auditStatus',
            scopedSlots: { customRender: 'auditStatus' }
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'operation',
            scopedSlots: { customRender: 'operation' }
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
            await this.fetchLoans();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportLoans();
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
                result = await this.setReview({ serial, type: ReviewType.Loan, status, isCode });
            if (!result) Prompt.error('操作失败');
            else await this.fetchLoans();
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
        let loanParameters = Utils.duplicate(this.loanParameters);
        loanParameters.pageNum = page;
        loanParameters.pageSize = pageSize;
        this.setStates({ loanParameters });
        this.fetchLoans();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let loanParameters = Utils.duplicate(this.loanParameters);
        loanParameters.pageNum = current;
        loanParameters.pageSize = pageSize;
        this.setStates({ loanParameters });
        this.fetchLoans();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchLoans();
    }
}
