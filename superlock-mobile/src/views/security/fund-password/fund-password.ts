import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';
import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { UserFormType, CONSTANTS } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { UserInfoModel, UserFormModel, SecurityFormModel } from '@/ts/models';
import { UserService } from '@/ts/services';

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
    @userModule.State('userForm') userForm!: UserFormModel;
    @userModule.Mutation(TYPES.SET_STATES) setUserStates!: (payload: any) => any;
    @userModule.Mutation(TYPES.CLEAR_STATES) clearUserStates!: () => any;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: (isLoading?: boolean) => any;

    @securityModule.State('securityForm') securityForm!: SecurityFormModel;
    @securityModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @securityModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @securityModule.Action('setFundPassword') setFundPassword!: () => any;
    @securityModule.Action('modifyFundPassword') modifyFundPassword!: () => any;

    yunDun: any = null; // 云盾实例
    from: string = ''; // 来源
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
                from: '/security/fund/password',
                areaCode: userForm.areaCode,
                mobile: userForm.mobile
            }
        });
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
                result = status ? await this.modifyFundPassword() : await this.setFundPassword();
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

    // 初始化数据
    initData() {
        let query: any = this.$route.query || {};
        this.from = query.from || '';
    }

    // 初始化云盾
    initYunDun() {
        try {
            let self = this;
            if (window['initNECaptcha']) {
                window['initNECaptcha'](
                    CONSTANTS.CAPTCHA_OPTIONS,
                    function onload(instance) {
                        self.yunDun = instance;
                    },
                    function onerror() {}
                );
            }
        } catch (error) {}
    }

    created() {
        this.clearUserStates();
        this.clearStates();
        this.initData();
    }

    mounted() {
        this.initYunDun();
        this.fetchUserInfo(true);
    }
}
