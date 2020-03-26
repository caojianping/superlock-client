import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { UserLockQuotaModel, ProjectStatsModel } from '@/ts/models';

import Navs from '@/components/layout/navs';
import Spin from '@/components/common/spin';

const homeModule = namespace('home');

@Component({
    name: 'Home',
    components: { Navs, Spin }
})
export default class Home extends Vue {
    @State('lockUnits') lockUnits!: Array<string>;
    @homeModule.State('userLockQuota')
    userLockQuota!: UserLockQuotaModel | null;
    @homeModule.State('projectStats') projectStats!: ProjectStatsModel | null;

    @homeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @homeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @homeModule.Action('fetchUserLockQuota') fetchUserLockQuota!: () => any;
    @homeModule.Action('fetchProjectStats') fetchProjectStats!: () => any;

    isProjectSpinning: boolean = false;
    isOptimizeSpinning: boolean = false;

    async fetchData() {
        try {
            this.isProjectSpinning = true;
            this.isOptimizeSpinning = true;
            await this.fetchProjectStats();
            this.isProjectSpinning = false;
            this.isOptimizeSpinning = false;
            await this.fetchUserLockQuota();
        } catch (error) {
            this.isProjectSpinning = false;
            this.isOptimizeSpinning = false;
        }
    }

    mounted() {
        this.fetchData();
    }
}
