import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component, Model, Watch } from 'vue-property-decorator';
import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { UserFormModel } from '@/ts/models';

import { Popup, CellGroup, Field, Button } from 'vant';
import Header from '@/components/common/header';

const userModule = namespace('user');

@Component({
    name: 'ForgetForm',
    components: { Popup, CellGroup, Field, Button, Header }
})
export default class ForgetForm extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model

    @userModule.State('userForm') userForm!: UserFormModel;
    @userModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @userModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @userModule.Action('forgetPassword') forgetPassword!: () => any;

    isShow: boolean = this.value;
    isNewPasswordVisible: boolean = false;
    isConfirmPasswordVisible: boolean = false;

    // 处理弹出框close事件
    handlePopupClose() {
        this.$emit('close', false);
    }

    // 处理Field组件input事件
    handleFieldInput(key: string, value: any) {
        let userForm = Utils.duplicate(this.userForm);
        userForm[key] = value;
        this.setStates({ userForm });
    }

    // 切换密码
    togglePassword(key: string) {
        this[key] = !this[key];
    }

    // 提交表单
    async submit() {
        try {
            let result = await this.forgetPassword();
            if (!result) Prompt.error('密码找回失败');
            else {
                Prompt.success('密码找回成功').then(() => {
                    this.$emit('close', false);
                    this.$emit('submit');
                });
            }
        } catch (error) {
            Prompt.success(error.message || error);
        }
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            let userForm = Utils.duplicate(this.userForm);
            userForm.password = '';
            userForm.confirmPassword = '';
            this.setStates({ userForm });
        }
    }
}
