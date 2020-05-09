import TYPES from '@/store/types';
import { IActionContext, ILogState } from '@/store/interfaces';
import { PageResult, UserLogModel, SystemLogModel } from '@/ts/models';
import { LogService } from '@/ts/services';

const logState: ILogState = {
    userParameters: {
        conditions: {
            uid: '',
            beginTime: '',
            endTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    systemParameters: {
        conditions: {
            userName: '',
            beginTime: '',
            endTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    totalCount: 0,
    list: []
};

const logService = new LogService();

export default {
    namespaced: true,
    state: logState,
    mutations: {
        [TYPES.SET_STATES](state: ILogState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: ILogState) {
            state.userParameters = {
                conditions: {
                    uid: '',
                    beginTime: '',
                    endTime: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.systemParameters = {
                conditions: {
                    userName: '',
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
        // 获取用户日志列表
        async fetchUserLogs(context: IActionContext<ILogState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<UserLogModel> = await logService.fetchUserLogs(state.userParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出用户日志列表
        async exportUserLogs(context: IActionContext<ILogState>): Promise<string> {
            return await logService.exportUserLogs(context.state.userParameters);
        },

        // 获取系统日志列表
        async fetchSystemLogs(context: IActionContext<ILogState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<SystemLogModel> = await logService.fetchSystemLogs(state.systemParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出系统日志列表
        async exportSystemLogs(context: IActionContext<ILogState>): Promise<string> {
            return await logService.exportSystemLogs(context.state.systemParameters);
        }
    }
};
