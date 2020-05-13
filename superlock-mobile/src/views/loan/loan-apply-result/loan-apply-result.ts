import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { SessionStorage } from 'jts-storage';

import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { LoanApplyResultModel } from '@/ts/models';

import { Button } from 'vant';
import Header from '@/components/common/header';

const loanModule = namespace('loan');

@Component({
    name: 'LoanApplyResult',
    components: { Button, Header }
})
export default class LoanApplyResult extends Vue {
    @loanModule.State('applyResult') applyResult?: LoanApplyResultModel | null;
    @loanModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loanModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    // 初始化数据
    initData() {
        if (!this.applyResult) {
            let applyResult = SessionStorage.getItem<LoanApplyResultModel>(CONSTANTS.LOAN_APPLY_RESULT);
            this.setStates({ applyResult });
        }
    }

    created() {
        this.initData();
    }
}
