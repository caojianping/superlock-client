import Vue from 'vue';
import { Action } from 'vuex-class';
import { Component, Prop, Watch } from 'vue-property-decorator';

import Locales from '@/locales';
import { VerifyType } from '@/ts/config';
import { Prompt } from '@/ts/common';

import Spin from '@/components/common/spin';

const i18n = Locales.buildLocale();

@Component({
    name: 'VerifyCode',
    components: { Spin }
})
export default class VerifyCode extends Vue {
    @Prop({ type: Boolean, default: false }) readonly isInit!: boolean; // 是否初始化
    @Prop() readonly verifyType!: VerifyType; // 验证类型
    @Prop() readonly areaCode!: string; // 国家/地区区号
    @Prop() readonly mobile!: string; // 手机号
    @Prop() readonly email!: string; // 邮箱

    @Action('fetchSmsCode') fetchSmsCode!: (payload: { areaCode: string; mobile: string }) => any;
    @Action('fetchEmailCode') fetchEmailCode!: (payload: { areaCode: string; mobile: string; email: string }) => any;

    isSending: boolean = false; // 是否发送验证码中
    isSpinning: boolean = false; // 是否加载验证码中

    timer: any = null; // 倒计时定时器
    seconds: number = 120; // 倒计时秒数
    text: string = i18n.tc('COMMON.GET_CODE'); // 倒计时文字

    // 清除定时器
    clearTimer(isClear: boolean = false) {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.isSending = false;
        this.timer = null;
        this.seconds = 120;
        this.text = i18n.tc('COMMON.GET_CODE');
        !isClear && this.$emit('stop');
    }

    // 设置倒计时
    setCountdown() {
        let self = this,
            seconds = self.seconds;
        self.text = `${seconds}${i18n.tc('COMMON.SECOND')}`;
        self.timer = setInterval(function() {
            self.seconds = seconds--;
            if (self.seconds <= 0) {
                self.clearTimer();
            } else {
                self.text = `${self.seconds}${i18n.tc('COMMON.SECOND')}`;
            }
        }, 1000);
    }

    // 发送验证码
    async sendCode() {
        this.clearTimer(true);
        if (this.isSending) return;

        let { verifyType, areaCode, mobile, email } = this;
        this.isSpinning = true;
        this.isSending = true;
        try {
            let result =
                verifyType === VerifyType.SmsVerify
                    ? await this.fetchSmsCode({ areaCode, mobile })
                    : await this.fetchEmailCode({ areaCode, mobile, email });
            this.isSpinning = false;
            if (!result) {
                this.isSending = false;
                Prompt.error(i18n.tc('COMMON.SEND_FAILURE'));
                this.$emit('stop');
            } else {
                this.setCountdown();
            }
        } catch (error) {
            this.isSpinning = false;
            this.isSending = false;
            Prompt.error(error.message || error);
            this.$emit('stop');
        }
    }

    mounted() {
        if (this.isInit) {
            this.sendCode();
        }
    }

    @Watch('isInit')
    watchIsInit(isInit: boolean) {
        if (isInit) {
            this.sendCode();
        }
    }
}
