import Vue from 'vue';
import { namespace, State, Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt, From } from '@/ts/common';
import { QuotaModel, UserInfoModel, WithdrawFormModel, WithdrawAddressModel } from '@/ts/models';
import { WithdrawService } from '@/ts/services';

import { Toast, Field, Icon, Button } from 'vant';
import Header from '@/components/common/header';
import PasswordModal from '@/components/common/password-modal';

const userModule = namespace('user');
const withdrawModule = namespace('withdraw');

@Component({
    name: 'WithdrawIndex',
    components: { Field, Icon, Button, Header, PasswordModal }
})
export default class WithdrawIndex extends Vue {
    @State('quota') quota?: QuotaModel | null;
    @Action('fetchQuota') fetchQuota!: () => any;

    @userModule.State('userInfo') userInfo!: UserInfoModel;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: () => any;

    @withdrawModule.State('withdrawForm') withdrawForm!: WithdrawFormModel;
    @withdrawModule.State('withdrawAddresses') withdrawAddresses?: Array<WithdrawAddressModel>;
    @withdrawModule.State('selectedWithdrawAddress') selectedWithdrawAddress?: WithdrawAddressModel;
    @withdrawModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @withdrawModule.Mutation(TYPES.CLEAR_STATES) clearStates!: (withoutSelected: boolean) => any;
    @withdrawModule.Action('executeWithdraw') executeWithdraw!: () => any;
    @withdrawModule.Action('fetchWithdrawAddresses') fetchWithdrawAddresses!: (isLoading: boolean) => any;

    isShow: boolean = false; // 是否显示密码模态框

    // 跳转至提现地址页面
    goAddress() {
        this.$router.push({ path: '/withdraw/address', query: { from: '/withdraw/index' } });
    }

    // 提现全部金额
    withdrawAll() {
        let withdrawForm = Utils.duplicate(this.withdrawForm);
        withdrawForm.amount = this.quota ? this.quota.amount : 0;
        this.setStates({ withdrawForm });
    }

    // 处理Field组件input事件
    handleFieldInput(key: string, value: string) {
        let withdrawForm = Utils.duplicate(this.withdrawForm);
        withdrawForm[key] = value;
        this.setStates({ withdrawForm });
    }

    // 提交提现
    async submit() {
        let result: ValidationResult = WithdrawService.validateWithdrawForm(this.withdrawForm, false);
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        let haveFundPasswd = this.userInfo.haveFundPasswd;
        if (!haveFundPasswd) {
            Prompt.info('您未设置资金密码，请先设置资金密码').then(() => {
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
            let result = await this.executeWithdraw();
            if (!result) this.$router.push({ path: '/withdraw/result/0' });
            else
                this.$router.push({
                    path: '/withdraw/result/1',
                    query: { address: withdrawForm.address, amount: String(withdrawForm.amount) }
                });
        } catch (error) {
            this.$router.push({
                path: '/withdraw/result/0',
                query: { msg: error.message || error }
            });
        }
    }

    // 初始化数据
    initData() {
        let query: any = this.$route.query || {},
            cache = Boolean(query.cache);
        this.clearStates(cache);
    }

    // 获取数据
    async fetchData() {
        Toast.loading({
            mask: true,
            duration: 0,
            message: '加载中...'
        });
        await this.fetchQuota();
        await this.fetchUserInfo();

        let withdrawForm = Utils.duplicate(this.withdrawForm);
        withdrawForm.maxAmount = this.quota ? this.quota.amount : 0;

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

    created() {
        this.initData();
    }

    mounted() {
        this.fetchData();
    }
}
