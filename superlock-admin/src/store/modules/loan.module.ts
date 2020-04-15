import TYPES from '@/store/types';
import { IActionContext, ILoanState } from '@/store/interfaces';
import { PageResult, LoanModel, LoanInterestModel, LoanFormModel } from '@/ts/models';
import { LoanService } from '@/ts/services';

const loanState: ILoanState = {
    statusOptions: [],

    loanParameters: {
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

    loanForm: new LoanFormModel()
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
            state.loanParameters = {
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
            state.loanForm = new LoanFormModel();
        }
    },
    actions: {
        // 获取贷款列表
        async fetchLoans(context: IActionContext<ILoanState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<LoanModel> = await loanService.fetchLoans(state.loanParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 获取贷款计息列表
        async fetchLoanInterests(context: IActionContext<ILoanState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<LoanInterestModel> = await loanService.fetchLoanInterests(state.interestParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 设置贷款
        async setLoan(context: IActionContext<ILoanState>): Promise<boolean> {
            return await loanService.setLoan(context.state.loanForm);
        }
    }
};
