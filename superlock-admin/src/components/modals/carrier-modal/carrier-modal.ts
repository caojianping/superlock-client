import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import Utils from '@/ts/utils';
import { OperationType, CarrierFormType, AreaCodes, IAreaCode, defaultAreaCode } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { ISelectOption } from '@/ts/interfaces';
import { CarrierFormModel, CarrierModel } from '@/ts/models';
import { CarrierService } from '@/ts/services';

const carrierModule = namespace('carrier');

@Component({
    name: 'UserModal',
    components: {}
})
export default class UserModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly operationType!: OperationType; // 操作类型
    @Prop() readonly formType!: CarrierFormType; // 表单类型
    @Prop() readonly carrier?: CarrierModel; // 运营商参数

    @State('areaCodeOptions') areaCodeOptions!: Array<ISelectOption>;
    @carrierModule.State('cycleOptions') cycleOptions!: Array<ISelectOption>;

    isShow: boolean = this.value; // 是否显示模态框
    title: string = ''; // 标题
    carrierForm: CarrierFormModel = new CarrierFormModel(); // 运营商表单
    currentCycle: string = '';

    // 国家地区过滤选项
    areaCodeFilterOption(input: any, option: any) {
        let text = option.componentOptions.children[0].text.toLowerCase(),
            tinput = input.toLowerCase();
        return text.indexOf(tinput) > -1;
    }

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let carrierForm = Utils.duplicate(this.carrierForm);
        carrierForm[key] = value;
        this.carrierForm = carrierForm;
    }

    // 处理单选按钮change事件
    handleRadioChange(event: any) {
        let value = event.target.value || '';
        this.currentCycle = value;

        let parts = value.split('_'),
            carrierForm = Utils.duplicate(this.carrierForm);
        carrierForm.billingCycle = Number(parts[0]);
        carrierForm.unit = parts[1];
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
            // 设置标题
            let { operationType, formType } = this,
                operationMsg = { 1: '添加', 2: '设置' },
                formMsg = { 1: '', 2: '密码', 3: '手机号', 4: '返奖', 5: '邮箱' };
            this.title = `${operationMsg[operationType]}运营商${formMsg[formType]}`;

            // 设置表单
            let carrierForm = new CarrierFormModel();
            if (operationType === OperationType.Add) {
                carrierForm.areaCode = defaultAreaCode.id;
                this.currentCycle = '';
            } else if (operationType === OperationType.Edit) {
                let carrier = this.carrier;
                if (carrier) {
                    carrierForm.carrierId = carrier.carrierId;
                    switch (formType) {
                        case CarrierFormType.CarrierPasswordForm:
                            carrierForm.loginPwd = '';
                            break;
                        case CarrierFormType.CarrierMobileForm:
                            let areaCode = carrier.areaCode,
                                filterAreaCode = AreaCodes.filter((item: IAreaCode) => item.code === areaCode)[0];
                            carrierForm.areaCode = filterAreaCode ? filterAreaCode.id : defaultAreaCode.id;
                            carrierForm.mobile = '';
                            carrierForm.loginPwd = '';
                            break;
                        case CarrierFormType.CarrierRebateForm:
                            carrierForm.rebateRatio = carrier.rebateRatio * 100;
                            carrierForm.billingCycle = carrier.billingCycle;
                            carrierForm.unit = carrier.unit;
                            this.currentCycle = `${carrier.billingCycle}_${carrier.unit}`;
                            break;
                        case CarrierFormType.CarrierEmailForm:
                            carrierForm.email = '';
                            carrierForm.loginPwd = '';
                            break;
                        default:
                            break;
                    }
                }
            }
            this.carrierForm = carrierForm;
        }
    }
}
