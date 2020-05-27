import Vue from 'vue';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';

import Locales from '@/locales';
import Utils from '@/ts/utils';
import { VerifyType, CONSTANTS } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { VerifyResult } from '@/ts/models';

import { Tabs, Tab, Field, Button } from 'vant';
import Header from '@/components/common/header';
import Modal from '@/components/common/modal';
import VerifyCode from '@/components/verify/verify-code';

const i18n = Locales.buildLocale();

@Component({
    name: 'VerifyModal',
    components: { Tabs, Tab, Field, Button, Header, Modal, VerifyCode }
})
export default class VerifyModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly areaCode!: string; // 国家/地区区号
    @Prop() readonly mobile!: string; // 手机号
    @Prop() readonly verifyResult?: VerifyResult | null; // 验证结果；验证方式：100邮箱验证；010短信验证；001谷歌验证；

    isShow: boolean = false; // 是否显示模态框

    emailFlag: number = 0; // 邮箱验证标志位
    smsFlag: number = 0; // 短信验证标志位

    activeTab: number = 0; // 当前、活跃的选项卡
    code: string = ''; // 验证码

    // 邮箱
    get email() {
        let verifyResult = this.verifyResult;
        if (!verifyResult) return '';
        else return verifyResult.email || '';
    }

    // 处理模态框close事件
    handleModalClose() {
        this.$emit('close', false);
    }

    // 处理选项卡change事件
    handleTabsChange() {}

    // 处理验证码组件stop事件
    handleVerifyCodeStop() {
        this.$emit('stop');
    }

    // 跳转至客服页面
    goCustomerService() {
        this.$emit('close', false);
        window.location.href = CONSTANTS.CUSTOMER_SERVICE;
    }

    // 提交验证码
    submit() {
        let { activeTab, code } = this;
        if (!code) return Prompt.warning([i18n.tc('VALIDATES.SMS_CODE_NOT_NULL'), i18n.tc('VALIDATES.EMAIL_CODE_NOT_NULL')][activeTab]);

        this.$emit('close', false);
        this.$emit('submit', [VerifyType.SmsVerify, VerifyType.EmailVerify][activeTab], code);
    }

    // 初始化数据
    initData(verifyResult?: VerifyResult | null) {
        let emailFlag = 0,
            smsFlag = 0,
            activeTab = 0;
        if (verifyResult) {
            let verifyMode = verifyResult.verifyMode || '',
                parts = verifyMode.split('');
            emailFlag = Utils.digitConvert(parts[0]);
            smsFlag = Utils.digitConvert(parts[1]);

            activeTab = { '100': 1, '010': 0, '110': 0 }[verifyMode];
        }
        this.emailFlag = emailFlag;
        this.smsFlag = smsFlag;

        this.activeTab = activeTab;
        this.code = '';
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            this.initData(this.verifyResult);
        }
    }
}
