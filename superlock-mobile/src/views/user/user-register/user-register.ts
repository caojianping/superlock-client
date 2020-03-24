import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import Utils from '@/ts/utils';
import { IAreaCode, defaultAreaCode, RegisterStatus } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { RegisterForm } from '@/ts/models';
import { RegisterService } from '@/ts/services';

import { Loading } from 'vant';
import AreaModal from '@/components/common/area-modal';
import WechatPrompt from '@/components/common/wechat-prompt';

@Component({
    name: 'UserRegister',
    components: { Loading, AreaModal, WechatPrompt }
})
export default class UserRegister extends Vue {
    registerService: RegisterService = new RegisterService();

    yunDun: any = null; // 云盾实例

    isSending: boolean = false; // 是否发送短信验证码中
    isLoading: boolean = false; // 是否加载短信验证码中
    countdownTimer: any = null; // 倒计时定时器
    countdownSeconds: number = 120; // 倒计时秒数
    countdownText: string = '获取验证码'; // 倒计时文字

    isShow: boolean = false; // 是否显示地区模态框
    activeAreaCode: IAreaCode = defaultAreaCode; // 当前地区区号数据

    registerStatus: RegisterStatus = RegisterStatus.Default; // 注册状态
    registerForm: RegisterForm = new RegisterForm();

    // 打开地区模态框
    openAreaModal() {
        this.isShow = true;
    }

    // 处理地区模态框change事件
    handleAreaModalChange(areaCode: IAreaCode) {
        this.activeAreaCode = areaCode;
        let registerForm = Utils.duplicate(this.registerForm);
        registerForm.areaCode = areaCode.code;
        this.registerForm = registerForm;
    }

    // 清除定时器
    clearTimer() {
        if (this.countdownTimer) {
            clearInterval(this.countdownTimer);
        }
        this.isSending = false;
        this.countdownTimer = null;
        this.countdownSeconds = 120;
        this.countdownText = '获取验证码';
        this.yunDun && this.yunDun.refresh();
    }

    // 设置倒计时
    setCountdown() {
        let self = this,
            { countdownTimer, countdownSeconds } = self;
        if (countdownTimer) {
            self.clearTimer();
        } else {
            self.countdownTimer = setInterval(function() {
                self.countdownSeconds = countdownSeconds--;
                if (self.countdownSeconds <= 0) {
                    self.clearTimer();
                } else {
                    self.countdownText = `${self.countdownSeconds}秒`;
                }
            }, 1000);
        }
    }

    // 发送短信验证码
    async sendSmsCode() {
        if (this.isSending) return;

        this.isLoading = true;
        this.isSending = true;
        try {
            let result = await this.registerService.fetchSmsCode(
                this.registerForm
            );
            this.isLoading = false;
            if (!result) {
                this.isSending = false;
                Prompt.error('发送失败');
                this.yunDun && this.yunDun.refresh();
            } else {
                Prompt.success('发送成功');
                this.setCountdown();
            }
        } catch (error) {
            this.isLoading = false;
            this.isSending = false;
            Prompt.error(error.message || error);
            this.yunDun && this.yunDun.refresh();
        }
    }

    // 注册
    async register() {
        try {
            let result = await this.registerService.register(this.registerForm);
            if (!result) Prompt.error('注册失败');
            else {
                this.registerStatus = RegisterStatus.Success;
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
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
            brandKey = Utils.resolveParameters('brandKey');
        this.registerForm = RegisterForm.createInstance(
            code,
            brandKey,
            defaultAreaCode.code
        );
    }

    // 初始化云盾
    initYunDun() {
        try {
            let self = this;
            if (window['initNECaptcha']) {
                window['initNECaptcha'](
                    {
                        element: '#captcha',
                        captchaId: '7c80c423944941819e409d0d6639c4dd',
                        mode: 'float'
                    },
                    function onload(instance) {
                        self.yunDun = instance;
                    },
                    function onerror(err) {
                        // console.log('onerror err:', err);
                    }
                );
            }
        } catch (error) {}
    }

    created() {
        this.initData();
    }

    mounted() {
        this.initYunDun();
    }
}
