import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ValidationResult } from 'jpts-validator';
import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { UserFormType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { UserInfoModel, UserFormModel, SecurityFormModel } from '@/ts/models';
import { UserService } from '@/ts/services';

import { Field, Button } from 'vant';
import Header from '@/components/common/header';

const userModule = namespace('user');
const securityModule = namespace('security');

@Component({
    name: 'LoginPassword',
    components: { Field, Button, Header }
})
export default class LoginPassword extends Vue {
    @userModule.State('userInfo') userInfo!: UserInfoModel;
    @userModule.State('userForm') userForm!: UserFormModel;
    @userModule.Mutation(TYPES.SET_STATES) setUserStates!: (payload: any) => any;
    @userModule.Mutation(TYPES.CLEAR_STATES) clearUserStates!: () => any;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: () => any;

    @securityModule.State('securityForm') securityForm!: SecurityFormModel;
    @securityModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @securityModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @securityModule.Action('modifyLoginPassword') modifyLoginPassword!: () => any;

    isNewPasswordVisible: boolean = false;
    isConfirmPasswordVisible: boolean = false;

    // 处理Field组件input事件
    handleFieldInput(key: string, value: string) {
        let securityForm = Utils.duplicate(this.securityForm);
        securityForm[key] = value;
        this.setStates({ securityForm });
    }

    // 切换密码
    togglePassword(key: string) {
        this[key] = !this[key];
    }

    // 跳转至忘记密码页面
    goForget() {
        let phone: any = this.userInfo.phone || {},
            userForm = Utils.duplicate(this.userForm);
        userForm.areaCode = phone.area || '';
        userForm.mobile = phone.tel || '';
        this.setUserStates({ userForm });

        let result: ValidationResult = UserService.validateUserForm(userForm, UserFormType.ForgetMobile);
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        this.$router.push({
            path: '/user/forget',
            query: {
                from: '/security/login/password',
                areaCode: userForm.areaCode,
                mobile: userForm.mobile
            }
        });
    }

    // 提交资金密码
    async submit() {
        try {
            let result = await this.modifyLoginPassword();
            if (!result) Prompt.error('登录密码修改失败');
            else {
                Prompt.success('登录密码修改成功');
                this.$router.push('/security/center');
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    created() {
        this.clearUserStates();
        this.clearStates();
    }

    mounted() {
        this.fetchUserInfo();
    }
}
