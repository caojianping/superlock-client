import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { RegisterStatus, CONSTANTS } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { UserFormModel } from '@/ts/models';

import { Cell, Button } from 'vant';
import UserForm from '@/components/user/user-form';
import WechatPrompt from '@/components/user/wechat-prompt';

const userModule = namespace('user');

@Component({
    name: 'UserRegister',
    components: { Cell, Button, UserForm, WechatPrompt }
})
export default class UserRegister extends Vue {
    @userModule.State('userForm') userForm!: UserFormModel;
    @userModule.State('registerStatus') registerStatus!: RegisterStatus;
    @userModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @userModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @userModule.Action('register') registerAction!: () => any;

    yunDun: any = null; // 云盾实例
    code: string = ''; // 邀请码

    // 处理UserForm组件change事件
    handleUserFormChange(userForm: UserFormModel) {
        userForm.invitationCode = this.userForm.invitationCode;
        this.setStates({ userForm });
    }

    // 处理UserForm组件stop事件
    handleUserFormStop() {
        this.yunDun && this.yunDun.refresh();
    }

    // 注册
    async register() {
        try {
            let result = await this.registerAction();
            if (!result) Prompt.error('注册失败');
            else {
                this.setStates({ registerStatus: RegisterStatus.Success });
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
            userForm = UserFormModel.createInstance(code);
        this.code = code;
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
