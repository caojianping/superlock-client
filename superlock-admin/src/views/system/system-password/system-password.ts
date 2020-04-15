import Vue from 'vue';
import { namespace, Mutation, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { ResponseCode } from '@/ts/config';
import { Prompt, Token } from '@/ts/common';
import { SecondVerifyResult, TokenInfo, PasswordFormModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const systemModule = namespace('system');

@Component({
    name: 'SystemPassword',
    components: { SecondVerify }
})
export default class SystemPassword extends Vue {
    @State('tokenInfo') tokenInfo!: TokenInfo;
    @Mutation(TYPES.CLEAR_STATES) clearRootStates!: () => any;

    @systemModule.State('passwordForm') passwordForm!: PasswordFormModel;
    @systemModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @systemModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @systemModule.Action('setPassword') setPassword!: (isCode: boolean) => any;

    isSecondVerifyShow: boolean = false; // 是否显示二次验证

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let passwordForm = Utils.duplicate(this.passwordForm);
        passwordForm[key] = value;
        this.setStates({ passwordForm });
    }

    // 提交密码信息
    async submit(isCode: boolean) {
        try {
            let self = this,
                result = await this.setPassword(isCode);
            if (!result) Prompt.error('密码修改失败');
            else {
                Token.removeTokenInfo();
                this.clearRootStates();
                Prompt.success('密码修改成功，稍后将跳转至登录页面重新登录');
                setTimeout(function() {
                    self.$router.push({ path: '/login' });
                }, 1688);
            }
        } catch (error) {
            let code = error.code;
            if (code === ResponseCode.SecondVerify) {
                let data = error.data as SecondVerifyResult;
                if (data.verifyMethod === '001') {
                    this.isSecondVerifyShow = true;
                }
            } else {
                Prompt.error(error.message || error);
            }
        }
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit(code: string) {
        let passwordForm = Utils.duplicate(this.passwordForm);
        passwordForm.code = code;
        this.setStates({ passwordForm });
        await this.submit(true);
    }

    // 初始化数据
    initData() {
        let passwordForm = Utils.duplicate(this.passwordForm);
        passwordForm.name = this.tokenInfo.username;
        passwordForm.oldPwd = '';
        this.setStates({ passwordForm });
    }

    created() {
        this.clearStates();
        this.initData();
    }

    mounted() {
        Utils.jumpTop();
    }
}
