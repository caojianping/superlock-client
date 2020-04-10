import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';
import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { UserFormType, CONSTANTS } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { UserFormModel } from '@/ts/models';
import { UserService } from '@/ts/services';

import { Cell, Button } from 'vant';
import UserForm from '@/components/user/user-form';

const userModule = namespace('user');

@Component({
    name: 'UserLogin',
    components: { Cell, Button, UserForm }
})
export default class UserLogin extends Vue {
    @userModule.State('userForm') userForm!: UserFormModel;
    @userModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @userModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @userModule.Action('login') loginAction!: () => any;

    yunDun: any = null; // 云盾实例
    code: string = ''; // 邀请码

    // 处理UserForm组件change事件
    handleUserFormChange(userForm: UserFormModel) {
        this.setStates({ userForm });
    }

    // 处理UserForm组件stop事件
    handleUserFormStop() {
        this.yunDun && this.yunDun.refresh();
    }

    // 登录
    async login() {
        try {
            let result = await this.loginAction();
            if (!result) Prompt.error('登录失败');
            else {
                Prompt.success('登录成功');
                this.$router.push('/home/index');
            }
        } catch (error) {
            Prompt.success(error.message || error);
        }
    }

    // 跳转至忘记密码页面
    goForget() {
        let { userForm, code } = this,
            result: ValidationResult = UserService.validateUserForm(userForm, UserFormType.ForgetMobile);
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        this.$router.push({
            path: '/user/forget',
            query: {
                from: `/user/login?code=${code}`,
                areaCode: userForm.areaCode,
                mobile: userForm.mobile
            }
        });
    }

    // 初始化数据
    initData() {
        let code = Utils.resolveParameters('code');
        this.code = code;
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
