import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import { Tabs, Tab } from 'vant';
import Navs from '@/components/layout/navs';
import TYPES from '@/store/types';
import { AssetStatsModel, EarningsStatsModel, LockModel } from '@/ts/models';

const assetModule = namespace('asset');

@Component({
    name: 'AssetIndex',
    components: { Tabs, Tab, Navs }
})
export default class AssetIndex extends Vue {
    @assetModule.State('assetStats') assetStats!: AssetStatsModel;
    @assetModule.State('earningsStats') earningsStats!: EarningsStatsModel;
    @assetModule.State('locks') locks!: Array<LockModel>;

    @assetModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @assetModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @assetModule.Action('fetchAssetStats') fetchAssetStats!: () => any;
    @assetModule.Action('fetchEarningsStats') fetchEarningsStats!: () => any;
    @assetModule.Action('fetchLocks') fetchLocks!: () => any;

    activeTab: number = 0;

    handleTabsChange(name: string, title: string) {
        console.log(name, title, this.activeTab);
    }
}
