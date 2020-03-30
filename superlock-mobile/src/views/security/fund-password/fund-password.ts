import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { SecurityFormModel, UserInfoModel } from '@/ts/models';

import { Field, Button } from 'vant';
import Header from '@/components/common/header';

const userModule = namespace('user');
const securityModule = namespace('security');

@Component({
    name: 'FundPassword',
    components: { Field, Button, Header }
})
export default class FundPassword extends Vue {
    @userModule.State('userInfo') userInfo!: UserInfoModel;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: () => any;

    @securityModule.State('securityForm') securityForm!: SecurityFormModel;
    @securityModule.Mutation(TYPES.SET_STATES) setStates!: (
        payload: any
    ) => any;
    @securityModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @securityModule.Action('modifyFundPassword') modifyFundPassword!: () => any;

    isNewPasswordVisible: boolean = false;
    isConfirmPasswordVisible: boolean = false;

    // 处理Field控件input事件
    handleFieldInput(key: string, value: string) {
        let securityForm = Utils.duplicate(this.securityForm);
        securityForm[key] = value;
        this.setStates({ securityForm });
    }

    // 切换密码可见性
    togglePassword(key: string) {
        console.log('toggle key:', key, this[key]);
        this[key] = !this[key];
    }

    // 提交资金密码
    async submit() {
        try {
            let result = await this.modifyFundPassword();
            if (result) Prompt.success('资金密码修改成功');
            else Prompt.success('资金密码修改失败');
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    mounted() {
        this.fetchUserInfo();
    }
}
