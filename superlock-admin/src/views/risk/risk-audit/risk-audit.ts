import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { FreeTrialType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { FreeTrialModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const riskModule = namespace('risk');

@Component({
    name: 'RiskAudit',
    components: { SecondVerify }
})
export default class RiskAudit extends Vue {
    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;

    @riskModule.State('type') type!: FreeTrialType;
    @riskModule.State('freeTrial') freeTrial!: FreeTrialModel;
    @riskModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @riskModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @riskModule.Action('fetchFreeTrial') fetchFreeTrial!: () => any;
    @riskModule.Action('setFreeTrial') setFreeTrial!: (isCode?: boolean) => any;

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let freeTrial = Utils.duplicate(this.freeTrial);
        freeTrial[key] = value;
        this.setStates({ freeTrial });
    }

    // 提交免审信息
    async submit(type: FreeTrialType, isCode?: boolean) {
        try {
            this.setStates({ type });
            let msg = ['提现免审', '利息支出免审', '推广奖励免审', '最小锁仓数量'][type - 1],
                result = await this.setFreeTrial(isCode);
            if (!result) Prompt.error(`${msg}设置失败`);
            else Prompt.success(`${msg}设置成功`);
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit() {
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
