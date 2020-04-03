import TYPES from '@/store/types';
import { IActionContext, IProjectState } from '@/store/interfaces';
import { ProjectService } from '@/ts/services';

const projectState: IProjectState = {
    projectStats: undefined,
    assetStats: undefined,
    earningsStats: undefined,
    promoteRewardStats: undefined
};

const projectService = new ProjectService();

export default {
    namespaced: true,
    state: projectState,
    mutations: {
        [TYPES.SET_STATES](state: IProjectState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IProjectState) {
            state.projectStats = undefined;
            state.assetStats = undefined;
            state.earningsStats = undefined;
            state.promoteRewardStats = undefined;
        }
    },
    actions: {
        // 获取资产统计信息
        async fetchProjectStats(
            context: IActionContext<IProjectState>
        ): Promise<void> {
            let commit = context.commit;
            try {
                let projectStats = await projectService.fetchProjectStats();
                commit(TYPES.SET_STATES, { projectStats });
            } catch (error) {
                commit(TYPES.SET_STATES, { projectStats: null });
            }
        },

        // 获取资产统计信息
        async fetchAssetStats(
            context: IActionContext<IProjectState>
        ): Promise<void> {
            let commit = context.commit;
            try {
                let assetStats = await projectService.fetchAssetStats();
                commit(TYPES.SET_STATES, { assetStats });
            } catch (error) {
                commit(TYPES.SET_STATES, { assetStats: null });
            }
        },

        // 获取收益统计信息
        async fetchEarningsStats(
            context: IActionContext<IProjectState>
        ): Promise<void> {
            let commit = context.commit;
            try {
                let earningsStats = await projectService.fetchEarningsStats();
                commit(TYPES.SET_STATES, { earningsStats });
            } catch (error) {
                commit(TYPES.SET_STATES, { earningsStats: null });
            }
        },

        // 获取推广奖励统计信息
        async fetchPromoteRewardStats(
            context: IActionContext<IProjectState>
        ): Promise<void> {
            let commit = context.commit;
            try {
                let promoteRewardStats = await projectService.fetchPromoteRewardStats();
                commit(TYPES.SET_STATES, { promoteRewardStats });
            } catch (error) {
                commit(TYPES.SET_STATES, { promoteRewardStats: null });
            }
        }
    }
};
