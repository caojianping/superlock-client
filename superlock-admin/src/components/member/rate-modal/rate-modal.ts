import Vue from 'vue';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { ISelectOption } from '@/ts/interfaces';
import { RateFormModel } from '@/ts/models';
import { MemberService } from '@/ts/services';

@Component({
    name: 'RateModal',
    components: {}
})
export default class RateModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly title!: string; // 标题
    @Prop() readonly projectOptions!: Array<ISelectOption>; // 项目选项列表

    isShow: boolean = this.value; // 是否显示模态框
    rateForm: RateFormModel = new RateFormModel(); // 利率表单

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let rateForm = Utils.duplicate(this.rateForm);
        rateForm[key] = value;
        this.rateForm = rateForm;
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交利率信息
    async submit() {
        let rateForm = this.rateForm,
            result: ValidationResult = MemberService.validateRateForm(rateForm, false);
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        this.$emit('close', false);
        this.$emit('submit', rateForm);
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            let rateForm = new RateFormModel();
            rateForm.code = undefined;
            this.rateForm = rateForm;
        }
    }
}
