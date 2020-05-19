import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';
import { SessionStorage } from 'jts-storage';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { CONSTANTS } from '@/ts/config';
import { Prompt, From } from '@/ts/common';
import { UserInfoModel, LoanBaseInfoModel, LoanableLockModel, LoanApplyFormModel } from '@/ts/models';
import { LoanService } from '@/ts/services';

import { Toast, PullRefresh, CellGroup, Cell, Field, Button } from 'vant';
import Header from '@/components/common/header';
import PasswordModal from '@/components/common/password-modal';

const userModule = namespace('user');
const loanModule = namespace('loan');

@Component({
    name: 'LoanApply',
    components: { PullRefresh, CellGroup, Cell, Field, Button, Header, PasswordModal }
})
export default class LoanApply extends Vue {
    @userModule.State('userInfo') userInfo?: UserInfoModel | null;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: (isLoading?: boolean) => any;

    @loanModule.State('loanBaseInfo') loanBaseInfo?: LoanBaseInfoModel | null;
    @loanModule.State('loanableLock') loanableLock?: LoanableLockModel | null;
    @loanModule.State('applyForm') applyForm!: LoanApplyFormModel;

    @loanModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loanModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @loanModule.Action('fetchLoanBaseInfo') fetchLoanBaseInfo!: () => any;
    @loanModule.Action('applyLoan') applyLoan!: () => any;

    isPulling: boolean = false; // 是否下拉刷新
    isShow: boolean = false; // 是否显示密码模态框

    // 处理Field组件input事件
    handleFieldInput(key: string, value: any) {
        let applyForm = Utils.duplicate(this.applyForm);
        applyForm[key] = value;
        this.setStates({ applyForm });
    }

    // 提交申请表单
    async submit() {
        let result: ValidationResult = LoanService.validateApplyForm(this.applyForm, false);
        if (!result.status) return Prompt.error(Utils.getFirstValue(result.data));

        if (!this.userInfo || !this.userInfo.haveFundPasswd) {
            Prompt.info('您未设置资金密码，请先设置资金密码').then(() => {
                From.setFundFrom('/loan/apply');
                this.$router.push({
                    path: '/security/fund/password',
                    query: { from: '/loan/apply' }
                });
            });
            return;
        }

        this.isShow = true;
    }

    // 处理密码模态框submit事件
    async handlePasswordModalSubmit(password: string) {
        let applyForm = Utils.duplicate(this.applyForm);
        applyForm.fundPasswd = password;
        this.setStates({ applyForm });

        try {
            let result = await this.applyLoan();
            if (!result) Prompt.error('申请失败');
            else this.$router.push(`/loan/apply/result/${applyForm.lockOrderId}`);
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        Toast.loading({ mask: true, duration: 0, message: '加载中...' });
        (!this.userInfo || isRefresh) && (await this.fetchUserInfo());
        (!this.loanBaseInfo || isRefresh) && (await this.fetchLoanBaseInfo());

        let loanableLock = this.loanableLock,
            applyForm = new LoanApplyFormModel();
        if (loanableLock) {
            applyForm.lockOrderId = loanableLock.orderId;
            applyForm.minAmount = loanableLock.minLoanAmount;
            applyForm.maxAmount = loanableLock.maxLoanAmount;
            applyForm.minDuration = 1;
            applyForm.maxDuration = loanableLock.maxLoanDays;
            this.setStates({ applyForm });
        }
        Toast.clear();
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData(true);
        this.isPulling = false;
        Toast('刷新成功');
    }

    // 初始化数据
    initData() {
        let loanableLock = this.loanableLock;
        if (!loanableLock) {
            loanableLock = SessionStorage.getItem<LoanableLockModel>(CONSTANTS.LOANABLE_LOCK);
        }
        this.setStates({ loanableLock });
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchData(false);
    }
}
