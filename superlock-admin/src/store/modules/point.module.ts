import TYPES from '@/store/types';
import { IActionContext, IPointState } from '@/store/interfaces';
import { Prompt } from '@/ts/common';
import {
    PageResult,
    PointRecordModel,
    PointAccountModel,
    PointForm,
    TransferForm,
    TransferInfo,
    PointInfo
} from '@/ts/models';
import { PointService } from '@/ts/services';

const pointState: IPointState = {
    pointParameters: {
        conditions: {
            uid: '',
            beginTime: '',
            endTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    accountParameters: {
        conditions: null,
        pageNum: 1,
        pageSize: 10
    },
    totalCount: 0,
    list: [],

    pointInfos: [],
    transferInfo: new TransferInfo(),

    pointForm: new PointForm(),
    transferForm: new TransferForm()
};

const pointService = new PointService();

export default {
    namespaced: true,
    state: pointState,
    mutations: {
        [TYPES.SET_STATES](state: IPointState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IPointState) {
            state.pointParameters = {
                conditions: {
                    uid: '',
                    beginTime: '',
                    endTime: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.accountParameters = {
                conditions: null,
                pageNum: 1,
                pageSize: 10
            };
            state.totalCount = 0;
            state.list = [];

            state.pointInfos = [];
            state.transferInfo = new TransferInfo();

            state.pointForm = new PointForm();
            state.transferForm = new TransferForm();
        }
    },
    actions: {
        // 获取上分记录分页列表
        async fetchPagePointRecords(
            context: IActionContext<IPointState>
        ): Promise<void> {
            let { commit, state } = context,
                parameters = state.pointParameters;
            try {
                let result: PageResult<PointRecordModel> = await pointService.fetchPagePointRecords(
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

        // 导出上分记录
        async exportPointRecords(
            context: IActionContext<IPointState>
        ): Promise<string> {
            let state = context.state;
            return await pointService.exportPointRecords(state.pointParameters);
        },

        // 获取上分信息
        async fetchPointInfo(
            context: IActionContext<IPointState>
        ): Promise<void> {
            let commit = context.commit;
            try {
                let pointInfos: Array<PointInfo> = await pointService.fetchPointInfo();
                commit(TYPES.SET_STATES, { pointInfos });
            } catch (error) {
                commit(TYPES.SET_STATES, { pointInfos: [] });
                Prompt.error(error.message || error);
            }
        },

        // 设置上分信息
        async setPointInfo(
            context: IActionContext<IPointState>,
            isCode: boolean = false
        ): Promise<boolean> {
            let state = context.state;
            return await pointService.setPointInfo(state.pointForm, isCode);
        },

        // 获取转账信息
        async fetchTransferInfo(
            context: IActionContext<IPointState>
        ): Promise<void> {
            let commit = context.commit;
            try {
                let transferInfo: TransferInfo = await pointService.fetchTransferInfo();
                commit(TYPES.SET_STATES, { transferInfo });
            } catch (error) {
                commit(TYPES.SET_STATES, { transferInfo: new TransferInfo() });
                Prompt.error(error.message || error);
            }
        },

        // 设置转账信息
        async setTransferInfo(
            context: IActionContext<IPointState>,
            isCode: boolean = false
        ): Promise<boolean> {
            let state = context.state;
            return await pointService.setTransferInfo(
                state.transferForm,
                isCode
            );
        },

        // 获取系统账号分页列表
        async fetchPagePointAccounts(
            context: IActionContext<IPointState>
        ): Promise<void> {
            let { commit, state } = context,
                parameters = state.accountParameters;
            try {
                let result: PageResult<PointAccountModel> = await pointService.fetchPagePointAccounts(
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
        }
    }
};
