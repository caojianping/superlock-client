import { SessionStorage } from 'jts-storage';
import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { IActionContext, ILoanState } from '@/store/interfaces';
import {
    LoanableLockModel,
    LoanInterestModel,
    LoanApplyFormModel,
    LoanRepayFormModel,
    LoanApplyResultModel,
    LoanRepayResultModel
} from '@/ts/models';
import { LoanService } from '@/ts/services';

const loanState: ILoanState = {
    loanFlags: new Map([
        [1, '可质押'],
        [2, '锁仓金额太小，无法质押'],
        [3, '锁仓即将到期，无法质押']
    ]),
    loanStatuses: new Map([
        [0, '审核中'],
        [10, '审核失败'],
        [20, '贷款中'],
        [30, '爆仓'],
        [31, '还款中'],
        [40, '贷款已还清'],
        [50, '已逾期']
    ]),
    loanBaseInfo: undefined,
    loanableQuota: undefined,

    pageNum: 1,
    pageSize: 15,
    loanableLocks: undefined,
    loanableLock: undefined,

    loanInterests: undefined,
    loans: undefined,

    id: '',
    loan: undefined,

    applyForm: new LoanApplyFormModel(),
    applyResult: undefined,

    repayForm: new LoanRepayFormModel(),
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
            state.loanableLock = undefined;

            state.loanInterests = undefined;
            state.loans = undefined;

            state.id = '';
            state.loan = undefined;

            state.applyForm = new LoanApplyFormModel();
            state.applyResult = undefined;

            state.repayForm = new LoanRepayFormModel();
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

        // 获取可贷款额度
        async fetchLoanableQuota(context: IActionContext<ILoanState>): Promise<void> {
            let { commit, state } = context;
            try {
                let loanableQuota = await loanService.fetchLoanableQuota(state.id);
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
                let loan = await loanService.fetchLoan(state.id);
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
                let { id, pageNum, pageSize, loanInterests } = state,
                    data = await loanService.fetchLoanInterests(id, pageNum, pageSize);
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
                applyResult && SessionStorage.setItem<LoanApplyResultModel>(CONSTANTS.LOAN_APPLY_RESULT, applyResult);
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
                repayResult && SessionStorage.setItem<LoanRepayResultModel>(CONSTANTS.LOAN_REPAY_RESULT, repayResult);
                commit(TYPES.SET_STATES, { repayResult });
            } catch (error) {
                commit(TYPES.SET_STATES, { repayResult: null });
            }
        }
    }
};
