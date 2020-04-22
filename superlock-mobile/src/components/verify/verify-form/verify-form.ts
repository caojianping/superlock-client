import Vue from 'vue';
import { Component, Model, Watch, Prop } from 'vue-property-decorator';

import { VerifyType } from '@/ts/config';
import { Prompt } from '@/ts/common';

import { Popup, Field, Button } from 'vant';
import Header from '@/components/common/header';
import VerifyCode from '@/components/verify/verify-code';

@Component({
    name: 'VerifyForm',
    components: { Popup, Field, Button, Header, VerifyCode }
})
export default class VerifyForm extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop({ type: Boolean, default: false }) readonly isForget!: boolean; // 是否为忘记密码页面
    @Prop() readonly verifyType!: VerifyType; // 验证类型
    @Prop() readonly areaCode!: string; // 国家/地区区号
    @Prop() readonly mobile!: string; // 手机号
    @Prop() readonly email!: string; // 邮箱

    verifyNames: Array<string> = ['邮箱', '短信'];
    isShow: boolean = false; // 是否显示模态框
    code: string = ''; // 验证码

    // 处理弹出框close事件
    handlePopupClose() {
        this.$emit('close', false);
    }

    // 处理验证码组件stop事件
    handleVerifyCodeStop() {
        this.$emit('stop');
    }

    // 提交验证码
    submit() {
        let code = this.code;
        if (!code) {
            let { verifyNames, verifyType } = this;
            Prompt.warning(`${verifyNames[verifyType - 1]}验证码不可以为空`);
            return;
        }

        this.$emit('close', false);
        this.$emit('submit', code);
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            this.code = '';
        }
    }
}
