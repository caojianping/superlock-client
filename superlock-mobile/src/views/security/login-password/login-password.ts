import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ValidationResult } from 'jpts-validator';

import Locales from '@/locales';
import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { UserFormType, ForgetType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { UserInfoModel, UserFormModel, SecurityFormModel } from '@/ts/models';
import { UserService } from '@/ts/services';

import { Toast, PullRefresh, Field, Button } from 'vant';
import Header from '@/components/common/header';

const i18n = Locales.buildLocale();
const userModule = namespace('user');
const securityModule = namespace('security');

@Component({
    name: 'LoginPassword',
    components: { PullRefresh, Field, Button, Header }
})
export default class LoginPassword extends Vue {
    @userModule.State('userInfo') userInfo?: UserInfoModel | null;
    @userModule.State('userForm') userForm!: UserFormModel;
    @userModule.Mutation(TYPES.SET_STATES) setUserStates!: (payload: any) => any;
    @userModule.Mutation(TYPES.CLEAR_STATES) clearUserStates!: () => any;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: (isLoading?: boolean) => any;

    @securityModule.State('securityForm') securityForm!: SecurityFormModel;
    @securityModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @securityModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @securityModule.Action('modifyLoginPassword') modifyLoginPassword!: () => any;

    isPulling: boolean = false; // 是否下拉刷新
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
        let userInfo: any = this.userInfo || {},
            phone: any = userInfo.phone || {},
            userForm = Utils.duplicate(this.userForm);
        userForm.areaCode = phone.area || '';
        userForm.mobile = phone.tel || '';
        this.setUserStates({ userForm });

        let result: ValidationResult = UserService.validateUserForm(userForm, UserFormType.ForgetMobile);
        if (!result.status) return Prompt.error(Utils.getFirstValue(result.data));

        this.$router.push({
            path: `/user/forget/${ForgetType.LoginPassword}`,
            query: {
                from: '/security/login/password',
                areaCode: userForm.areaCode,
                mobile: userForm.mobile
            }
        });
    }

    // 提交资金密码
    async submit() {
        try {
            let result = await this.modifyLoginPassword();
            if (!result) Prompt.error(i18n.tc('SECURITY.LOGIN_PASSWORD_MODIFY_FAILURE'));
            else {
                Prompt.success(i18n.tc('SECURITY.LOGIN_PASSWORD_MODIFY_SUCCESS')).then(() => {
                    this.$router.push('/security/center');
                });
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        (!this.userInfo || isRefresh) && this.fetchUserInfo(true);
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData(true);
        this.isPulling = false;
        Toast(i18n.tc('COMMON.REFRESH_SUCCESS'));
    }

    // 初始化数据
    initData() {
        this.setStates({ securityForm: new SecurityFormModel() });
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchData(false);
    }
}
