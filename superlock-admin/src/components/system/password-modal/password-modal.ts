import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { UserModel, PasswordFormModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const systemModule = namespace('system');

@Component({
    name: 'PasswordModal',
    components: { SecondVerify }
})
export default class PasswordModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly user?: UserModel;

    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;

    @systemModule.State('passwordForm') passwordForm!: PasswordFormModel;
    @systemModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @systemModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @systemModule.Action('resetPassword') resetPassword!: (isCode?: boolean) => any;

    isShow: boolean = this.value; // 是否显示模态框

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let passwordForm = Utils.duplicate(this.passwordForm);
        passwordForm[key] = value;
        this.setStates({ passwordForm });
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交密码表单
    async submit(isCode?: boolean) {
        try {
            let result = await this.resetPassword(isCode);
            if (!result) Prompt.error('密码修改失败');
            else {
                Prompt.success('密码修改成功');
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
            let passwordForm = new PasswordFormModel();
            passwordForm.name = this.user ? this.user.name : '';
            passwordForm.oldPwd = undefined;
            this.setStates({ passwordForm });
        }
    }
}
