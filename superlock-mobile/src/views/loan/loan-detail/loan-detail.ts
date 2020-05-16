import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import ClipboardJS from 'clipboard';
import { SessionStorage } from 'jts-storage';

import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { From, Prompt } from '@/ts/common';
import { LoanModel } from '@/ts/models';

import { CellGroup, Cell, Button } from 'vant';
import Header from '@/components/common/header';

const loanModule = namespace('loan');

@Component({
    name: 'LoanDetail',
    components: { CellGroup, Cell, Button, Header }
})
export default class LoanDetail extends Vue {
    @loanModule.State('loanColors') loanColors!: Map<number, string>;
    @loanModule.State('loanStatuses') loanStatuses!: Map<number, string>;
    @loanModule.State('id') id!: string;
    @loanModule.State('loan') loan?: LoanModel | null;

    @loanModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loanModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @loanModule.Action('fetchLoan') fetchLoan!: () => any;

    from: string = ''; // 页面来源

    get title() {
        let loan = this.loan;
        return loan && (loan.status === 0 || loan.status === 10) ? '贷款申请信息' : '贷款明细';
    }

    // 初始化数据
    initData() {
        let params: any = this.$route.params || {},
            id = params.id || '';
        if (!id) {
            this.setStates({ id: '' });
            let loan = SessionStorage.getItem<LoanModel>(CONSTANTS.LOAN);
            this.setStates({ loan });
        }
        this.setStates({ id });

        let query: any = this.$route.query || {};
        this.from = query.from || From.getLoanFrom();
    }

    // 复制贷款订单号
    copyOrderId() {
        let orderId = document.getElementById('orderId'),
            clipboard = new ClipboardJS(orderId);
        clipboard.on('success', function(e) {
            Prompt.success('贷款订单号复制成功');
        });
        clipboard.on('error', function(e) {
            Prompt.error('贷款订单号复制失败');
        });
    }

    // 复制质押锁仓订单号
    copyLockOrderId() {
        let lockOrderId = document.getElementById('lockOrderId'),
            clipboard = new ClipboardJS(lockOrderId);
        clipboard.on('success', function(e) {
            Prompt.success('质押锁仓订单号复制成功');
        });
        clipboard.on('error', function(e) {
            Prompt.error('质押锁仓订单号复制失败');
        });
    }

    created() {
        this.initData();
    }

    mounted() {
        this.copyOrderId();
        this.copyLockOrderId();
        this.id && this.fetchLoan();
    }
}
