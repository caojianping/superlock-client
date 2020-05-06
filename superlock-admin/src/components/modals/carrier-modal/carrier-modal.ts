import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { OperationType, CarrierFormType, AreaCodes, IAreaCode, defaultAreaCode } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { ISelectOption } from '@/ts/interfaces';
import { CarrierFormModel, CarrierModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const carrierModule = namespace('carrier');

@Component({
    name: 'UserModal',
    components: { SecondVerify }
})
export default class UserModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly operationType!: OperationType; // 操作类型
    @Prop() readonly formType!: CarrierFormType; // 表单类型
    @Prop() readonly carrier?: CarrierModel; // 运营商参数

    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;
    @State('areaCodeOptions') areaCodeOptions!: Array<ISelectOption>;

    @carrierModule.State('cycleOptions') cycleOptions!: Array<ISelectOption>;
    @carrierModule.State('carrierForm') carrierForm!: CarrierFormModel;
    @carrierModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @carrierModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @carrierModule.Action('addCarrier') addCarrier!: (isCode?: boolean) => any;
    @carrierModule.Action('updateCarrier') updateCarrier!: (isCode?: boolean) => any;

    isShow: boolean = this.value; // 是否显示模态框
    title: string = ''; // 标题
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
        this.setStates({ carrierForm });
    }

    // 处理单选按钮change事件
    handleRadioChange(event: any) {
        let value = event.target.value || '';
        this.currentCycle = value;

        let parts = value.split('_'),
            carrierForm = Utils.duplicate(this.carrierForm);
        carrierForm.billingCycle = Number(parts[0]);
        carrierForm.unit = parts[1];
        this.setStates({ carrierForm });
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交运营商表单
    async submit(isCode?: boolean) {
        try {
            let operationType = this.operationType,
                result = operationType === OperationType.Add ? await this.addCarrier(isCode) : await this.updateCarrier(isCode);
            if (!result) Prompt.error('操作失败');
            else {
                Prompt.success('操作成功');
                this.$emit('close', false);
                this.$emit('submit');
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
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
            this.setStates({ carrierForm });
        }
    }
}
