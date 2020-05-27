import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import Locales from '@/locales';
import Utils from '@/ts/utils';
import { OperationType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { WithdrawAddressModel } from '@/ts/models';
import { WithdrawService } from '@/ts/services';

import { Popup, Field, Button } from 'vant';
import Header from '@/components/common/header';

const i18n = Locales.buildLocale();
const withdrawModule = namespace('withdraw');

@Component({
    name: 'WithdrawModal',
    components: { Popup, Field, Button, Header }
})
export default class WithdrawModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() type!: OperationType; // 组件参数：组件操作类型
    @Prop() data?: WithdrawAddressModel; // 组件参数：提现地址

    @withdrawModule.Action('addWithdrawAddress') addWithdrawAddress!: (withdrawAddress: WithdrawAddressModel) => any;

    isShow: boolean = this.value; // 是否显示弹出框
    withdrawAddress: WithdrawAddressModel = new WithdrawAddressModel(); // 提现地址

    // 处理弹出框close事件
    handlePopupClose() {
        this.isShow = false;
        this.$emit('close', false);
    }

    // 处理Field组件input事件
    handleFieldInput(key: string, value: string) {
        let withdrawAddress = Utils.duplicate(this.withdrawAddress);
        withdrawAddress[key] = value;
        this.withdrawAddress = withdrawAddress;
    }

    // 提交提现地址
    async submit() {
        let withdrawAddress = this.withdrawAddress,
            result: ValidationResult = WithdrawService.validateWithdrawAddress(withdrawAddress);
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        if (this.type === OperationType.Add) {
            try {
                let result = await this.addWithdrawAddress(withdrawAddress);
                if (!result) return Prompt.error(i18n.tc('WITHDRAW.WITHDRAW_ADDRESS_ADD_FAILURE'));

                Prompt.success(i18n.tc('WITHDRAW.WITHDRAW_ADDRESS_ADD_SUCCESS'));
                this.$emit('close', false);
                this.$emit('submit');
            } catch (error) {
                Prompt.error(error.message || error);
            }
        } else {
            // todo: 编辑提现地址功能待开发
        }
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            this.withdrawAddress = new WithdrawAddressModel();
        }
    }
}
