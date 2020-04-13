import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { ResponseCode } from '@/ts/config';
import { Utils, Prompt } from '@/ts/common';
import { LoginForm, SecondVerifyResult } from '@/ts/models';

import GoogleAuth from '@/components/common/google-auth';
import SecondVerify from '@/components/common/second-verify';

const loginModule = namespace('login');

@Component({
    name: 'Login',
    components: { GoogleAuth, SecondVerify }
})
export default class Login extends Vue {
    @loginModule.State('loginForm') loginForm!: LoginForm;
    @loginModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loginModule.Action('login') login!: (isCode: boolean) => any;

    isGoogleAuthShow: boolean = false; // 是否显示谷歌认证
    isSecondVerifyShow: boolean = false; // 是否显示二次验证

    // 处理表单change事件
    handleFormChange(key: string, event: any) {
        let loginForm = Utils.duplicate<LoginForm>(this.loginForm);
        loginForm[key] = event.target.value;
        this.setStates({ loginForm });
    }

    // 提交登录信息
    async submit(isCode: boolean) {
        try {
            await this.login(isCode);
            this.$router.push({ path: '/home' });
        } catch (error) {
            let code = error.code;
            if (code === ResponseCode.GoogleAuth) {
                this.isGoogleAuthShow = true;
            } else if (code === ResponseCode.SecondVerify) {
                let data = error.data as SecondVerifyResult;
                if (data.verifyMethod === '001') {
                    this.isSecondVerifyShow = true;
                }
            } else {
                Prompt.error(error.message || error);
            }
        }
    }

    // 处理谷歌认证submit事件
    handleGoogleAuthSubmit(code: string) {
        let loginForm = this.loginForm;
        loginForm.code = code;
        this.setStates({ loginForm });
        this.$router.push({ path: '/home' });
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit(code: string) {
        let loginForm = this.loginForm;
        loginForm.code = code;
        this.setStates({ loginForm });
        await this.submit(true);
    }

    // 用户名获取焦点
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
