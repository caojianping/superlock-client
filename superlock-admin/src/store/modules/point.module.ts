import TYPES from '@/store/types';
import { IActionContext, IPointState } from '@/store/interfaces';
import { Prompt } from '@/ts/common';
import { PageResult, PointModel, PointAccountModel, PointFormModel, TransferFormModel, TransferInfoModel, PointInfoModel } from '@/ts/models';
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
    transferInfo: new TransferInfoModel(),

    pointForm: new PointFormModel(),
    transferForm: new TransferFormModel()
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
            state.transferInfo = new TransferInfoModel();

            state.pointForm = new PointFormModel();
            state.transferForm = new TransferFormModel();
        }
    },
    actions: {
        // 获取上分列表
        async fetchPoints(context: IActionContext<IPointState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<PointModel> = await pointService.fetchPoints(state.pointParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出上分列表
        async exportPoints(context: IActionContext<IPointState>): Promise<string> {
            return await pointService.exportPoints(context.state.pointParameters);
        },

        // 获取上分信息
        async fetchPointInfo(context: IActionContext<IPointState>): Promise<void> {
            let commit = context.commit;
            try {
                let pointInfos: Array<PointInfoModel> = await pointService.fetchPointInfo();
                commit(TYPES.SET_STATES, { pointInfos });
            } catch (error) {
                commit(TYPES.SET_STATES, { pointInfos: [] });
                Prompt.error(error.message || error);
            }
        },

        // 设置上分信息
        async setPointInfo(context: IActionContext<IPointState>, isCode: boolean = false): Promise<boolean> {
            return await pointService.setPointInfo(context.state.pointForm, isCode);
        },

        // 获取转账信息
        async fetchTransferInfo(context: IActionContext<IPointState>): Promise<void> {
            let commit = context.commit;
            try {
                let transferInfo: TransferInfoModel = await pointService.fetchTransferInfo();
                commit(TYPES.SET_STATES, { transferInfo });
            } catch (error) {
                commit(TYPES.SET_STATES, { transferInfo: new TransferInfoModel() });
                Prompt.error(error.message || error);
            }
        },

        // 设置转账信息
        async setTransferInfo(context: IActionContext<IPointState>, isCode: boolean = false): Promise<boolean> {
            return await pointService.setTransferInfo(context.state.transferForm, isCode);
        },

        // 获取系统账号分页列表
        async fetchPointAccounts(context: IActionContext<IPointState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<PointAccountModel> = await pointService.fetchPointAccounts(state.accountParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        }
    }
};
