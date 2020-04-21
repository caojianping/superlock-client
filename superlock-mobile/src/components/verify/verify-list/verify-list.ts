import Vue from 'vue';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';

import { CONSTANTS, VerifyType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { VerifyResult } from '@/ts/models';

import { Popup, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';
import VerifyForm from '@/components/verify/verify-form';

@Component({
    name: 'VerifyList',
    components: { Popup, CellGroup, Cell, Header, VerifyForm }
})
export default class VerifyList extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly areaCode!: string; // 国家/地区区号
    @Prop() readonly mobile!: string; // 手机号
    @Prop() readonly verifyResult?: VerifyResult | null; // 验证结果；验证方式：100邮箱验证；010短信验证；001谷歌验证；

    @Prop({ type: Boolean, default: false }) readonly isForget!: boolean; // 是否为忘记密码页面
    @Prop() readonly from!: string; // 来源

    isShow: boolean = false; // 是否显示模态框

    emailFlag: number = 0; // 邮箱验证标志位
    smsFlag: number = 0; // 短信验证标志位
    googleFlag: number = 0; // 谷歌验证标志位

    verifyType: VerifyType = VerifyType.SmsVerify; // 验证类型
    isVerifyShow: boolean = false; // 是否显示验证表单组件

    get email() {
        let verifyResult = this.verifyResult;
        if (!verifyResult) return '';
        else return verifyResult.email || '';
    }

    // 处理弹出框close事件
    handlePopupClose() {
        console.log('verify-list close');
        this.$emit('close', false, false);
    }

    // 处理邮箱验证
    handleEmailVerify() {
        if (this.emailFlag === 0) return;

        this.verifyType = VerifyType.EmailVerify;
        let email = this.email;
        if (!email) {
            let path = this.$route.path;
            if (path.indexOf('/user/login') > -1) {
                Prompt.warning('您还没有绑定邮箱，请您先联系客服').then(() => {
                    window.location.href = CONSTANTS.CUSTOMER_SERVICE;
                });
            } else {
                Prompt.warning('您还没有绑定邮箱，请您先绑定邮箱').then(() => {
                    this.$router.push('/security/email');
                });
            }
        } else {
            this.isVerifyShow = true;
        }
    }

    // 处理短信验证
    handleSmsVerify() {
        if (this.smsFlag === 0) return;

        this.verifyType = VerifyType.SmsVerify;
        this.isVerifyShow = true;
    }

    // 处理验证表单submit事件
    handleVerifyFormSubmit(code: string) {
        this.$emit('close', false, true);
        this.$emit('submit', code);
    }

    // 处理验证表单stop事件
    handleVerifyFormStop() {
        this.$emit('stop');
    }

    // 解析验证方式
    resolveVerifyMode(verifyResult?: VerifyResult | null) {
        let emailFlag = 0,
            smsFlag = 0,
            googleFlag = 0;
        if (verifyResult) {
            let parts = (verifyResult.verifyMode || '').split('');
            emailFlag = isNaN(Number(parts[0])) ? 0 : Number(parts[0]);
            smsFlag = isNaN(Number(parts[1])) ? 0 : Number(parts[1]);
            googleFlag = isNaN(Number(parts[2])) ? 0 : Number(parts[2]);
        }
        this.emailFlag = emailFlag;
        this.smsFlag = smsFlag;
        this.googleFlag = googleFlag;
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            this.resolveVerifyMode(this.verifyResult);
        }
    }
}
