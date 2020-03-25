import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { RegisterStatus } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { UserForm } from '@/ts/models';

import { Cell, Button } from 'vant';
import UserFields from '@/components/user/user-fields';
import WechatPrompt from '@/components/user/wechat-prompt';

const userModule = namespace('user');

@Component({
    name: 'UserRegister',
    components: { Cell, Button, UserFields, WechatPrompt }
})
export default class UserRegister extends Vue {
    @userModule.State('userForm') userForm!: UserForm;
    @userModule.State('registerStatus') registerStatus!: RegisterStatus;
    @userModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @userModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @userModule.Action('register') registerAction!: () => any;

    yunDun: any = null; // 云盾实例

    // 处理UserFields组件change事件
    handleUserFieldsChange(userForm: UserForm) {
        console.log(1, userForm);
        userForm.invitationCode = this.userForm.invitationCode;
        this.setStates({ userForm });
    }

    // 处理UserFields组件stop事件
    handleUserFieldsStop() {
        this.yunDun && this.yunDun.refresh();
    }

    // 注册
    async register() {
        console.log(2, this.userForm);
        try {
            let result = await this.registerAction();
            if (!result) Prompt.error('注册失败');
            else {
                this.registerStatus = RegisterStatus.Success;
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 下载
    download() {
        const origin = window.location.origin + '/app';
        if (!Utils.isIOS()) {
            window.location.href = `${origin}/android/WealthShop.apk`;
        } else {
            window.location.href = `itms-services://?action=download-manifest&url=${origin}/ios/manifest.plist`;
        }
    }

    // 初始化数据
    initData() {
        let code = Utils.resolveParameters('code'),
            userForm = UserForm.createInstance(code);
        console.log();
        this.setStates({ userForm });
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
        this.initData();
    }

    mounted() {
        this.initYunDun();
    }
}
