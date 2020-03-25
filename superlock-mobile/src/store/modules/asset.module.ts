import TYPES from '@/store/types';
import { IActionContext, IAssetState } from '@/store/interfaces';
import { Token } from '@/ts/common';
import { AssetStatsModel, EarningsStatsModel, LockModel } from '@/ts/models';
import { AssetService, LockService } from '@/ts/services';

const assetState: IAssetState = {
    assetStats: new AssetStatsModel(),
    earningsStats: new EarningsStatsModel(),
    locks: []
};

const assetService = new AssetService();
const lockService = new LockService();

export default {
    namespaced: true,
    state: assetState,
    mutations: {
        [TYPES.SET_STATES](state: IAssetState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IAssetState) {
            state.assetStats = new AssetStatsModel();
            state.earningsStats = new EarningsStatsModel();
            state.locks = [];
        }
    },
    actions: {
        // 获取资产统计信息
        async fetchAssetStats(
            context: IActionContext<IAssetState>
        ): Promise<void> {
            let commit = context.commit;
            try {
                let assetStats = await assetService.fetchAssetStats();
                commit(TYPES.SET_STATES, { assetStats });
            } catch (error) {}
        },

        // 获取收益统计信息
        async fetchEarningsStats(
            context: IActionContext<IAssetState>
        ): Promise<void> {
            let commit = context.commit;
            try {
                let earningsStats = await assetService.fetchEarningsStats();
                commit(TYPES.SET_STATES, { earningsStats });
            } catch (error) {}
        },

        // 获取锁仓列表
        async fetchLocks(context: IActionContext<IAssetState>): Promise<void> {
            let commit = context.commit;
            try {
                let locks = await lockService.fetchLocks();
                commit(TYPES.SET_STATES, { locks });
            } catch (error) {}
        }
    }
};
