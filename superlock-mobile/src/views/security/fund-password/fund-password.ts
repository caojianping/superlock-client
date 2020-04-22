import Vue from 'vue';
import { namespace, Action, State, Mutation } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { UserFormType, CONSTANTS, ForgetType, VerifyType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { VerifyResult, UserInfoModel, UserFormModel, SecurityFormModel } from '@/ts/models';
import { UserService, SecurityService } from '@/ts/services';

import { Field, Button } from 'vant';
import Header from '@/components/common/header';
import VerifyList from '@/components/verify/verify-list';

const userModule = namespace('user');
const securityModule = namespace('security');

@Component({
    name: 'FundPassword',
    components: { Field, Button, Header, VerifyList }
})
export default class FundPassword extends Vue {
    @State('verifyResult') verifyResult?: VerifyResult | null;
    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;
    @Mutation(TYPES.CLEAR_STATES) clearRootStates!: () => any;
    @Action('fetchVerifyMethod') fetchVerifyMethod!: (payload: { areaCode: string; mobile: string }) => any;

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
    isVerifyShow: boolean = false; // 是否显示验证列表组件

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

    // 提交资金密码表单
    async submit() {
        try {
            let status = this.userInfo.haveFundPasswd;
            if (!status) {
                let securityForm = this.securityForm,
                    result = SecurityService.validateSecurityForm(securityForm, true);
                if (!result.status) return Prompt.error(Utils.getFirstValue(result.data));

                let phone: any = this.userInfo.phone || {};
                await this.fetchVerifyMethod({ areaCode: phone.area || '', mobile: phone.tel || '' });
                let verifyResult = this.verifyResult;
                if (!verifyResult) return Prompt.error('验证方式获取失败');

                if (verifyResult.needVerify === 1) {
                    this.isVerifyShow = true;
                } else {
                    let result = await this.setFundPassword();
                    if (!result) Prompt.error(`资金密码设置失败`);
                    else
                        Prompt.success(`资金密码设置成功`).then(() => {
                            if (!status) this.$router.push(this.from);
                            else this.$router.push('/security/center');
                        });
                }
            } else {
                let result = await this.modifyFundPassword();
                if (!result) Prompt.error(`资金密码修改失败`);
                else
                    Prompt.success(`资金密码修改成功`).then(() => {
                        if (!status) this.$router.push(this.from);
                        else this.$router.push('/security/center');
                    });
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理验证列表组件submit事件
    async handleVerifyListSubmit(verifyType: VerifyType, code: string) {
        try {
            let securityForm = Utils.duplicate(this.securityForm);
            securityForm.verifyMode = ['100', '010', '001'][verifyType - 1];
            securityForm.code = code;
            this.setStates({ securityForm });

            let result = await this.setFundPassword();
            if (!result) Prompt.error(`资金密码设置失败`);
            else
                Prompt.success(`资金密码设置成功`).then(() => {
                    if (!status) this.$router.push(this.from);
                    else this.$router.push('/security/center');
                });
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理验证列表组件stop事件
    handleVerifyListStop() {
        this.yunDun && this.yunDun.refresh();
    }

    // 处理验证列表组件close事件
    handleVerifyListClose() {}

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
            path: `/user/forget/${ForgetType.FundPassword}`,
            query: {
                from: '/security/fund/password',
                areaCode: userForm.areaCode,
                mobile: userForm.mobile
            }
        });
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
