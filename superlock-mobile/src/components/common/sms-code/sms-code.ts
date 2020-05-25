import Vue from 'vue';
import { Action } from 'vuex-class';
import { Component, Prop, Watch } from 'vue-property-decorator';

import Locales from '@/locales';
import { Prompt } from '@/ts/common';
import Spin from '@/components/common/spin';

const i18n = Locales.buildLocale();

@Component({
    name: 'SmsCode',
    components: { Spin }
})
export default class SmsCode extends Vue {
    @Prop() readonly areaCode!: string;
    @Prop() readonly mobile!: string;
    @Prop({ type: Boolean, default: false }) readonly isInit!: boolean;

    @Action('fetchSmsCode') fetchSmsCode!: (payload: { areaCode: string; mobile: string }) => any;

    isSending: boolean = false; // 是否发送短信验证码中
    isSpinning: boolean = false; // 是否加载短信验证码中
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

    // 发送短信验证码
    async sendSmsCode() {
        this.clearTimer(true);
        if (this.isSending) return;

        let { areaCode, mobile } = this;
        this.isSpinning = true;
        this.isSending = true;
        try {
            let result = await this.fetchSmsCode({ areaCode, mobile });
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
        this.sendSmsCode();
    }

    @Watch('isInit')
    watchIsInit(isInit: boolean) {
        if (isInit) {
            this.sendSmsCode();
        }
    }
}
