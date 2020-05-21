import Vue from 'vue';
import { namespace, Action, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { RegisterStatus } from '@/ts/config';
import { Prompt, Captcha } from '@/ts/common';
import { UserFormModel } from '@/ts/models';

import { Cell, Button } from 'vant';
import VerifyList from '@/components/verify/verify-list';
import UserForm from '@/components/user/user-form';
import WechatPrompt from '@/components/user/wechat-prompt';

const userModule = namespace('user');

@Component({
    name: 'UserRegister',
    components: { Cell, Button, VerifyList, UserForm, WechatPrompt }
})
export default class UserRegister extends Vue {
    // @State('verifyResult') verifyResult?: VerifyResult | null;
    // @Action('fetchVerifyMethod') fetchVerifyMethod!: (payload: { areaCode: string; mobile: string; type?: number; isLoading?: boolean }) => any;

    @userModule.State('userForm') userForm!: UserFormModel;
    @userModule.State('registerStatus') registerStatus!: RegisterStatus;
    @userModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @userModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @userModule.Action('register') register!: () => any;

    captcha: any = null; // 云盾短信验证码实例
    invitationCode: string = ''; // 邀请码
    isVerifyShow: boolean = false; // 是否显示验证模态框组件

    // 处理UserForm组件change事件
    handleUserFormChange(userForm: UserFormModel) {
        userForm.invitationCode = this.userForm.invitationCode;
        this.setStates({ userForm });
    }

    // 提交注册表单
    async submit() {
        try {
            let result = await this.register();
            if (!result) Prompt.error('注册失败');
            else this.setStates({ registerStatus: RegisterStatus.Success });
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理验证列表组件submit事件
    async handleVerifyListSubmit(code: string) {
        let userForm = Utils.duplicate(this.userForm);
        userForm.code = code;
        this.setStates({ userForm });

        let result = await this.register();
        if (!result) Prompt.error('注册失败');
        else this.setStates({ registerStatus: RegisterStatus.Success });
    }

    // 处理验证列表组件stop事件
    handleVerifyListStop() {
        this.captcha && this.captcha.refresh();
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
        this.invitationCode = code;
        this.setStates({ userForm });
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
        this.initData();
    }

    mounted() {
        this.initCaptcha();
    }
}
