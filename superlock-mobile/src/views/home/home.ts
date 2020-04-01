import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { SessionStorage } from 'jts-storage';

import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import {
    UserLockQuotaModel,
    ProjectStatsModel,
    ProjectModel
} from '@/ts/models';

import Navs from '@/components/common/navs';
import Spin from '@/components/common/spin';

const userModule = namespace('user');
const projectModule = namespace('project');

@Component({
    name: 'Home',
    components: { Navs, Spin }
})
export default class Home extends Vue {
    @State('units') units!: Array<string>;

    @userModule.State('userLockQuota')
    userLockQuota?: UserLockQuotaModel | null;
    @userModule.Action('fetchUserLockQuota') fetchUserLockQuota!: () => any;

    @projectModule.State('projectStats')
    projectStats?: ProjectStatsModel | null;
    @projectModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @projectModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @projectModule.Action('fetchProjectStats') fetchProjectStats!: () => any;

    isProjectSpinning: boolean = false;
    isOptimizeSpinning: boolean = false;

    // 参与锁仓，缓存锁仓项目信息，以免页面刷新导致数据丢失等情况
    joinLock(lockProject: ProjectModel) {
        SessionStorage.setItem<ProjectModel>(
            CONSTANTS.LOCK_PROJECT,
            lockProject
        );
        this.$router.push('/lock/detail');
    }

    // 获取数据
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
