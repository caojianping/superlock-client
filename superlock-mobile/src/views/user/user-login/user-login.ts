import Vue from 'vue';
import { namespace, Action, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { CONSTANTS, UserFormType, ForgetType, VerifyType } from '@/ts/config';
import { Prompt, Captcha } from '@/ts/common';
import { UserFormModel, VerifyResult } from '@/ts/models';
import { UserService } from '@/ts/services';

import { Cell, Button } from 'vant';
import UserForm from '@/components/user/user-form';
import VerifyModal from '@/components/verify/verify-modal';

const userModule = namespace('user');

@Component({
    name: 'UserLogin',
    components: { Cell, Button, UserForm, VerifyModal }
})
export default class UserLogin extends Vue {
    @State('verifyResult') verifyResult?: VerifyResult | null;
    @Action('fetchVerifyMethod') fetchVerifyMethod!: (payload: { areaCode: string; mobile: string; type?: number }) => any;

    @userModule.State('userForm') userForm!: UserFormModel;
    @userModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @userModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @userModule.Action('login') login!: () => any;

    captcha: any = null; // 云盾短信验证码实例
    invitationCode: string = ''; // 邀请码
    isVerifyShow: boolean = false; // 是否显示验证模态框组件

    // 跳转至客服页面
    goCustomerService() {
        window.location.href = CONSTANTS.CUSTOMER_SERVICE;
    }

    // 处理UserForm组件change事件
    handleUserFormChange(userForm: UserFormModel) {
        this.setStates({ userForm });
    }

    // 处理验证模态框submit事件
    async handleVerifyModalSubmit(verifyType: VerifyType, code: string) {
        try {
            let userForm = Utils.duplicate(this.userForm);
            userForm.verifyMode = ['100', '010', '001'][verifyType - 1];
            userForm.code = code;
            this.setStates({ userForm });

            let result = await this.login();
            if (!result) Prompt.error('登录失败');
            else {
                Prompt.success('登录成功');
                this.$router.push('/home/index');
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理验证模态框stop事件
    handleVerifyModalStop() {
        this.captcha && this.captcha.refresh();
    }

    // 提交登录表单
    async submit() {
        try {
            let userForm = Utils.duplicate(this.userForm),
                result: ValidationResult = UserService.validateUserForm(userForm, UserFormType.Login);
            if (!result.status) return Prompt.error(Utils.getFirstValue(result.data));

            await this.fetchVerifyMethod({ areaCode: userForm.areaCode, mobile: userForm.mobile, type: 1 });
            let verifyResult = this.verifyResult;
            if (!verifyResult) return Prompt.error('验证方式获取失败');

            let isSpecial = verifyResult.needVerify === 1 && verifyResult.verifyMode === '100' && !verifyResult.email;
            if (verifyResult.needVerify === 0 || isSpecial) {
                userForm.verifyMode = '000';
                this.setStates({ userForm });

                let result = await this.login();
                if (!result) Prompt.error('登录失败');
                else {
                    Prompt.success('登录成功');
                    this.$router.push('/home/index');
                }
            } else {
                this.isVerifyShow = true;
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 跳转至忘记密码页面
    async goForget() {
        try {
            let userForm = Utils.duplicate(this.userForm),
                result: ValidationResult = UserService.validateUserForm(userForm, UserFormType.ForgetMobile);
            if (!result.status) return Prompt.error(Utils.getFirstValue(result.data));

            await this.fetchVerifyMethod({ areaCode: userForm.areaCode, mobile: userForm.mobile, type: 2 });
            let verifyResult = this.verifyResult;
            if (!verifyResult) return Prompt.error('验证方式获取失败');

            let isSpecial = verifyResult.needVerify === 1 && verifyResult.verifyMode === '100' && !verifyResult.email;
            if (verifyResult.needVerify === 0 || isSpecial) {
                Prompt.warning('请联系客服找回密码');
            } else {
                let invitationCode = this.invitationCode;
                this.$router.push({
                    path: `/user/forget/${ForgetType.LoginPassword}`,
                    query: {
                        from: `/user/login?code=${invitationCode}`,
                        areaCode: userForm.areaCode,
                        mobile: userForm.mobile
                    }
                });
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 初始化数据
    initData() {
        let code = Utils.resolveParameters('code');
        this.invitationCode = code;
    }

    // 初始化云盾短信验证码
    async initCaptcha() {
        try {
            let captcha = await Captcha.initCaptcha();
            this.captcha = captcha;
        } catch (error) {
            this.captcha = null;
        }
    }

    created() {
        this.clearStates();
        this.initData();
    }

    mounted() {
        this.initCaptcha();
    }
}
