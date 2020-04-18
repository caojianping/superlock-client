import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component, Model, Watch } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { CarrierInfoModel, WithdrawFormModel } from '@/ts/models';
import { CarrierService } from '@/ts/services';

const carrierModule = namespace('carrier');

@Component({
    name: 'WithdrawModal',
    components: {}
})
export default class WithdrawModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @carrierModule.State('carrierInfo') carrierInfo?: CarrierInfoModel | null; // 运营数据

    isShow: boolean = this.value; // 是否显示模态框
    withdrawForm: WithdrawFormModel = new WithdrawFormModel(); // 提现表单

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let withdrawForm = Utils.duplicate(this.withdrawForm);
        withdrawForm[key] = value;
        this.withdrawForm = withdrawForm;
    }

    // 提现全部余额
    withdrawAll() {
        let withdrawForm = Utils.duplicate(this.withdrawForm);
        withdrawForm.value = withdrawForm.maxAmount;
        this.withdrawForm = withdrawForm;
    }

    // 提交提现表单
    async submit() {
        let withdrawForm = this.withdrawForm,
            result: ValidationResult = CarrierService.validateWithdrawForm(withdrawForm);
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        this.$emit('close', false);
        this.$emit('submit', withdrawForm);
    }

    // 初始化数据
    initData() {
        let withdrawForm = new WithdrawFormModel(),
            carrierInfo = this.carrierInfo;
        if (carrierInfo) {
            withdrawForm.carrierId = 0; // todo: 运营商编号待讨论
            withdrawForm.maxAmount = carrierInfo.bcbBalance;
        }
        this.withdrawForm = withdrawForm;
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            this.initData();
        }
    }
}
