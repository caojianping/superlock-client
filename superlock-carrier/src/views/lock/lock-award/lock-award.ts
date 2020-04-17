import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { AwardFormModel } from '@/ts/models';

const lockModule = namespace('lock');

@Component({
    name: 'LockAward',
    components: {}
})
export default class LockAward extends Vue {
    @lockModule.State('awardForm') awardForm!: AwardFormModel;
    @lockModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @lockModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @lockModule.Action('fetchLockAward') fetchLockAward!: () => any;

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchLockAward();
    }
}
