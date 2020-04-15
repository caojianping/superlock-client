import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { LoanFormModel } from '@/ts/models';

const loanModule = namespace('loan');

@Component({
    name: 'LoanSetting',
    components: {}
})
export default class LoanSetting extends Vue {
    @loanModule.State('loanForm') loanForm!: Array<LoanFormModel>;
    @loanModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loanModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @loanModule.Action('setLoan') setLoan!: () => any;

    handleFormChange(key: string, value: any) {
        let loanForm = Utils.duplicate(this.loanForm);
        loanForm[key] = value;
        this.setStates({ loanForm });
    }

    async save() {
        try {
            let result = await this.setLoan();
            result && this.$router.push({ path: '/loan/order' });
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    mounted() {
        Utils.jumpTop();
    }
}
