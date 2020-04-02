import TYPES from '@/store/types';
import { IActionContext, IChildState } from '@/store/interfaces';
import { ChildService } from '@/ts/services';

const childState: IChildState = {
    childs: undefined,
    rates: [],

    defaultRateStats: undefined,
    defaultRateForms: []
};

const childService = new ChildService();

export default {
    namespaced: true,
    state: childState,
    mutations: {
        [TYPES.SET_STATES](state: IChildState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IChildState) {
            state.childs = undefined;
            state.rates = [];

            state.defaultRateStats = undefined;
            state.defaultRateForms = [];
        }
    },
    actions: {
        // 获取下级列表
        async fetchChilds(context: IActionContext<IChildState>): Promise<void> {
            let commit = context.commit;
            try {
                let childs = await childService.fetchChilds();
                commit(TYPES.SET_STATES, { childs });
            } catch (error) {
                commit(TYPES.SET_STATES, { childs: [] });
            }
        },

        // 设置下级利率
        async setChildRates(
            context: IActionContext<IChildState>
        ): Promise<boolean> {
            let state = context.state;
            return await childService.setChildRates(state.rates);
        },

        // 获取默认利率统计信息
        async fetchDefaultRateStats(
            context: IActionContext<IChildState>
        ): Promise<void> {
            let commit = context.commit;
            try {
                let defaultRateStats = await childService.fetchDefaultRateStats();
                commit(TYPES.SET_STATES, { defaultRateStats });
            } catch (error) {
                commit(TYPES.SET_STATES, { defaultRateStats: null });
            }
        },

        // 设置默认利率
        async setDefaultRates(
            context: IActionContext<IChildState>
        ): Promise<boolean> {
            let state = context.state;
            return await childService.setDefaultRates(state.defaultRateForms);
        }
    }
};
