import Vue from 'vue';
import { namespace, Mutation } from 'vuex-class';
import { Component, Prop, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { Prompt, Token } from '@/ts/common';
import { LoginFormModel } from '@/ts/models';

const googleModule = namespace('google');

@Component({ name: 'GoogleAuth' })
export default class GoogleAuth extends Vue {
    @Prop() readonly isShow!: boolean;
    @Prop() readonly loginForm!: LoginFormModel;

    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;
    @Mutation(TYPES.CLEAR_STATES) clearRootStates!: () => any;

    @googleModule.State('googlePlayUrl') googlePlayUrl!: string; // 谷歌支付地址
    @googleModule.State('appStoreUrl') appStoreUrl!: string; // app-store地址

    @googleModule.State('qrcode') qrcode!: string; // 二维码
    @googleModule.State('gakey') gakey!: string; // ga密钥
    @googleModule.State('gacode') gacode!: string; // ga验证码

    @googleModule.State('isLoading') isLoading!: boolean; // 是否加载中
    @googleModule.Getter('isDisabled') isDisabled!: boolean; // 是否已禁用

    @googleModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @googleModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @googleModule.Action('fetchGoogleKey') fetchGoogleKey!: (loginForm: LoginFormModel) => any;
    @googleModule.Action('bindGoogle') bindGoogle!: (loginForm: LoginFormModel) => any;

    isModalShow: boolean = false; // 是否显示模态框

    // 刷新谷歌密钥
    async refreshGoogleKey() {
        let loginForm = this.loginForm;
        if (loginForm) {
            await this.fetchGoogleKey(loginForm);
        }
    }

    // 处理表单change事件
    handleFormChange(key: string, event: any) {
        this.setStates({ [key]: event.target.value });
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.setRootStates({ isSecondVerifyShow: false });
    }

    // 提交谷歌认证
    async submit() {
        try {
            let { gacode, loginForm } = this;
            if (!gacode) {
                Prompt.error('谷歌验证码不可以为空');
                return;
            }

            if (!loginForm) {
                Prompt.error('登录表单不可以为空');
                return;
            }

            this.setStates({ isLoading: true });
            Token.setCode(gacode);
            let result = await this.bindGoogle(loginForm);
            this.setStates({ isLoading: false });
            if (!result) Prompt.error('谷歌认证绑定失败');
            else {
                this.setRootStates({ isSecondVerifyShow: false });
                this.$emit('submit');
            }
        } catch (error) {
            this.setStates({ isLoading: false });
            Prompt.error(error.message || error);
        }
    }

    // 谷歌验证码获取焦点
    codeFocus() {
        let self = this;
        self.$nextTick(function() {
            let $code: any = self.$refs.code;
            if ($code) {
                $code.focus();
            }
        });
    }

    @Watch('isShow')
    watchIsShow(isShow: boolean) {
        this.isModalShow = isShow;
        let loginForm = this.loginForm;
        if (isShow && loginForm) {
            this.clearStates();
            this.codeFocus();
            this.fetchGoogleKey(loginForm);
        }
    }
}
