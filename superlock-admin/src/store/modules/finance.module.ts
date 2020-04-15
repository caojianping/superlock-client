import TYPES from '@/store/types';
import { IActionContext, IFinanceState } from '@/store/interfaces';
import { ReviewType, ReviewStatus } from '@/ts/config';
import { PageResult, FinanceInterestModel, FinanceDirectModel, FinancePromoteModel, FinanceSaleModel } from '@/ts/models';
import { FinanceService } from '@/ts/services';

const financeState: IFinanceState = {
    parameters: {
        conditions: {
            serial: '',
            uid: '',
            beginDate: '',
            endDate: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    totalCount: 0,
    list: []
};

const financeService = new FinanceService();

export default {
    namespaced: true,
    state: financeState,
    mutations: {
        [TYPES.SET_STATES](state: IFinanceState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IFinanceState) {
            state.parameters = {
                conditions: {
                    serial: '',
                    uid: '',
                    beginDate: '',
                    endDate: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.totalCount = 0;
            state.list = [];
        }
    },
    actions: {
        // 设置审查操作
        async setReview(
            context: IActionContext<IFinanceState>,
            payload: { serial: string; type: ReviewType; status: ReviewStatus }
        ): Promise<boolean> {
            return await financeService.setReview(payload.serial, payload.type, payload.status);
        },

        // 获取利息支出列表
        async fetchFinanceInterests(context: IActionContext<IFinanceState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<FinanceInterestModel> = await financeService.fetchFinanceInterests(state.parameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出利息支出列表
        async exportFinanceInterests(context: IActionContext<IFinanceState>): Promise<string> {
            return await financeService.exportFinanceInterests(context.state.parameters);
        },

        // 获取直推奖励列表
        async fetchFinanceDirects(context: IActionContext<IFinanceState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<FinanceDirectModel> = await financeService.fetchFinanceDirects(state.parameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出直推奖励列表
        async exportFinanceDirects(context: IActionContext<IFinanceState>): Promise<string> {
            return await financeService.exportFinanceDirects(context.state.parameters);
        },

        // 获取推广奖励列表
        async fetchFinancePromotes(context: IActionContext<IFinanceState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<FinancePromoteModel> = await financeService.fetchFinancePromotes(state.parameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出推广奖励列表
        async exportFinancePromotes(context: IActionContext<IFinanceState>): Promise<string> {
            return await financeService.exportFinancePromotes(context.state.parameters);
        },

        // 获取日销奖励列表
        async fetchFinanceSales(context: IActionContext<IFinanceState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<FinanceSaleModel> = await financeService.fetchFinanceSales(state.parameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出日销奖励列表
        async exportFinanceSales(context: IActionContext<IFinanceState>): Promise<string> {
            return await financeService.exportFinanceSales(context.state.parameters);
        }
    }
};
