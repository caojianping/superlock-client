import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import {
    AssetStatsModel,
    EarningsStatsModel,
    LockModel,
    PromoteRewardStatsModel,
} from '@/ts/models';

import { PullRefresh, Toast, CellGroup, Cell, Tabs, Tab } from 'vant';
import Navs from '@/components/common/navs';
import Spin from '@/components/common/spin';
import RechargeCoins from '@/components/recharge/recharge-coins';
import LockInfo from '@/components/asset/lock-info';
import EarningsInfo from '@/components/asset/earnings-info';

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
    },
})
export default class AssetIndex extends Vue {
    @State('unitTypes') unitTypes!: Array<string>;

    @lockModule.State('locks') locks?: Array<LockModel>;
    @lockModule.Action('fetchLocks') fetchLocks!: () => any;

    @projectModule.State('assetStats') assetStats?: AssetStatsModel | null;
    @projectModule.State('earningsStats')
    earningsStats?: EarningsStatsModel | null;
    @projectModule.State('rewardStats')
    rewardStats?: PromoteRewardStatsModel | null;

    @projectModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @projectModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @projectModule.Action('fetchAssetStats') fetchAssetStats!: () => any;
    @projectModule.Action('fetchEarningsStats') fetchEarningsStats!: () => any;
    @projectModule.Action('fetchPromoteRewardStats')
    fetchPromoteRewardStats!: () => any;

    lockStatuses: any = {
        0: '订单已创建',
        10: '订单处理中',
        20: '锁仓计息中',
        30: '锁仓到期',
        40: '锁仓失败',
        50: '贷款质押中',
    };
    lockStyles: any = {
        0: 'black',
        10: 'gray',
        20: 'green',
        30: 'red',
        40: 'pink',
        50: 'orange',
    };

    activeTab: number = 0;

    isPulling: boolean = false;

    isTotalVisible: boolean = true;
    isEarningsStatsSpinning: boolean = false;

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
        this.fetchData(this.activeTab);
    }

    // 初始化数据
    initData() {
        let query = this.$route.query || {},
            type = Number(query.type);
        this.activeTab = isNaN(type) ? 0 : type;
    }

    // 获取数据
    async fetchData(index: number, isRefresh: boolean = false) {
        let keys = {
                0: 'AssetStats',
                1: 'Locks',
                2: 'Loans',
                3: 'RewardStats',
                4: 'EarningsStats',
            },
            caches = {
                0: this.assetStats,
                1: this.locks,
                2: null,
                3: this.rewardStats,
                4: this.earningsStats,
            },
            funcs = {
                0: this.fetchAssetStats,
                1: this.fetchLocks,
                2: null,
                3: this.fetchPromoteRewardStats,
                4: this.fetchEarningsStats,
            },
            key = `is${keys[index]}Spinning`,
            func = funcs[index];
        if (isRefresh || !caches[index]) {
            this[key] = true;
            func && (await func());
            this[key] = false;
        }
    }

    // 刷新数据
    async refreshData() {
        this.fetchData(this.activeTab, true);
        this.fetchData(4, true);
        this.isPulling = false;
        Toast('刷新成功');
    }

    created() {
        this.clearStates();
        this.initData();
    }

    mounted() {
        this.fetchData(this.activeTab);
        if (this.activeTab !== 0) {
            this.fetchData(0);
        }
        this.fetchData(4);
    }
}
