import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { SessionStorage } from 'jts-storage';

import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { LoanRepayResultModel } from '@/ts/models';

import { Button } from 'vant';
import Header from '@/components/common/header';

const loanModule = namespace('loan');

@Component({
    name: 'LoanRepayResult',
    components: { Button, Header }
})
export default class LoanRepayResult extends Vue {
    @loanModule.State('applyResult') applyResult?: LoanRepayResultModel | null;
    @loanModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loanModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    // 初始化数据
    initData() {
        if (!this.applyResult) {
            let applyResult = SessionStorage.getItem<LoanRepayResultModel>(CONSTANTS.LOAN_REPAY_RESULT);
            this.setStates({ applyResult });
        }
    }

    created() {
        this.initData();
    }
}
