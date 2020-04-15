import Vue from 'vue';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';
import Validator, { ValidationResult } from 'jpts-validator';

import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { UserModel, PasswordFormModel } from '@/ts/models';

@Component({
    name: 'PasswordModal',
    components: {}
})
export default class PasswordModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly title!: string; // 标题
    @Prop() readonly user?: UserModel; // 用户数据

    isShow: boolean = this.value; // 是否显示模态框
    passwordForm: PasswordFormModel = new PasswordFormModel(); // 密码表单

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let passwordForm = Utils.duplicate(this.passwordForm);
        passwordForm[key] = value;
        this.passwordForm = passwordForm;
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交登录密码
    async submit() {
        const key = 'password';
        let { name, newPwd, confirmPwd } = this.passwordForm,
            validator = new Validator();
        validator.addRule(key, { name: 'name', value: name }, { required: true }, { required: '用户名不可以为空' });
        validator.addRule(
            key,
            { name: 'newPwd', value: newPwd },
            { required: true, password: true },
            { required: '新密码不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'confirmPwd', value: confirmPwd },
            { equal: newPwd },
            { equal: '两次密码输入不一致' }
        );

        let result: ValidationResult = validator.execute(key);
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        this.$emit('close', false);
        this.$emit('submit', this.passwordForm);
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            let passwordForm = new PasswordFormModel();
            passwordForm.name = this.user ? this.user.name : '';
            passwordForm.oldPwd = undefined;
            passwordForm.code = undefined;
            this.passwordForm = passwordForm;
        }
    }
}
