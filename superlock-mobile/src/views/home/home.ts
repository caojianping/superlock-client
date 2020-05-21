import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { SessionStorage } from 'jts-storage';

import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { UserLockQuotaModel, ProjectStatsModel, ProjectModel, UserInfoModel } from '@/ts/models';

import { Toast, PullRefresh } from 'vant';
import Navs from '@/components/common/navs';
import Spin from '@/components/common/spin';
import BindGuide from '@/components/common/bind-guide';

const userModule = namespace('user');
const projectModule = namespace('project');

@Component({
    name: 'Home',
    components: { PullRefresh, Navs, Spin, BindGuide }
})
export default class Home extends Vue {
    @State('unitTypes') unitTypes!: Array<string>;

    @userModule.State('userLockQuota') userLockQuota?: UserLockQuotaModel | null;
    @userModule.State('userInfo') userInfo?: UserInfoModel | null;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: (isLoading?: boolean) => any;
    @userModule.Action('fetchUserLockQuota') fetchUserLockQuota!: () => any;

    @projectModule.State('projectStats') projectStats?: ProjectStatsModel | null;
    @projectModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @projectModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @projectModule.Action('fetchProjectStats') fetchProjectStats!: () => any;

    isPulling: boolean = false; // 是否下拉刷新
    isProjectSpinning: boolean = false;
    // isOptimizeSpinning: boolean = false;

    // 是否需要设置利率
    get isRateSet(): Boolean | undefined {
        let projectStats = this.projectStats;
        if (!projectStats) return undefined;
        else {
            let rateSetRemind = projectStats.rateSetRemind;
            if (rateSetRemind === undefined) return undefined;
            else if (rateSetRemind === null) return false;
            else return rateSetRemind;
        }
    }

    // 是否需要绑定邮箱
    get isEmailBind(): Boolean | undefined {
        let userInfo: any = this.userInfo || {},
            email = userInfo.email;
        if (email === undefined) return undefined;
        else return email === null || email === '';
    }

    // 参与锁仓
    joinLock(lockProject: ProjectModel) {
        SessionStorage.setItem<ProjectModel>(CONSTANTS.LOCK_PROJECT, lockProject);
        this.$router.push('/lock/intro');
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        try {
            (!this.userLockQuota || isRefresh) && this.fetchUserLockQuota();
            (!this.userInfo || isRefresh) && this.fetchUserInfo();

            if (!this.projectStats || isRefresh) {
                this.isProjectSpinning = true;
                // this.isOptimizeSpinning = true;
                await this.fetchProjectStats();
                this.isProjectSpinning = false;
                // this.isOptimizeSpinning = false;
            }
        } catch (error) {
            this.isProjectSpinning = false;
            // this.isOptimizeSpinning = false;
        }
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData(true);
        this.isPulling = false;
        Toast('刷新成功');
    }

    mounted() {
        this.fetchData(false);
    }
}
