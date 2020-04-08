import TYPES from '@/store/types';
import { IActionContext, IChildState } from '@/store/interfaces';
import { ChildModel, ChildRateFormModel } from '@/ts/models';
import { ChildService } from '@/ts/services';

const childState: IChildState = {
    lockPromoteRates: [],

    pageNum: 1,
    pageSize: 10,
    childs: undefined,
    child: new ChildModel(),

    defaultRateStats: undefined,
    defaultRateForms: []
};

const childService = new ChildService();

var isPending = false;

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
            state.lockPromoteRates = [];

            state.pageNum = 1;
            state.pageSize = 10;
            state.childs = undefined;
            state.child = new ChildModel();

            state.defaultRateStats = undefined;
            state.defaultRateForms = [];
        }
    },
    actions: {
        // 获取锁仓利率和推广解锁利率
        async fetchLockPromoteRates(
            context: IActionContext<IChildState>
        ): Promise<void> {
            let commit = context.commit;
            try {
                let lockPromoteRates = await childService.fetchLockPromoteRates();
                commit(TYPES.SET_STATES, { lockPromoteRates });
            } catch (error) {
                commit(TYPES.SET_STATES, { lockPromoteRates: [] });
            }
        },

        // 获取下级分页列表
        async fetchChilds(
            context: IActionContext<IChildState>
        ): Promise<Array<ChildModel> | undefined> {
            if (isPending) return undefined;

            isPending = true;
            let { commit, state } = context;
            try {
                let { pageNum, pageSize, childs } = state,
                    data = await childService.fetchChilds(pageNum, pageSize);
                if (pageNum === 1) {
                    commit(TYPES.SET_STATES, {
                        pageNum: pageNum + 1,
                        childs: data
                    });
                } else {
                    commit(TYPES.SET_STATES, {
                        pageNum: pageNum + 1,
                        childs: (childs || []).concat(data)
                    });
                }
                isPending = false;
                return data;
            } catch (error) {
                commit(TYPES.SET_STATES, { childs: [] });
                isPending = false;
                return [];
            }
        },

        // 设置下级备注
        async setChildRemark(
            context: IActionContext<IChildState>,
            remark: string
        ): Promise<boolean> {
            let state = context.state;
            return await childService.setChildRemark(state.child.uid, remark);
        },

        // 设置下级利率
        async setChildRates(
            context: IActionContext<IChildState>,
            childRateForms: Array<ChildRateFormModel>
        ): Promise<boolean> {
            let state = context.state;
            return await childService.setChildRates(
                state.child.uid,
                childRateForms
            );
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
