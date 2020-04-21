import Vue from 'vue';
import { namespace, State, Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { AssetStatsModel, EarningsStatsModel, LockModel, PromoteRewardStatsModel, ExchangeRateModel, UserInfoModel } from '@/ts/models';

import { PullRefresh, Toast, CellGroup, Cell, Tabs, Tab } from 'vant';
import Navs from '@/components/common/navs';
import Spin from '@/components/common/spin';
import RechargeCoins from '@/components/recharge/recharge-coins';
import LockInfo from '@/components/asset/lock-info';
import EarningsInfo from '@/components/asset/earnings-info';
import BindGuide from '@/components/common/bind-guide';

const userModule = namespace('user');
const lockModule = namespace('lock');
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
        LockInfo,
        EarningsInfo,
        BindGuide
    }
})
export default class AssetIndex extends Vue {
    @State('exchangeRate') exchangeRate?: ExchangeRateModel | null;
    @State('unitTypes') unitTypes!: Array<string>;
    @Action('fetchExchangeRate') fetchExchangeRate!: (payload: any) => any;

    @userModule.State('userInfo') userInfo!: UserInfoModel;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: () => any;

    @lockModule.State('locks') locks?: Array<LockModel>;
    @lockModule.Action('fetchLocks') fetchLocks!: () => any;

    @projectModule.State('assetStats') assetStats?: AssetStatsModel | null;
    @projectModule.State('earningsStats') earningsStats?: EarningsStatsModel | null;
    @projectModule.State('rewardStats') rewardStats?: PromoteRewardStatsModel | null;
    @projectModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @projectModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @projectModule.Action('fetchAssetStats') fetchAssetStats!: () => any;
    @projectModule.Action('fetchEarningsStats') fetchEarningsStats!: () => any;
    @projectModule.Action('fetchPromoteRewardStats') fetchPromoteRewardStats!: () => any;

    lockStatuses: any = {
        0: '订单已创建',
        10: '订单处理中',
        20: '锁仓计息中',
        30: '锁仓到期',
        40: '锁仓失败',
        50: '贷款质押中'
    };
    lockStyles: any = {
        0: 'black',
        10: 'gray',
        20: 'green',
        30: 'red',
        40: 'pink',
        50: 'orange'
    };

    activeTab: number = 0;

    isPulling: boolean = false;
    isTotalVisible: boolean = true;

    isAssetStatsSpinning: boolean = false;
    isLocksSpinning: boolean = false;
    isLoansSpinning: boolean = false;
    isRewardStatsSpinning: boolean = false;

    isRechargeCoinsShow: boolean = false;
    isEarningsInfoShow: boolean = false;
    isLockInfoShow: boolean = false;
    currentLock: LockModel = new LockModel();

    // 跳转页面
    goPage(path: string) {
        this.$router.push(path);
    }

    // 切换总资产可见性
    toggleTotal() {
        this.isTotalVisible = !this.isTotalVisible;
    }

    // 打开充值币种组件
    openRechargeCoins() {
        this.isRechargeCoinsShow = true;
    }

    // 打开收益信息组件
    openEarningsInfo() {
        this.isEarningsInfoShow = true;
    }

    // 打开锁仓详情
    openLockInfo(lock: LockModel) {
        this.isLockInfoShow = true;
        this.currentLock = lock;
    }

    // 处理选项卡change事件
    async handleTabsChange() {
        this.fetchTabData(this.activeTab);
    }

    // 初始化数据
    initData() {
        let query = this.$route.query || {},
            type = Number(query.type);
        this.activeTab = isNaN(type) ? 0 : type;
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
                2: null,
                3: this.rewardStats
            },
            funcs = {
                0: this.fetchAssetStats,
                1: this.fetchLocks,
                2: null,
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
    async fetchData() {
        this.fetchUserInfo();
        this.fetchExchangeRate({ fromCoin: 'BCB', toCoin: 'DC' });
        this.fetchEarningsStats();

        let activeTab = this.activeTab;
        this.fetchTabData(activeTab);
        if (activeTab !== 0) {
            this.fetchTabData(0);
        }
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData();
        this.isPulling = false;
        Toast('刷新成功');
    }

    created() {
        this.clearStates();
        this.initData();
    }

    mounted() {
        this.fetchData();
    }
}
