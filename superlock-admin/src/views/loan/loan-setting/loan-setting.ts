import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { LoanInfoModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const loanModule = namespace('loan');

@Component({
    name: 'LoanSetting',
    components: { SecondVerify }
})
export default class LoanSetting extends Vue {
    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;

    @loanModule.State('loanInfo') loanInfo!: LoanInfoModel;

    @loanModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loanModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @loanModule.Action('fetchLoanInfo') fetchLoanInfo!: () => any;
    @loanModule.Action('setLoanInfo') setLoanInfo!: (isCode?: boolean) => any;

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let loanInfo = Utils.duplicate(this.loanInfo);
        loanInfo[key] = value;
        this.setStates({ loanInfo });
    }

    // 提交贷款设置信息
    async submit(isCode?: boolean) {
        try {
            let result = await this.setLoanInfo(isCode);
            if (!result) Prompt.error('贷款信息设置失败');
            else {
                Prompt.success('贷款信息设置成功');
                await this.fetchLoanInfo();
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchLoanInfo();
    }
}
