import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { LoginFormModel } from '@/ts/models';

import GoogleAuth from '@/components/common/google-auth';
import SecondVerify from '@/components/common/second-verify';

const loginModule = namespace('login');

@Component({
    name: 'Login',
    components: { GoogleAuth, SecondVerify }
})
export default class Login extends Vue {
    @State('isGoogleAuthShow') isGoogleAuthShow!: boolean;
    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;

    @loginModule.State('loginForm') loginForm!: LoginFormModel;
    @loginModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loginModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @loginModule.Action('check') check!: (isCode?: boolean) => any;
    @loginModule.Action('login') login!: (isCode?: boolean) => any;

    // 处理表单change事件
    handleFormChange(key: string, event: any) {
        let loginForm = Utils.duplicate<LoginFormModel>(this.loginForm);
        loginForm[key] = event.target.value;
        this.setStates({ loginForm });
    }

    // 提交登录表单
    async submit(isCheck: boolean, isCode?: boolean) {
        try {
            if (isCheck) {
                let checkResult = await this.check(isCode);
                if (!checkResult) return Prompt.error('用户信息校验失败');
            }

            let loginResult = await this.login(isCode);
            if (!loginResult) Prompt.error('登录失败');
            else this.$router.push({ path: '/home' });
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理谷歌认证submit事件
    handleGoogleAuthSubmit() {
        this.$router.push({ path: '/home' });
    }

    // 用户名称获取焦点
    usernameFocus() {
        let self = this;
        self.$nextTick(function() {
            let $username: any = self.$refs.username;
            if ($username) {
                $username.focus();
            }
        });
    }

    mounted() {
        Utils.jumpTop();
        this.usernameFocus();
    }
}
