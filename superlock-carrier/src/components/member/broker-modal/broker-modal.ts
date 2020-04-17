import Vue from 'vue';
import { State } from 'vuex-class';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import Utils from '@/ts/utils';
import { defaultAreaCode } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { ISelectOption } from '@/ts/interfaces';
import { BrokerFormModel } from '@/ts/models';
import { MemberService } from '@/ts/services';

@Component({
    name: 'BrokerModal',
    components: {}
})
export default class BrokerModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly title!: string; // 标题

    @State('areaCodeOptions') areaCodeOptions!: Array<ISelectOption>;

    isShow: boolean = this.value; // 是否显示模态框
    brokerForm: BrokerFormModel = new BrokerFormModel(); // 券商表单

    // 国家地区过滤选项
    areaCodeFilterOption(input: any, option: any) {
        let text = option.componentOptions.children[0].text.toLowerCase(),
            tinput = input.toLowerCase();
        return text.indexOf(tinput) > -1;
    }

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let brokerForm = Utils.duplicate(this.brokerForm);
        brokerForm[key] = value;
        this.brokerForm = brokerForm;
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交券商信息
    async submit() {
        let brokerForm = this.brokerForm,
            result: ValidationResult = MemberService.validateBrokerForm(brokerForm);
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        this.$emit('close', false);
        this.$emit('submit', brokerForm);
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            let brokerForm = new BrokerFormModel();
            brokerForm.areaCode = defaultAreaCode.id;
            this.brokerForm = brokerForm;
        }
    }
}
