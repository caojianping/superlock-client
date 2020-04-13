import Vue from 'vue';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';
import { Utils, Prompt } from '@/ts/common';
import { QuotaForm, BrokerModel } from '@/ts/models';
import { MemberService } from '@/ts/services';

@Component({
    name: 'QuotaModal',
    components: {}
})
export default class QuotaModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly title!: string; // 标题
    @Prop() readonly broker!: BrokerModel; // 券商数据

    isShow: boolean = this.value; // 是否显示模态框
    quotaForm: QuotaForm = new QuotaForm(); // 额度表单

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let quotaForm = Utils.duplicate(this.quotaForm);
        quotaForm[key] = value;
        this.quotaForm = quotaForm;
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交额度
    async submit() {
        let quotaForm = this.quotaForm,
            result: ValidationResult = MemberService.validateQuotaForm(
                quotaForm,
                false
            );
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        this.$emit('close', false);
        this.$emit('submit', quotaForm);
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            let quotaForm = new QuotaForm();
            quotaForm.uid = this.broker.uid;
            quotaForm.code = undefined;
            this.quotaForm = quotaForm;
        }
    }
}
