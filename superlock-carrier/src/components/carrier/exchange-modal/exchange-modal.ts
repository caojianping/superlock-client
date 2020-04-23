import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component, Model, Watch } from 'vue-property-decorator';
import Calculator from 'jts-calculator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { CarrierInfoModel, ExchangeFormModel, ExchangeStatsModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const carrierModule = namespace('carrier');

enum StepType {
    Default = 1, // 默认
    Confirm = 2 // 确认兑换
}

@Component({
    name: 'ExchangeModal',
    components: { SecondVerify }
})
export default class ExchangeModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model

    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;

    @carrierModule.State('carrierInfo') carrierInfo?: CarrierInfoModel | null;
    @carrierModule.State('rate') rate!: number;
    @carrierModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @carrierModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @carrierModule.Action('fetchRate') fetchRate!: () => any;
    @carrierModule.Action('presetExchange') presetExchange!: (payload: any) => any;

    isShow: boolean = this.value; // 是否显示模态框
    stepType: StepType = StepType.Default; // 步骤类型
    exchangeForm: ExchangeFormModel = new ExchangeFormModel(); // 兑换表单
    exchangeStats: ExchangeStatsModel | null = null; // 兑换统计

    timer: any = null; // 倒计时定时器
    seconds: number = 300; // 倒计时秒数
    text: string = ''; // 倒计时文字

    // 清除定时器
    clearTimer(isClear: boolean = false) {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = null;
        this.seconds = 300;
        this.text = '';
        !isClear && this.$emit('close', false);
    }

    // 设置倒计时
    setCountdown() {
        let self = this,
            seconds = self.seconds;
        self.text = Utils.dateCountdown(seconds);
        self.timer = setInterval(function() {
            self.seconds = seconds--;
            if (self.seconds <= 0) {
                self.clearTimer();
            } else {
                self.text = Utils.dateCountdown(self.seconds);
            }
        }, 1000);
    }

    // bcb数量
    get bcbAmount() {
        let amount = this.exchangeForm.amount || 0,
            rate = this.rate || 0;
        return Calculator.multiply(amount, rate, 6);
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let exchangeForm = Utils.duplicate(this.exchangeForm);
        exchangeForm[key] = value;
        this.exchangeForm = exchangeForm;
    }

    // 兑换全部余额
    exchangeAll() {
        if (this.stepType === StepType.Confirm) return;

        let exchangeForm = Utils.duplicate(this.exchangeForm);
        exchangeForm.amount = exchangeForm.maxAmount;
        this.exchangeForm = exchangeForm;
    }

    // 提交兑换表单
    async submitExchange(isCode?: boolean) {
        try {
            let exchangeForm = Utils.duplicate(this.exchangeForm),
                exchangeStats = await this.presetExchange({ exchangeForm, isCode });
            if (!exchangeStats) {
                Prompt.error('兑换失败');
                return;
            }

            this.stepType = StepType.Confirm;
            exchangeForm.amount = exchangeStats.dcAmount;
            this.exchangeForm = exchangeForm;
            this.setStates({ rate: exchangeStats.rate });
            this.exchangeStats = exchangeStats;

            this.setCountdown();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit() {
        await this.submitExchange(true);
    }

    // 确认兑换
    async confirmExchange() {
        let exchangeStats = this.exchangeStats;
        if (!exchangeStats) return;

        this.$emit('close', false);
        this.$emit('submit', exchangeStats.serial);
    }

    // 初始化数据
    async initData() {
        this.clearTimer(true);
        await this.fetchRate();

        this.stepType = StepType.Default;
        let exchangeForm = new ExchangeFormModel(),
            carrierInfo = this.carrierInfo;
        if (carrierInfo) {
            exchangeForm.maxAmount = carrierInfo.dcBalance;
        }
        this.exchangeForm = exchangeForm;
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            this.initData();
        }
    }
}
