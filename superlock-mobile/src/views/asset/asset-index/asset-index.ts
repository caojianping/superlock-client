import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { AssetStatsModel, EarningsStatsModel, LockModel } from '@/ts/models';

import { CellGroup, Cell, Tabs, Tab } from 'vant';
import Navs from '@/components/common/navs';
import Spin from '@/components/common/spin';
import RechargeCoins from '@/components/recharge/recharge-coins';

const assetModule = namespace('asset');

@Component({
    name: 'AssetIndex',
    components: { CellGroup, Cell, Tabs, Tab, Spin, Navs, RechargeCoins }
})
export default class AssetIndex extends Vue {
    @State('lockUnits') lockUnits!: Array<string>;
    @State('lockStatuses') lockStatuses!: Map<number, string>;

    @assetModule.State('assetStats') assetStats!: AssetStatsModel | null;
    @assetModule.State('earningsStats')
    earningsStats!: EarningsStatsModel | null;
    @assetModule.State('locks') locks!: Array<LockModel> | null;

    @assetModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @assetModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @assetModule.Action('fetchAssetStats') fetchAssetStats!: () => any;
    @assetModule.Action('fetchEarningsStats') fetchEarningsStats!: () => any;
    @assetModule.Action('fetchLocks') fetchLocks!: () => any;

    activeTab: number = 0;
    isTotalVisible: boolean = true;
    isEarningsStatsSpinning: boolean = false;
    isAssetStatsSpinning: boolean = true;
    isLocksSpinning: boolean = false;
    isLoansSpinning: boolean = false;
    isAwardsSpinning: boolean = false;

    isRechargeCoinsShow: boolean = false;

    // 切换总资产可见性
    toggleTotal() {
        this.isTotalVisible = !this.isTotalVisible;
    }

    // 打开充值币种组件
    openRechargeCoins() {
        this.isRechargeCoinsShow = true;
    }

    // 跳转页面
    goPage(path: string) {
        this.$router.push(path);
    }

    // 处理选项卡change事件
    async handleTabsChange() {
        this.fetchData(this.activeTab);
    }

    // 获取数据
    async fetchData(index: number) {
        let keys = {
                0: 'AssetStats',
                1: 'Locks',
                2: 'Loans',
                3: 'Awards',
                4: 'EarningsStats'
            },
            caches = {
                0: this.assetStats,
                1: this.locks,
                2: null,
                3: null,
                4: this.earningsStats
            },
            funcs = {
                0: this.fetchAssetStats,
                1: this.fetchLocks,
                2: null,
                3: null,
                4: this.fetchEarningsStats
            },
            key = `is${keys[index]}Spinning`,
            func = funcs[index];
        console.log(index, key, caches);
        if (!caches[index]) {
            this[key] = true;
            func && (await func());
            this[key] = false;
        }
    }

    mounted() {
        this.fetchData(this.activeTab);
        // this.fetchData(4);
    }
}
