import TYPES from '@/store/types';
import { IActionContext, IFinanceState } from '@/store/interfaces';
import { ReviewType, ReviewStatus } from '@/ts/config';
import {
    PageResult,
    FinanceInterestModel,
    FinanceDirectModel,
    FinancePromoteModel,
    FinanceSaleModel
} from '@/ts/models';
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
            const { serial, type, status } = payload;
            return await financeService.setReview(serial, type, status);
        },

        // 获取利息支出分页列表
        async fetchPageFinanceInterests(
            context: IActionContext<IFinanceState>
        ): Promise<void> {
            let { commit, state } = context,
                parameters = state.parameters;
            try {
                let result: PageResult<FinanceInterestModel> = await financeService.fetchPageFinanceInterests(
                    parameters
                );
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, {
                    totalCount: 0,
                    list: []
                });
                return Promise.reject(error);
            }
        },

        // 导出利息支出
        async exportFinanceInterests(
            context: IActionContext<IFinanceState>
        ): Promise<string> {
            let state = context.state;
            return await financeService.exportFinanceInterests(
                state.parameters
            );
        },

        // 获取直推奖励分页列表
        async fetchPageFinanceDirects(
            context: IActionContext<IFinanceState>
        ): Promise<void> {
            let { commit, state } = context,
                parameters = state.parameters;
            try {
                let result: PageResult<FinanceDirectModel> = await financeService.fetchPageFinanceDirects(
                    parameters
                );
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, {
                    totalCount: 0,
                    list: []
                });
                return Promise.reject(error);
            }
        },

        // 导出直推奖励
        async exportFinanceDirects(
            context: IActionContext<IFinanceState>
        ): Promise<string> {
            let state = context.state;
            return await financeService.exportFinanceDirects(state.parameters);
        },

        // 获取推广奖励分页列表
        async fetchPageFinancePromotes(
            context: IActionContext<IFinanceState>
        ): Promise<void> {
            let { commit, state } = context,
                parameters = state.parameters;
            try {
                let result: PageResult<FinancePromoteModel> = await financeService.fetchPageFinancePromotes(
                    parameters
                );
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, {
                    totalCount: 0,
                    list: []
                });
                return Promise.reject(error);
            }
        },

        // 导出推广奖励
        async exportFinancePromotes(
            context: IActionContext<IFinanceState>
        ): Promise<string> {
            let state = context.state;
            return await financeService.exportFinancePromotes(state.parameters);
        },

        // 获取日销奖励分页列表
        async fetchPageFinanceSales(
            context: IActionContext<IFinanceState>
        ): Promise<void> {
            let { commit, state } = context,
                parameters = state.parameters;
            try {
                let result: PageResult<FinanceSaleModel> = await financeService.fetchPageFinanceSales(
                    parameters
                );
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, {
                    totalCount: 0,
                    list: []
                });
                return Promise.reject(error);
            }
        },

        // 导出日销奖励
        async exportFinanceSales(
            context: IActionContext<IFinanceState>
        ): Promise<string> {
            let state = context.state;
            return await financeService.exportFinanceSales(state.parameters);
        }
    }
};
