import Vue from 'vue';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { InitInfoFormModel } from '@/ts/models';
import { HomeService } from '@/ts/services';

@Component({
    name: 'InitModal',
    components: {}
})
export default class InitModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly title!: string; // 标题
    @Prop() readonly initInfo!: InitInfoFormModel; // 初始信息数据

    isShow: boolean = this.value; // 是否显示模态框
    initInfoForm: InitInfoFormModel = new InitInfoFormModel(); // 初始信息表单

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let initInfoForm = Utils.duplicate(this.initInfoForm);
        initInfoForm[key] = value;
        this.initInfoForm = initInfoForm;
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交初始信息
    async submit() {
        let initInfoForm = this.initInfoForm,
            result: ValidationResult = HomeService.validateInitInfoForm(initInfoForm, false);
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        this.$emit('close', false);
        this.$emit('submit', initInfoForm);
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            let initInfo = this.initInfo,
                initInfoForm = new InitInfoFormModel();
            initInfoForm.initialTotalLock = initInfo.initialTotalLock;
            initInfoForm.initialRegisteredUser = initInfo.initialRegisteredUser;
            initInfoForm.code = undefined;
            this.initInfoForm = initInfoForm;
        }
    }
}
