import TYPES from '@/store/types';
import { IActionContext, ILoanState } from '@/store/interfaces';
import {
    PageResult,
    LoanRecordModel,
    LoanInterestModel,
    LoanForm
} from '@/ts/models';
import { LoanService } from '@/ts/services';

const loanState: ILoanState = {
    statusOptions: [],

    recordParameters: {
        conditions: {},
        pageNum: 1,
        pageSize: 10
    },
    interestParameters: {
        conditions: {},
        pageNum: 1,
        pageSize: 10
    },
    totalCount: 0,
    list: [],

    loanForm: new LoanForm()
};

const loanService = new LoanService();

export default {
    namespaced: true,
    state: loanState,
    mutations: {
        [TYPES.SET_STATES](state: ILoanState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: ILoanState) {
            state.recordParameters = {
                conditions: {},
                pageNum: 1,
                pageSize: 10
            };
            state.interestParameters = {
                conditions: {},
                pageNum: 1,
                pageSize: 10
            };
            state.totalCount = 0;
            state.list = [];
            state.loanForm = new LoanForm();
        }
    },
    actions: {
        // 获取贷款记录分页列表
        async fetchPageLoanRecords(
            context: IActionContext<ILoanState>
        ): Promise<void> {
            let { commit, state } = context,
                parameters = state.recordParameters;
            try {
                let result: PageResult<LoanRecordModel> = await loanService.fetchPageLoanRecords(
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

        // 获取贷款计息分页列表
        async fetchPageLoanInterests(
            context: IActionContext<ILoanState>
        ): Promise<void> {
            let { commit, state } = context,
                parameters = state.interestParameters;
            try {
                let result: PageResult<LoanInterestModel> = await loanService.fetchPageLoanInterests(
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

        // 设置贷款
        async setLoan(context: IActionContext<ILoanState>): Promise<boolean> {
            let state = context.state;
            return await loanService.setLoan(state.loanForm);
        }
    }
};
