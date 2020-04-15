import TYPES from '@/store/types';
import { IActionContext, IWithdrawState } from '@/store/interfaces';
import { ReviewStatus, ReviewType } from '@/ts/config';
import { PageResult, WithdrawModel, TransferModel } from '@/ts/models';
import { WithdrawService, FinanceService } from '@/ts/services';

const withdrawState: IWithdrawState = {
    withdrawParameters: {
        conditions: {
            uid: '',
            serial: '',
            status: '',
            createBeginTime: '',
            createEndTime: '',
            finishBeginTime: '',
            finishEndTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    transferParameters: {
        conditions: {
            serial: '',
            from: '',
            to: '',
            beginTime: '',
            endTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    totalCount: 0,
    list: []
};

const withdrawService = new WithdrawService();
const financeService = new FinanceService();

export default {
    namespaced: true,
    state: withdrawState,
    mutations: {
        [TYPES.SET_STATES](state: IWithdrawState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IWithdrawState) {
            state.withdrawParameters = {
                conditions: {
                    uid: '',
                    serial: '',
                    status: '',
                    createBeginTime: '',
                    createEndTime: '',
                    finishBeginTime: '',
                    finishEndTime: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.transferParameters = {
                conditions: {
                    serial: '',
                    from: '',
                    to: '',
                    beginTime: '',
                    endTime: ''
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
        async setReview(context: IActionContext<IWithdrawState>, payload: { serial: string; status: ReviewStatus }): Promise<boolean> {
            return await financeService.setReview(payload.serial, ReviewType.Withdraw, payload.status);
        },

        // 获取提现列表
        async fetchWithdraws(context: IActionContext<IWithdrawState>): Promise<void> {
            let { commit, state } = context,
                parameters = state.withdrawParameters;
            try {
                let result: PageResult<WithdrawModel> = await withdrawService.fetchWithdraws(parameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出提现列表
        async exportWithdraws(context: IActionContext<IWithdrawState>): Promise<string> {
            return await withdrawService.exportWithdraws(context.state.withdrawParameters);
        },

        // 获取转账列表
        async fetchTransfers(context: IActionContext<IWithdrawState>): Promise<void> {
            let { commit, state } = context,
                parameters = state.transferParameters;
            try {
                let result: PageResult<TransferModel> = await withdrawService.fetchTransfers(parameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出转账列表
        async exportTransfers(context: IActionContext<IWithdrawState>): Promise<string> {
            return await withdrawService.exportTransfers(context.state.transferParameters);
        }
    }
};
