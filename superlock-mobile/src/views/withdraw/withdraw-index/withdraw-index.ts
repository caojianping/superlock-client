import Vue from 'vue';
import { namespace, State, Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import Locales from '@/locales';
import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt, From } from '@/ts/common';
import { UsableQuotaModel, UserInfoModel, WithdrawFormModel, WithdrawAddressModel } from '@/ts/models';
import { WithdrawService } from '@/ts/services';

import { Toast, PullRefresh, Field, Icon, Button } from 'vant';
import Header from '@/components/common/header';
import PasswordModal from '@/components/common/password-modal';

const i18n = Locales.buildLocale();
const userModule = namespace('user');
const withdrawModule = namespace('withdraw');

@Component({
    name: 'WithdrawIndex',
    components: { PullRefresh, Field, Icon, Button, Header, PasswordModal }
})
export default class WithdrawIndex extends Vue {
    @State('usableQuota') usableQuota?: UsableQuotaModel | null;
    @Action('fetchUsableQuota') fetchUsableQuota!: () => any;

    @userModule.State('userInfo') userInfo?: UserInfoModel | null;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: (isLoading?: boolean) => any;

    @withdrawModule.State('withdrawForm') withdrawForm!: WithdrawFormModel;
    @withdrawModule.State('withdrawAddresses') withdrawAddresses?: Array<WithdrawAddressModel>;
    @withdrawModule.State('selectedWithdrawAddress') selectedWithdrawAddress?: WithdrawAddressModel;
    @withdrawModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @withdrawModule.Mutation(TYPES.CLEAR_STATES) clearStates!: (withoutSelected: boolean) => any;
    @withdrawModule.Action('executeWithdraw') executeWithdraw!: () => any;
    @withdrawModule.Action('fetchWithdrawAddresses') fetchWithdrawAddresses!: (isLoading: boolean) => any;

    isPulling: boolean = false; // 是否下拉刷新
    isShow: boolean = false; // 是否显示密码模态框

    // 跳转至提现地址页面
    goAddress() {
        this.$router.push({ path: '/withdraw/address', query: { from: '/withdraw/index' } });
    }

    // 提现全部金额
    withdrawAll() {
        let withdrawForm = Utils.duplicate(this.withdrawForm);
        withdrawForm.amount = this.usableQuota ? this.usableQuota.amount : 0;
        this.setStates({ withdrawForm });
    }

    // 处理Field组件input事件
    handleFieldInput(key: string, value: string) {
        let withdrawForm = Utils.duplicate(this.withdrawForm);
        withdrawForm[key] = value;
        this.setStates({ withdrawForm });
    }

    // 提交提现表单
    async submit() {
        let result: ValidationResult = WithdrawService.validateWithdrawForm(this.withdrawForm, false);
        if (!result.status) return Prompt.error(Utils.getFirstValue(result.data));

        if (!this.userInfo || !this.userInfo.haveFundPasswd) {
            Prompt.info(i18n.tc('COMMON.SETTING_FUND')).then(() => {
                From.setFundFrom('/withdraw/index');
                this.$router.push({
                    path: '/security/fund/password',
                    query: { from: '/withdraw/index' }
                });
            });
            return;
        }

        this.isShow = true;
    }

    // 处理密码模态框submit事件
    async handlePasswordModalSubmit(password: string) {
        let withdrawForm = Utils.duplicate(this.withdrawForm);
        withdrawForm.fundPasswd = password;
        this.setStates({ withdrawForm });

        try {
            Toast.loading({ mask: true, duration: 0, message: i18n.tc('COMMON.LOADING') });
            let result = await this.executeWithdraw();
            if (!result) {
                Toast.clear();
                this.$router.push({ path: '/withdraw/result/0' });
            } else {
                await this.fetchUsableQuota();
                Toast.clear();
                this.$router.push({
                    path: '/withdraw/result/1',
                    query: { address: withdrawForm.address, amount: String(withdrawForm.amount) }
                });
            }
        } catch (error) {
            Toast.clear();
            this.$router.push({
                path: '/withdraw/result/0',
                query: { msg: error.message || error }
            });
        }
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        Toast.loading({ mask: true, duration: 0, message: i18n.tc('COMMON.LOADING') });
        (!this.usableQuota || isRefresh) && (await this.fetchUsableQuota());
        (!this.userInfo || isRefresh) && (await this.fetchUserInfo());

        let withdrawForm = new WithdrawFormModel();
        withdrawForm.maxAmount = this.usableQuota ? this.usableQuota.amount : 0;

        let selectedWithdrawAddress = this.selectedWithdrawAddress;
        if (selectedWithdrawAddress) {
            // 如果已经有选择的提现地址
            withdrawForm.address = selectedWithdrawAddress.address;
        } else {
            // 如果没有选择的提现地址（大部分情况为第一次提现操作时），那么将第一个提现地址设置为已选择提现地址
            if (!this.withdrawAddresses || this.withdrawAddresses.length <= 0) {
                await this.fetchWithdrawAddresses(false);
            }

            let firstAddress = (this.withdrawAddresses || [])[0];
            if (firstAddress) {
                withdrawForm.address = firstAddress.address;
                this.setStates({ selectedWithdrawAddress: firstAddress });
            }
        }

        this.setStates({ withdrawForm });
        Toast.clear();
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData(true);
        this.isPulling = false;
        Toast(i18n.tc('COMMON.REFRESH_SUCCESS'));
    }

    mounted() {
        this.fetchData(false);
    }
}
