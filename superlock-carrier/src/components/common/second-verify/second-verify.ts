import Vue from 'vue';
import { Mutation, namespace } from 'vuex-class';
import { Component, Prop, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { AreaCodes, defaultAreaCode, IAreaCode } from '@/ts/config';
import { Prompt, Token } from '@/ts/common';
import { LoginFormModel } from '@/ts/models';

import SmsCode from '@/components/common/sms-code';

const loginModule = namespace('login');

@Component({
    name: 'SecondVerify',
    components: { SmsCode }
})
export default class SecondVerify extends Vue {
    @Prop({ type: Boolean, default: false }) readonly isShow!: boolean;
    @Prop({ type: Boolean, default: false }) readonly isLogin!: boolean;

    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;
    @Mutation(TYPES.CLEAR_STATES) clearRootStates!: () => any;
    @loginModule.State('loginForm') loginForm!: LoginFormModel;

    isModalShow: boolean = false; // 是否显示模态框
    areaCode: string = ''; // 国家、地区区号
    mobile: string = ''; // 手机号
    smsCode: string = ''; // 短信验证码

    get filterAreaCode() {
        let areaCode = this.areaCode;
        return AreaCodes.filter((item: IAreaCode) => item.id === areaCode)[0] || defaultAreaCode;
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.setRootStates({ isSecondVerifyShow: false });
    }

    // 提交短信验证码
    async submit() {
        let smsCode = this.smsCode;
        if (!smsCode) {
            Prompt.warning('短信验证码不可以为空');
            return;
        }

        Token.setCode(smsCode);
        this.setRootStates({ isSecondVerifyShow: false });
        this.$emit('submit');
    }

    // 谷歌验证码获取焦点
    smsCodeFocus() {
        let self = this;
        self.$nextTick(function() {
            let $smsCode: any = self.$refs.smsCode;
            if ($smsCode) {
                $smsCode.focus();
            }
        });
    }

    // 初始化数据
    initData() {
        let isLogin = this.isLogin;
        if (isLogin) {
            let loginForm = this.loginForm;
            this.areaCode = loginForm.areaCode;
            this.mobile = loginForm.mobile;
        } else {
            let tokenInfo = Token.getTokenInfo();
            this.areaCode = tokenInfo.areaCode;
            this.mobile = tokenInfo.mobile;
        }
        console.log('initData:', isLogin, this.areaCode, this.mobile);
        this.smsCode = '';
    }

    @Watch('isShow')
    watchIsShow(isShow: boolean) {
        this.isModalShow = isShow;
        if (isShow) {
            this.initData();
            this.smsCodeFocus();
        }
    }
}
