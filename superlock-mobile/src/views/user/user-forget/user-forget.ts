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

import { CellGroup, Cell, Field, Button } from 'vant';
import Header from '@/components/common/header';
import SmsCode from '@/components/common/sms-code';
import ForgetForm from '@/components/user/forget-form';

const userModule = namespace('user');

@Component({
    name: 'UserForget',
    components: { CellGroup, Cell, Field, Button, Header, SmsCode, ForgetForm },
})
export default class UserForget extends Vue {
    @userModule.State('userForm') userForm!: UserFormModel;
    @userModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @userModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    yunDun: any = null; // 云盾实例
    from: string = '';
    isShow: boolean = false;

    // 处理Field组件input事件
    handleFieldInput(key: string, value: any) {
        let userForm = Utils.duplicate(this.userForm);
        userForm[key] = value;
        this.setStates({ userForm });
    }

    // 处理SmsCode组件stop事件
    handleSmsCodeStop() {
        this.yunDun && this.yunDun.refresh();
    }

    // 处理ForgetForm组件submit事件
    handleForgetFormSubmit() {
        this.$router.push(this.from);
    }

    // 下一步
    async nextStep() {
        let userForm = this.userForm,
            result: ValidationResult = UserService.validateUserForm(
                userForm,
                UserFormType.ForgetSmsCode
            );
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        this.isShow = true;
    }

    // 初始化数据
    initData() {
        let query: any = this.$route.query || {};
        this.from = query.from || '';

        let userForm = Utils.duplicate(this.userForm);
        userForm.areaCode = query.areaCode || '';
        userForm.mobile = query.mobile || '';
        this.setStates({ userForm });
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
        this.initData();
    }

    mounted() {
        this.initYunDun();
    }
}
