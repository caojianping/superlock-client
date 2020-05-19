import Vue from 'vue';
import { namespace, State, Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { SessionStorage } from 'jts-storage';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { CONSTANTS } from '@/ts/config';
import { From } from '@/ts/common';
import { ExchangeRateModel, LockModel, LoanModel, AssetStatsModel, EarningsStatsModel, PromoteRewardStatsModel } from '@/ts/models';

import { Toast, PullRefresh, CellGroup, Cell, Tabs, Tab } from 'vant';
import Navs from '@/components/common/navs';
import Spin from '@/components/common/spin';
import RechargeCoins from '@/components/recharge/recharge-coins';
import EarningsInfo from '@/components/asset/earnings-info';

const lockModule = namespace('lock');
const loanModule = namespace('loan');
const projectModule = namespace('project');

@Component({
    name: 'AssetIndex',
    components: {
        PullRefresh,
        CellGroup,
        Cell,
        Tabs,
        Tab,
        Navs,
        Spin,
        RechargeCoins,
        EarningsInfo
    }
})
export default class AssetIndex extends Vue {
    @State('unitTypes') unitTypes!: Array<string>;
    @State('exchangeRate') exchangeRate?: ExchangeRateModel | null;
    @Action('fetchExchangeRate') fetchExchangeRate!: (payload: any) => any;

    @lockModule.State('lockStatuses') lockStatuses!: Map<number, string>;
    @lockModule.State('lockColors') lockColors!: Map<number, string>;
    @lockModule.State('locks') locks?: Array<LockModel>;
    @lockModule.Mutation(TYPES.SET_STATES) setLockStates!: (payload: any) => any;
    @lockModule.Mutation(TYPES.CLEAR_STATES) clearLockStates!: () => any;
    @lockModule.Action('fetchLocks') fetchLocks!: () => any;

    @loanModule.State('loanStatuses') loanStatuses!: Map<number, string>;
    @loanModule.State('loanColors') loanColors!: Map<number, string>;
    @loanModule.State('loans') loans?: Array<LoanModel>;
    @loanModule.Mutation(TYPES.SET_STATES) setLoanStates!: (payload: any) => any;
    @loanModule.Mutation(TYPES.CLEAR_STATES) clearLoanStates!: () => any;
    @loanModule.Action('fetchLoans') fetchLoans!: () => any;

    @projectModule.State('assetStats') assetStats?: AssetStatsModel | null;
    @projectModule.State('earningsStats') earningsStats?: EarningsStatsModel | null;
    @projectModule.State('rewardStats') rewardStats?: PromoteRewardStatsModel | null;
    @projectModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @projectModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @projectModule.Action('fetchAssetStats') fetchAssetStats!: () => any;
    @projectModule.Action('fetchEarningsStats') fetchEarningsStats!: () => any;
    @projectModule.Action('fetchPromoteRewardStats') fetchPromoteRewardStats!: () => any;

    activeTab: number = 0;

    isPulling: boolean = false; // 是否下拉刷新
    isTotalVisible: boolean = true;

    isAssetStatsSpinning: boolean = false;
    isLocksSpinning: boolean = false;
    isLoansSpinning: boolean = false;
    isRewardStatsSpinning: boolean = false;

    isRechargeCoinsShow: boolean = false;
    isEarningsInfoShow: boolean = false;

    // 切换总资产可见性
    toggleTotal() {
        this.isTotalVisible = !this.isTotalVisible;
    }

    // 打开组件
    openComponent(key: string) {
        this[key] = true;
    }

    // 跳转至锁仓详情页面
    goLockDetail(lock: LockModel) {
        From.setLoanFrom('/asset/index?type=1');
        SessionStorage.setItem<LockModel>(CONSTANTS.LOCK, lock);
        this.$router.push('/lock/detail');
    }

    // 跳转至贷款详情页面
    goLoanDetail(loan: LoanModel) {
        From.setLoanFrom('/asset/index?type=2');
        SessionStorage.setItem<LoanModel>(CONSTANTS.LOAN, loan);
        this.$router.push('/loan/detail');
    }

    // 处理选项卡change事件
    async handleTabsChange() {
        this.fetchTabData(this.activeTab);
    }

    // 获取选项卡数据
    async fetchTabData(index: number, isRefresh: boolean = false) {
        let keys = {
                0: 'AssetStats',
                1: 'Locks',
                2: 'Loans',
                3: 'RewardStats'
            },
            caches = {
                0: this.assetStats,
                1: this.locks,
                2: this.loans,
                3: this.rewardStats
            },
            funcs = {
                0: this.fetchAssetStats,
                1: this.fetchLocks,
                2: this.fetchLoans,
                3: this.fetchPromoteRewardStats
            },
            key = `is${keys[index]}Spinning`,
            func = funcs[index];
        if (isRefresh || !caches[index]) {
            this[key] = true;
            func && (await func());
            this[key] = false;
        }
    }

    // 获取所有数据，全部并发请求
    async fetchData(isRefresh: boolean) {
        (!this.exchangeRate || isRefresh) && this.fetchExchangeRate({ fromCoin: 'BCB', toCoin: 'DC' });
        (!this.earningsStats || isRefresh) && this.fetchEarningsStats();

        let activeTab = this.activeTab;
        if (activeTab !== 0) {
            await this.fetchTabData(activeTab, true);
        }
        await this.fetchTabData(0, isRefresh);
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData(true);
        this.isPulling = false;
        Toast('刷新成功');
    }

    // 初始化数据
    initData() {
        let query = this.$route.query || {};
        this.activeTab = Utils.digitConvert(query.type);
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchData(false);
    }
}
