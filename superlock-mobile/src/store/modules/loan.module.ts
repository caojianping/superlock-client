import TYPES from '@/store/types';
import { IActionContext, ILoanState } from '@/store/interfaces';
import { LoanableLockModel, LoanInterestModel, ApplyFormModel, RepayFormModel } from '@/ts/models';
import { LoanService } from '@/ts/services';

const loanState: ILoanState = {
    loanBaseInfo: undefined,
    loanableQuota: undefined,

    pageNum: 1,
    pageSize: 15,
    loanableLocks: undefined,
    loanInterests: undefined,
    loans: undefined,

    orderId: '',
    lockOrderId: '',
    loan: undefined,

    applyForm: new ApplyFormModel(),
    applyResult: undefined,

    repayForm: new RepayFormModel(),
    repayResult: undefined
};

const loanService = new LoanService();

var isPending = false;

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
            state.loanBaseInfo = undefined;
            state.loanableQuota = undefined;

            state.pageNum = 1;
            state.pageSize = 15;
            state.loanableLocks = undefined;
            state.loanInterests = undefined;
            state.loans = undefined;

            state.orderId = '';
            state.lockOrderId = '';
            state.loan = undefined;

            state.applyForm = new ApplyFormModel();
            state.applyResult = undefined;

            state.repayForm = new RepayFormModel();
            state.repayResult = undefined;
        }
    },
    actions: {
        // 获取贷款基础信息
        async fetchLoanBaseInfo(context: IActionContext<ILoanState>): Promise<void> {
            let commit = context.commit;
            try {
                let loanBaseInfo = await loanService.fetchLoanBaseInfo();
                commit(TYPES.SET_STATES, { loanBaseInfo });
            } catch (error) {
                commit(TYPES.SET_STATES, { lockPromoteRates: null });
            }
        },

        // 获取贷款基础信息
        async fetchLoanableQuota(context: IActionContext<ILoanState>): Promise<void> {
            let { commit, state } = context;
            try {
                let loanableQuota = await loanService.fetchLoanableQuota(state.orderId);
                commit(TYPES.SET_STATES, { loanableQuota });
            } catch (error) {
                commit(TYPES.SET_STATES, { loanableQuota: null });
            }
        },

        // 获取可贷款的锁仓列表
        async fetchLoanableLocks(context: IActionContext<ILoanState>): Promise<Array<LoanableLockModel> | undefined> {
            if (isPending) return undefined;

            isPending = true;
            let { commit, state } = context;
            try {
                let { pageNum, pageSize, loanableLocks } = state,
                    data = await loanService.fetchLoanableLocks(pageNum, pageSize);
                if (pageNum === 1) {
                    commit(TYPES.SET_STATES, {
                        pageNum: pageNum + 1,
                        loanableLocks: data
                    });
                } else {
                    commit(TYPES.SET_STATES, {
                        pageNum: pageNum + 1,
                        loanableLocks: (loanableLocks || []).concat(data)
                    });
                }
                isPending = false;
                return data;
            } catch (error) {
                commit(TYPES.SET_STATES, { loanableLocks: [] });
                isPending = false;
                return [];
            }
        },

        // 获取贷款列表
        async fetchLoans(context: IActionContext<ILoanState>): Promise<void> {
            let commit = context.commit;
            try {
                let loans = await loanService.fetchLoans();
                commit(TYPES.SET_STATES, { loans });
            } catch (error) {
                commit(TYPES.SET_STATES, { loans: [] });
            }
        },

        // 获取贷款详情
        async fetchLoan(context: IActionContext<ILoanState>): Promise<void> {
            let { commit, state } = context;
            try {
                let loan = await loanService.fetchLoan(state.lockOrderId);
                commit(TYPES.SET_STATES, { loan });
            } catch (error) {
                commit(TYPES.SET_STATES, { loan: null });
            }
        },

        // 获取可贷款的锁仓列表
        async fetchLoanInterests(context: IActionContext<ILoanState>): Promise<Array<LoanInterestModel> | undefined> {
            if (isPending) return undefined;

            isPending = true;
            let { commit, state } = context;
            try {
                let { orderId, pageNum, pageSize, loanInterests } = state,
                    data = await loanService.fetchLoanInterests(orderId, pageNum, pageSize);
                if (pageNum === 1) {
                    commit(TYPES.SET_STATES, {
                        pageNum: pageNum + 1,
                        loanInterests: data
                    });
                } else {
                    commit(TYPES.SET_STATES, {
                        pageNum: pageNum + 1,
                        loanInterests: (loanInterests || []).concat(data)
                    });
                }
                isPending = false;
                return data;
            } catch (error) {
                commit(TYPES.SET_STATES, { loanInterests: [] });
                isPending = false;
                return [];
            }
        },

        // 申请贷款
        async applyLoan(context: IActionContext<ILoanState>): Promise<void> {
            let { commit, state } = context;
            try {
                let applyResult = await loanService.applyLoan(state.applyForm);
                commit(TYPES.SET_STATES, { applyResult });
            } catch (error) {
                commit(TYPES.SET_STATES, { applyResult: null });
            }
        },

        // 偿还贷款
        async repayLoan(context: IActionContext<ILoanState>): Promise<void> {
            let { commit, state } = context;
            try {
                let repayResult = await loanService.repayLoan(state.repayForm);
                commit(TYPES.SET_STATES, { repayResult });
            } catch (error) {
                commit(TYPES.SET_STATES, { repayResult: null });
            }
        }
    }
};
