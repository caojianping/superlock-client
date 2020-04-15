import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { Prompt } from '@/ts/common';
import { LoginFormModel } from '@/ts/models';

const googleModule = namespace('google');

@Component({ name: 'GoogleAuth' })
export default class GoogleAuth extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly loginForm!: LoginFormModel; // 登录表单，组件模式下，关键参数不建议使用vuex中数据，建议以参数形式传递
    @Prop() readonly title!: string; // 标题

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

    isShow: boolean = this.value; // 是否显示模态框

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
        this.$emit('close', false);
    }

    // 提交谷歌认证
    async submit() {
        let loginForm = this.loginForm;
        if (loginForm) {
            try {
                let result = await this.bindGoogle(loginForm);
                if (!result) Prompt.error('谷歌认证绑定失败');
                else {
                    this.$emit('close', false);
                    this.$emit('submit', this.gacode);
                }
            } catch (error) {
                Prompt.error(error.message || error);
            }
        }
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        let loginForm = this.loginForm;
        if (value && loginForm) {
            this.clearStates();
            this.fetchGoogleKey(loginForm);
        }
    }
}
