import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt, Token } from '@/ts/common';
import { LoanModel, LoanRepayFormModel, UserInfoModel } from '@/ts/models';
import { LoanService } from '@/ts/services';

import { Toast, CellGroup, Cell, Button } from 'vant';
import Header from '@/components/common/header';
import PasswordModal from '@/components/common/password-modal';
import { SessionStorage } from 'jts-storage';
import { CONSTANTS } from '@/ts/config';

const userModule = namespace('user');
const loanModule = namespace('loan');

@Component({
    name: 'LoanRepay',
    components: { CellGroup, Cell, Button, Header, PasswordModal }
})
export default class LoanRepay extends Vue {
    @userModule.State('userInfo') userInfo!: UserInfoModel;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: () => any;

    @loanModule.State('loan') loan?: LoanModel | null;
    @loanModule.State('repayForm') repayForm!: LoanRepayFormModel;

    @loanModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loanModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @loanModule.Action('repayLoan') repayLoan!: () => any;

    isShow: boolean = false; // 是否显示密码模态框

    // 提交偿还表单
    async submit() {
        let result: ValidationResult = LoanService.validateRepayForm(this.repayForm, false);
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        let haveFundPasswd = this.userInfo.haveFundPasswd;
        if (!haveFundPasswd) {
            Prompt.info('您未设置资金密码，请先设置资金密码').then(() => {
                Token.setFundFrom('/loan/repay');
                this.$router.push({
                    path: '/security/fund/password',
                    query: { from: '/loan/repay' }
                });
            });
            return;
        }

        this.isShow = true;
    }

    // 处理密码模态框submit事件
    async handlePasswordModalSubmit(password: string) {
        let repayForm = Utils.duplicate(this.repayForm);
        repayForm.fundPasswd = password;
        this.setStates({ repayForm });

        try {
            let result = await this.repayLoan();
            if (!result) Prompt.error('还款失败');
            else {
                Prompt.success('还款成功');
                this.$router.push('/loan/repay/result');
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 初始化数据
    initData() {
        let loan = SessionStorage.getItem<LoanModel>(CONSTANTS.LOAN);
        this.setStates({ loan });
    }

    // 获取数据
    async fetchData() {
        Toast.loading({ mask: true, duration: 0, message: '加载中...' });
        await this.fetchUserInfo();

        let repayForm = new LoanRepayFormModel(),
            loan = this.loan;
        if (loan) {
            repayForm.loansSerial = loan.orderId;
        }
        this.setStates({ repayForm });
        Toast.clear();
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchData();
    }
}
