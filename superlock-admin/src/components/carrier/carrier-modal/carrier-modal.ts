import Vue from 'vue';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import Utils from '@/ts/utils';
import { OperationType, CarrierFormType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { CarrierFormModel, CarrierModel } from '@/ts/models';
import { CarrierService } from '@/ts/services';

@Component({
    name: 'UserModal',
    components: {}
})
export default class UserModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly operationType!: OperationType; // 操作类型
    @Prop() readonly formType!: CarrierFormType; // 表单类型
    @Prop() readonly carrier?: CarrierModel; // 运营商参数

    isShow: boolean = this.value; // 是否显示模态框
    title: string = ''; // 标题
    carrierForm: CarrierFormModel = new CarrierFormModel(); // 运营商表单

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let carrierForm = Utils.duplicate(this.carrierForm);
        carrierForm[key] = value;
        this.carrierForm = carrierForm;
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交运营商信息
    async submit() {
        let { formType, carrierForm } = this,
            result: ValidationResult = CarrierService.validateCarrierForm(carrierForm, formType);
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        this.$emit('close', false);
        this.$emit('submit', this.carrierForm);
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            let carrierForm = new CarrierFormModel(),
                operationType = this.operationType;
            this.title = ['添加运营商', '更新运营商'][operationType - 1];
            if (operationType === OperationType.Add) {
                this.carrierForm = carrierForm;
            } else if (operationType === OperationType.Edit) {
                let carrier = this.carrier;
                if (carrier) {
                }
            }
        }
    }
}
