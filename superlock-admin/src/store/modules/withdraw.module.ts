import TYPES from '@/store/types';
import { IActionContext, IWithdrawState } from '@/store/interfaces';
import { ReviewStatus, ReviewType } from '@/ts/config';
import {
    PageResult,
    WithdrawRecordModel,
    WithdrawTransferModel
} from '@/ts/models';
import { WithdrawService, FinanceService } from '@/ts/services';

const withdrawState: IWithdrawState = {
    statusOptions: [
        { label: '全部', value: '' },
        { label: '未提现', value: '0' },
        { label: '提现中', value: '10' },
        { label: '提现成功', value: '20' },
        { label: '提现失败', value: '30' }
    ],
    recordParameters: {
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
            state.recordParameters = {
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
        async setReview(
            context: IActionContext<IWithdrawState>,
            payload: { serial: string; status: ReviewStatus }
        ): Promise<boolean> {
            const { serial, status } = payload;
            return await financeService.setReview(
                serial,
                ReviewType.Withdraw,
                status
            );
        },

        // 获取提现记录分页列表
        async fetchPageWithdrawRecords(
            context: IActionContext<IWithdrawState>
        ): Promise<void> {
            let { commit, state } = context,
                parameters = state.recordParameters;
            try {
                let result: PageResult<WithdrawRecordModel> = await withdrawService.fetchPageWithdrawRecords(
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

        // 导出提现记录
        async exportWithdrawRecords(
            context: IActionContext<IWithdrawState>
        ): Promise<string> {
            let state = context.state;
            return await withdrawService.exportWithdrawRecords(
                state.recordParameters
            );
        },

        // 获取转账记录分页列表
        async fetchPageWithdrawTransfers(
            context: IActionContext<IWithdrawState>
        ): Promise<void> {
            let { commit, state } = context,
                parameters = state.transferParameters;
            try {
                let result: PageResult<WithdrawTransferModel> = await withdrawService.fetchPageWithdrawTransfers(
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

        // 导出转账记录
        async exportWithdrawTransfers(
            context: IActionContext<IWithdrawState>
        ): Promise<string> {
            let state = context.state;
            return await withdrawService.exportWithdrawTransfers(
                state.transferParameters
            );
        }
    }
};
