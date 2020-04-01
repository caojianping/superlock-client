import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { SecurityFormModel, UserInfoModel } from '@/ts/models';

import { Field, Button } from 'vant';
import Header from '@/components/common/header';
import SmsCode from '@/components/common/sms-code';

const userModule = namespace('user');
const securityModule = namespace('security');

@Component({
    name: 'FundPassword',
    components: { Field, Button, Header, SmsCode }
})
export default class FundPassword extends Vue {
    @userModule.State('userInfo') userInfo!: UserInfoModel;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: () => any;

    @securityModule.State('securityForm') securityForm!: SecurityFormModel;
    @securityModule.Mutation(TYPES.SET_STATES) setStates!: (
        payload: any
    ) => any;
    @securityModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @securityModule.Action('setFundPassword') setFundPassword!: () => any;
    @securityModule.Action('modifyFundPassword') modifyFundPassword!: () => any;

    yunDun: any = null; // 云盾实例

    from: string = '';
    isNewPasswordVisible: boolean = false;
    isConfirmPasswordVisible: boolean = false;

    // 处理Field控件input事件
    handleFieldInput(key: string, value: string) {
        let securityForm = Utils.duplicate(this.securityForm);
        securityForm[key] = value;
        this.setStates({ securityForm });
    }

    // 切换密码可见性
    togglePassword(key: string) {
        this[key] = !this[key];
    }

    // 处理短信验证码组件stop事件
    handleSmsCodeStop() {
        this.yunDun && this.yunDun.refresh();
    }

    // 提交资金密码
    async submit() {
        try {
            let status = this.userInfo.haveFundPasswd,
                msg = status ? '修改' : '设置',
                result = status
                    ? await this.modifyFundPassword()
                    : await this.setFundPassword();
            if (!result) Prompt.error(`资金密码${msg}失败`);
            else {
                Prompt.success(`资金密码${msg}成功`).then(() => {
                    if (!status) this.$router.push(this.from);
                    else this.$router.push('/security/center');
                });
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 初始化云盾
    initYunDun() {
        try {
            let self = this;
            if (window['initNECaptcha']) {
                window['initNECaptcha'](
                    {
                        element: '#captcha',
                        captchaId: '7c80c423944941819e409d0d6639c4dd',
                        mode: 'float'
                    },
                    function onload(instance) {
                        self.yunDun = instance;
                    },
                    function onerror(err) {
                        // console.log('onerror err:', err);
                    }
                );
            }
        } catch (error) {}
    }

    created() {
        this.clearStates();
        let from: any = this.$route.query.from;
        this.from = from;
    }

    mounted() {
        this.initYunDun();
        this.fetchUserInfo();
    }
}
