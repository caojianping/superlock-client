import TYPES from '@/store/types';
import { IActionContext, IReportState } from '@/store/interfaces';
import { ReportType } from '@/ts/config';
import { PageResult, RechargeReportModel, LockReportModel, ExpendReportModel, UserReportModel, WithdrawReportModel } from '@/ts/models';
import { LockService, ReportService } from '@/ts/services';

const reportState: IReportState = {
    reportType: ReportType.RechargeReport,
    cycleOptions: [],
    expendTypeOptions: [
        { label: '全部', value: '' },
        { label: '利息支出', value: '利息支出' },
        { label: '直推奖励', value: '直推奖励' },
        { label: '推广奖励', value: '推广奖励' },
        { label: '日销奖励', value: '日销奖励' }
    ],
    userTypeOptions: [
        { label: '全部', value: '' },
        { label: '券商', value: '券商' },
        { label: '代理', value: '代理' }
    ],

    rechargeParameters: {
        conditions: {
            coinCode: '',
            beginTime: '',
            endTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    withdrawParameters: {
        conditions: {
            beginTime: '',
            endTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    lockParameters: {
        conditions: {
            length: '',
            unit: '',
            beginTime: '',
            endTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    expendParameters: {
        conditions: {
            type: '',
            beginTime: '',
            endTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    userParameters: {
        conditions: {
            type: '',
            beginTime: '',
            endTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    totalCount: 0,
    list: []
};

const lockService = new LockService();
const reportService = new ReportService();

export default {
    namespaced: true,
    state: reportState,
    mutations: {
        [TYPES.SET_STATES](state: IReportState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IReportState) {
            state.reportType = ReportType.RechargeReport;
            state.cycleOptions = [];

            state.rechargeParameters = {
                conditions: {
                    coinCode: '',
                    beginTime: '',
                    endTime: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.withdrawParameters = {
                conditions: {
                    beginTime: '',
                    endTime: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.lockParameters = {
                conditions: {
                    length: '',
                    unit: '',
                    beginTime: '',
                    endTime: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.expendParameters = {
                conditions: {
                    type: '',
                    beginTime: '',
                    endTime: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.userParameters = {
                conditions: {
                    type: '',
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
        // 获取锁仓期限列表
        async fetchLockCycles(context: IActionContext<IReportState>): Promise<void> {
            let commit = context.commit;
            try {
                let lockCycles = await lockService.fetchLockCycles();
                commit(TYPES.SET_STATES, { cycleOptions: lockCycles });
            } catch (error) {
                commit(TYPES.SET_STATES, { cycleOptions: [] });
                return Promise.reject(error);
            }
        },

        // 获取充值报表列表
        async fetchRechargeReports(context: IActionContext<IReportState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<RechargeReportModel> = await reportService.fetchRechargeReports(state.rechargeParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出充值报表列表
        async exportRechargeReports(context: IActionContext<IReportState>): Promise<string> {
            return await reportService.exportRechargeReports(context.state.rechargeParameters);
        },

        // 获取提现报表列表
        async fetchWithdrawReports(context: IActionContext<IReportState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<WithdrawReportModel> = await reportService.fetchWithdrawReports(state.withdrawParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出提现报表列表
        async exportWithdrawReports(context: IActionContext<IReportState>): Promise<string> {
            return await reportService.exportWithdrawReports(context.state.withdrawParameters);
        },

        // 获取锁仓报表列表
        async fetchLockReports(context: IActionContext<IReportState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<LockReportModel> = await reportService.fetchLockReports(state.lockParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出锁仓报表列表
        async exportLockReports(context: IActionContext<IReportState>): Promise<string> {
            return await reportService.exportLockReports(context.state.lockParameters);
        },

        // 获取支出报表列表
        async fetchExpendReports(context: IActionContext<IReportState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<ExpendReportModel> = await reportService.fetchExpendReports(state.expendParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出锁支出报表列表
        async exportExpendReports(context: IActionContext<IReportState>): Promise<string> {
            return await reportService.exportExpendReports(context.state.expendParameters);
        },

        // 获取用户报表列表
        async fetchUserReports(context: IActionContext<IReportState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<UserReportModel> = await reportService.fetchUserReports(state.userParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出用户报表列表
        async exportUserReports(context: IActionContext<IReportState>): Promise<string> {
            return await reportService.exportUserReports(context.state.userParameters);
        }
    }
};
