import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { WithdrawSource } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { WithdrawFormModel, WithdrawAddressModel } from '@/ts/models';

import { Field, Icon, Button } from 'vant';
import Header from '@/components/common/header';
import Modal from '@/components/common/modal';

const withdrawModule = namespace('withdraw');

@Component({
    name: 'WithdrawIndex',
    components: { Field, Icon, Button, Header, Modal }
})
export default class WithdrawIndex extends Vue {
    @withdrawModule.State('withdrawForm') withdrawForm!: WithdrawFormModel;
    @withdrawModule.State('withdrawAddresses') withdrawAddresses!: Array<
        WithdrawAddressModel
    >;
    @withdrawModule.State('selectedWithdrawAddress')
    selectedWithdrawAddress?: WithdrawAddressModel;

    @withdrawModule.Mutation(TYPES.SET_STATES) setStates!: (
        payload: any
    ) => any;
    @withdrawModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @withdrawModule.Action('executeWithdraw') executeWithdraw!: () => any;
    @withdrawModule.Action('fetchWithdrawAddresses')
    fetchWithdrawAddresses!: () => any;

    isShow: boolean = false;

    // 跳转提现地址页面
    goAddress() {
        this.$router.push(`/withdraw/address/${WithdrawSource.Withdraw}`);
    }

    // 提现全部金额
    withdrawAll() {
        let withdrawForm = Utils.duplicate(this.withdrawForm);
        withdrawForm.amount = 999;
        this.setStates({ withdrawForm });
    }

    // 处理Field控件input事件
    handleFieldInput(key: string, value: string) {
        let withdrawForm = Utils.duplicate(this.withdrawForm);
        withdrawForm[key] = value;
        this.setStates({ withdrawForm });
    }

    // 处理文本框控件change事件
    handlePasswordChange(event: any) {
        let withdrawForm = Utils.duplicate(this.withdrawForm);
        withdrawForm.fundPasswd = event.target.value;
        this.setStates({ withdrawForm });
    }

    // 打开模态框
    async openModal() {
        console.log(111);
        this.isShow = true;
    }

    // 提交提现表单
    async submit() {
        console.log(222);
        try {
            let result = await this.executeWithdraw();
            if (result) Prompt.success('提现成功');
            else Prompt.success('提现失败');
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 获取数据
    async fetchData() {
        let withdrawForm = Utils.duplicate(this.withdrawForm),
            selectedWithdrawAddress = this.selectedWithdrawAddress;
        if (selectedWithdrawAddress) {
            // 如果已经有选择的提现地址
            withdrawForm.address = selectedWithdrawAddress.address;
            this.setStates({ withdrawForm });
        } else {
            // 如果没有选择的提现地址（大部分情况为第一次提现操作时），那么将第一个提现地址设置为已选择提现地址
            let withdrawAddresses = this.withdrawAddresses;
            if (withdrawAddresses.length <= 0) {
                await this.fetchWithdrawAddresses();
            }

            let firstAddress = withdrawAddresses[0];
            if (firstAddress) {
                withdrawForm.address = firstAddress.address;
                this.setStates({
                    withdrawForm,
                    selectedWithdrawAddress: firstAddress
                });
            }
        }
    }

    mounted() {
        this.fetchData();
    }
}
