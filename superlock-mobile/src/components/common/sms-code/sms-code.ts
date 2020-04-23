import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { Prompt } from '@/ts/common';
import Spin from '@/components/common/spin';

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
    text: string = '获取验证码'; // 倒计时文字

    // 清除定时器
    clearTimer(isClear: boolean = false) {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.isSending = false;
        this.timer = null;
        this.seconds = 120;
        this.text = '获取验证码';
        !isClear && this.$emit('stop');
    }

    // 设置倒计时
    setCountdown() {
        let self = this,
            seconds = self.seconds;
        self.text = `${seconds}秒`;
        self.timer = setInterval(function() {
            self.seconds = seconds--;
            if (self.seconds <= 0) {
                self.clearTimer();
            } else {
                self.text = `${self.seconds}秒`;
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
                Prompt.error('发送失败');
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
