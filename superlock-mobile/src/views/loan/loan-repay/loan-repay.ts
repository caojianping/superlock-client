import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';
import { SessionStorage } from 'jts-storage';

import Locales from '@/locales';
import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { CONSTANTS } from '@/ts/config';
import { Prompt, From, Clipboard } from '@/ts/common';
import { LoanModel, LoanRepayFormModel, UserInfoModel } from '@/ts/models';
import { LoanService } from '@/ts/services';

import { Toast, PullRefresh, CellGroup, Cell, Button } from 'vant';
import Header from '@/components/common/header';
import PasswordModal from '@/components/common/password-modal';

const i18n = Locales.buildLocale();
const userModule = namespace('user');
const loanModule = namespace('loan');

@Component({
    name: 'LoanRepay',
    components: { PullRefresh, CellGroup, Cell, Button, Header, PasswordModal }
})
export default class LoanRepay extends Vue {
    @userModule.State('userInfo') userInfo?: UserInfoModel | null;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: (isLoading?: boolean) => any;

    @loanModule.State('loan') loan?: LoanModel | null;
    @loanModule.State('repayForm') repayForm!: LoanRepayFormModel;
    @loanModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loanModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @loanModule.Action('repayLoan') repayLoan!: () => any;

    isPulling: boolean = false; // 是否下拉刷新
    isShow: boolean = false; // 是否显示密码模态框

    // 提交偿还表单
    async submit() {
        let result: ValidationResult = LoanService.validateRepayForm(this.repayForm, false);
        if (!result.status) Prompt.error(Utils.getFirstValue(result.data));

        if (!this.userInfo || !this.userInfo.haveFundPasswd) {
            Prompt.info(i18n.tc('COMMON.SETTING_FUND')).then(() => {
                From.setFundFrom('/loan/repay');
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
            this.$router.push(`/loan/repay/result/${result ? 1 : 0}`);
        } catch (error) {
            this.$router.push({
                path: '/loan/repay/result/0',
                query: { msg: error.message || error }
            });
        }
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        Toast.loading({ mask: true, duration: 0, message: i18n.tc('COMMON.LOADING') });
        (!this.userInfo || isRefresh) && (await this.fetchUserInfo());

        let repayForm = new LoanRepayFormModel(),
            loan = this.loan;
        if (loan) {
            repayForm.loansSerial = loan.orderId;
        }
        this.setStates({ repayForm });
        Toast.clear();

        Clipboard.copy('orderId', i18n.tc('LOAN.LOAN_ORDER_ID'));
        Clipboard.copy('lockOrderId', i18n.tc('LOAN.PLEDGE_LOCK_ORDER_ID'));
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData(true);
        this.isPulling = false;
        Toast(i18n.tc('COMMON.REFRESH_SUCCESS'));
    }

    // 初始化数据
    initData() {
        let loan = SessionStorage.getItem<LoanModel>(CONSTANTS.LOAN);
        this.setStates({ loan });
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchData(false);
    }
}
