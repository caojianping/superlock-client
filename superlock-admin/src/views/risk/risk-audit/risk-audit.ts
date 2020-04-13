import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { ResponseCode, FreeTrialType } from '@/ts/config';
import { Utils, Prompt } from '@/ts/common';
import { SecondVerifyResult, FreeTrialModel } from '@/ts/models';
import SecondVerify from '@/components/common/second-verify';

const riskModule = namespace('risk');

@Component({
    name: 'RiskAudit',
    components: { SecondVerify }
})
export default class RiskAudit extends Vue {
    @riskModule.State('type') type!: FreeTrialType;
    @riskModule.State('freeTrial') freeTrial!: FreeTrialModel;

    @riskModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @riskModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @riskModule.Action('fetchFreeTrial') fetchFreeTrial!: () => any;
    @riskModule.Action('setFreeTrial') setFreeTrial!: (isCode: boolean) => any;

    isSecondVerifyShow: boolean = false; // 是否显示二次验证

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let freeTrial = Utils.duplicate(this.freeTrial);
        freeTrial[key] = value;
        this.setStates({ freeTrial });
    }

    // 提交免审信息
    async submit(type: FreeTrialType, isCode: boolean) {
        try {
            this.setStates({ type });
            let msg = [
                    '提现免审',
                    '利息支出免审',
                    '推广奖励免审',
                    '最小锁仓数量'
                ][type - 1],
                result = await this.setFreeTrial(isCode);
            if (!result) Prompt.error(`${msg}设置失败`);
            else Prompt.success(`${msg}设置成功`);
        } catch (error) {
            let code = error.code;
            if (code === ResponseCode.SecondVerify) {
                let data = error.data as SecondVerifyResult;
                if (data.verifyMethod === '001') {
                    this.isSecondVerifyShow = true;
                }
            } else {
                Prompt.error(error.message || error);
            }
        }
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit(code: string) {
        let freeTrial = Utils.duplicate(this.freeTrial);
        freeTrial.code = code;
        this.setStates({ freeTrial });
        await this.submit(this.type, true);
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchFreeTrial();
    }
}
