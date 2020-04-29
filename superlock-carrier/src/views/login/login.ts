import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { ISelectOption } from '@/ts/interfaces';
import { LoginFormModel } from '@/ts/models';

import VerifyModal from '@/components/verify/verify-modal';

const loginModule = namespace('login');

@Component({
    name: 'Login',
    components: { VerifyModal }
})
export default class Login extends Vue {
    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;
    @State('areaCodeOptions') areaCodeOptions!: Array<ISelectOption>;

    @loginModule.State('loginForm') loginForm!: LoginFormModel;
    @loginModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loginModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @loginModule.Action('login') login!: (isCode: boolean) => any;

    // 国家地区过滤选项
    areaCodeFilterOption(input: any, option: any) {
        let text = option.componentOptions.children[0].text.toLowerCase(),
            tinput = input.toLowerCase();
        return text.indexOf(tinput) > -1;
    }

    // 处理表单change事件
    handleFormChange(key: string, event: any) {
        let loginForm = Utils.duplicate<LoginFormModel>(this.loginForm);
        loginForm[key] = event.target.value;
        this.setStates({ loginForm });
    }

    // 提交登录表单
    async submit(isCode: boolean) {
        try {
            let result = await this.login(isCode);
            if (!result) Prompt.error('登录失败');
            else this.$router.push({ path: '/home' });
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理二次验证submit事件
    async handleVerifyModalSubmit() {
        await this.submit(true);
    }

    // 邮箱获取焦点
    emailFocus() {
        let self = this;
        self.$nextTick(function() {
            let $email: any = self.$refs.email;
            if ($email) {
                $email.focus();
            }
        });
    }

    mounted() {
        Utils.jumpTop();
        this.emailFocus();
    }
}
