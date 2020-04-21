import Vue from 'vue';
import { namespace, Action, State, Mutation } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { UserFormType, CONSTANTS, ForgetType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { UserFormModel, VerifyResult } from '@/ts/models';
import { UserService } from '@/ts/services';

import { Cell, Button } from 'vant';
import VerifyList from '@/components/verify/verify-list';
import UserForm from '@/components/user/user-form';

const userModule = namespace('user');

@Component({
    name: 'UserLogin',
    components: { Cell, Button, UserForm, VerifyList }
})
export default class UserLogin extends Vue {
    @State('verifyResult') verifyResult?: VerifyResult | null;
    @Action('fetchVerifyMethod') fetchVerifyMethod!: (payload: { areaCode: string; mobile: string }) => any;

    @userModule.State('userForm') userForm!: UserFormModel;
    @userModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @userModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @userModule.Action('login') login!: () => any;

    yunDun: any = null; // 云盾实例
    invitationCode: string = ''; // 邀请码
    isVerifyShow: boolean = false; // 是否显示验证列表组件

    // 跳转至客服页面
    goCustomerService() {
        window.location.href = CONSTANTS.CUSTOMER_SERVICE;
    }

    // 处理UserForm组件change事件
    handleUserFormChange(userForm: UserFormModel) {
        this.setStates({ userForm });
    }

    // 提交登录表单
    async submit() {
        try {
            let userForm = Utils.duplicate(this.userForm),
                result: ValidationResult = UserService.validateUserForm(userForm, UserFormType.Login);
            if (!result.status) return Prompt.error(Utils.getFirstValue(result.data));

            await this.fetchVerifyMethod({ areaCode: userForm.areaCode, mobile: userForm.mobile });

            let verifyResult = this.verifyResult;
            if (!verifyResult) return Prompt.error('验证方式获取失败');

            if (verifyResult.needVerify === 1) {
                // 需要验证
                this.isVerifyShow = true;
                userForm.verifyMode = verifyResult.verifyMode;
                this.setStates({ userForm });
            } else {
                let result = await this.login();
                if (!result) Prompt.error('登录失败');
                else {
                    Prompt.success('登录成功');
                    this.$router.push('/home/index');
                }
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理验证列表组件submit事件
    async handleVerifyListSubmit(code: string) {
        let userForm = Utils.duplicate(this.userForm);
        userForm.code = code;
        this.setStates({ userForm });

        let result = await this.login();
        if (!result) Prompt.error('登录失败');
        else {
            Prompt.success('登录成功');
            this.$router.push('/home/index');
        }
    }

    // 处理验证列表组件stop事件
    handleVerifyListStop() {
        this.yunDun && this.yunDun.refresh();
    }

    // 跳转至忘记密码页面
    goForget() {
        let { userForm, invitationCode } = this,
            result: ValidationResult = UserService.validateUserForm(userForm, UserFormType.ForgetMobile);
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        this.$router.push({
            path: `/user/forget/${ForgetType.LoginPassword}`,
            query: {
                from: `/user/login?code=${invitationCode}`,
                areaCode: userForm.areaCode,
                mobile: userForm.mobile
            }
        });
    }

    // 初始化数据
    initData() {
        let code = Utils.resolveParameters('code');
        this.invitationCode = code;
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
        this.clearStates();
        this.initData();
    }

    mounted() {
        this.initYunDun();
    }
}
