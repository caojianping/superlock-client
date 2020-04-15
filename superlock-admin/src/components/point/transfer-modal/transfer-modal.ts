import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { ISelectOption } from '@/ts/interfaces';
import { TransferInfoModel, TransferPointAccountModel, TransferReceiptAccountModel, TransferFormModel } from '@/ts/models';
import { PointService } from '@/ts/services';

const pointModule = namespace('point');

@Component({
    name: 'TransferModal',
    components: {}
})
export default class TransferModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly title!: string; // 标题

    @pointModule.State('transferInfo') transferInfo!: TransferInfoModel;
    @pointModule.Action('fetchTransferInfo') fetchTransferInfo!: () => any;

    isShow: boolean = this.value; // 是否显示模态框
    coinOptions: Array<ISelectOption> = [];
    accountOptions: Array<ISelectOption> = [];
    transferForm: TransferFormModel = new TransferFormModel();
    currentPointAccount: TransferPointAccountModel = new TransferPointAccountModel();
    currentReceiptAccount: TransferReceiptAccountModel = new TransferReceiptAccountModel();

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let transferForm = Utils.duplicate(this.transferForm);
        transferForm[key] = value;
        this.transferForm = transferForm;
    }

    // 处理币种change事件
    handleCoinChange(coin: string) {
        let pointAccounts = this.transferInfo.system_addmoney_account || [],
            currentPointAccount =
                pointAccounts.filter((pointAccount: TransferPointAccountModel) => pointAccount.coin === coin)[0] ||
                new TransferPointAccountModel();
        this.currentPointAccount = currentPointAccount;

        let transferForm = Utils.duplicate(this.transferForm);
        transferForm.fromId = currentPointAccount.id;
        transferForm.coin = currentPointAccount.coin;
        this.transferForm = transferForm;

        this.buildAccountOptionsByCoin(coin, transferForm);
    }

    // 处理账户change事件
    handleAccountChange(id: number) {
        let receiptAccounts = this.transferInfo.receipt_account || [],
            currentReceiptAccount =
                receiptAccounts.filter((receiptAccount: TransferReceiptAccountModel) => receiptAccount.id === id)[0] ||
                new TransferReceiptAccountModel();
        this.currentReceiptAccount = currentReceiptAccount;

        let transferForm = Utils.duplicate(this.transferForm);
        transferForm.toId = currentReceiptAccount.id;
        this.transferForm = transferForm;
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交转账信息
    async submit() {
        let transferForm = this.transferForm,
            result: ValidationResult = PointService.validateTransferInfo(transferForm, false);
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        this.$emit('close', false);
        this.$emit('submit', transferForm);
    }

    // 根据币种构建收款类型下拉列表
    buildAccountOptionsByCoin(coin: string, transferForm: TransferFormModel) {
        if (!coin) return;

        let receiptAccounts = this.transferInfo.receipt_account || [],
            filterAccounts = receiptAccounts.filter(
                (receiptAccount: TransferReceiptAccountModel) => receiptAccount.coin === coin
            );
        this.accountOptions = filterAccounts.map((receiptAccount: TransferReceiptAccountModel) => ({
            label: receiptAccount.account,
            value: receiptAccount.id
        }));

        let firstReceiptAccount = filterAccounts[0];
        if (firstReceiptAccount) {
            transferForm.toId = firstReceiptAccount.id;
            this.currentReceiptAccount = firstReceiptAccount;
        }
        this.transferForm = transferForm;
    }

    // 初始化数据
    async initData() {
        // 获取系统转账信息
        await this.fetchTransferInfo();
        let transferInfo = this.transferInfo;

        // 构建币种下拉列表
        let pointAccounts = transferInfo.system_addmoney_account || [];
        this.coinOptions = pointAccounts.map((pointAccount: TransferPointAccountModel) => ({
            label: pointAccount.coin,
            value: pointAccount.coin
        }));

        // 设置币种下拉列表默认值
        let transferForm = new TransferFormModel(),
            firstPointAccount = pointAccounts[0];
        transferForm.code = undefined;
        if (firstPointAccount) {
            let coin = firstPointAccount.coin;
            transferForm.fromId = firstPointAccount.id;
            transferForm.coin = coin;
            this.currentPointAccount = firstPointAccount;

            this.buildAccountOptionsByCoin(coin, transferForm);
        } else {
            this.transferForm = transferForm;
        }
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            this.initData();
        }
    }
}