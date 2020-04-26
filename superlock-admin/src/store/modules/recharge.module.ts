import TYPES from '@/store/types';
import { IActionContext, IRechargeState } from '@/store/interfaces';
import { PageResult, RechargeModel, RechargePoundageModel, RechargeAddressModel } from '@/ts/models';
import { RechargeService } from '@/ts/services';

const rechargeState: IRechargeState = {
    rechargeParameters: {
        conditions: {
            serial: '',
            uid: '',
            hash: '',
            coinCode: '',
            address: '',
            beginTime: '',
            endTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    addressParameters: {
        conditions: {
            uid: '',
            coinCode: '',
            address: '',
            mobile: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    totalCount: 0,
    list: [],

    poundage: new RechargePoundageModel()
};

const rechargeService = new RechargeService();

export default {
    namespaced: true,
    state: rechargeState,
    mutations: {
        [TYPES.SET_STATES](state: IRechargeState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IRechargeState) {
            state.rechargeParameters = {
                conditions: {
                    serial: '',
                    uid: '',
                    hash: '',
                    coinCode: '',
                    address: '',
                    beginTime: '',
                    endTime: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.addressParameters = {
                conditions: {
                    uid: '',
                    coinCode: '',
                    address: '',
                    mobile: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.totalCount = 0;
            state.list = [];
            state.poundage = new RechargePoundageModel();
        }
    },
    actions: {
        // 获取充值列表
        async fetchRecharges(context: IActionContext<IRechargeState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<RechargeModel> = await rechargeService.fetchRecharges(state.rechargeParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出充值列表
        async exportRecharges(context: IActionContext<IRechargeState>): Promise<string> {
            return await rechargeService.exportRecharges(context.state.rechargeParameters);
        },

        // 获取手续费设置列表
        async fetchRechargePoundages(context: IActionContext<IRechargeState>): Promise<void> {
            let commit = context.commit;
            try {
                let list = await rechargeService.fetchRechargePoundages();
                commit(TYPES.SET_STATES, { list: list });
            } catch (error) {
                commit(TYPES.SET_STATES, { list: [] });
                return Promise.reject(error);
            }
        },

        // 添加手续费设置
        async addRechargePoundage(context: IActionContext<IRechargeState>, isCode: boolean = false): Promise<boolean> {
            return await rechargeService.addRechargePoundage(context.state.poundage, isCode);
        },

        // 更新手续费设置
        async updateRechargePoundage(context: IActionContext<IRechargeState>, isCode: boolean = false): Promise<boolean> {
            return await rechargeService.updateRechargePoundage(context.state.poundage, isCode);
        },

        // 获取充值地址列表
        async fetchRechargeAddresses(context: IActionContext<IRechargeState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<RechargeAddressModel> = await rechargeService.fetchRechargeAddresses(state.addressParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出充值地址列表
        async exportRechargeAddresses(context: IActionContext<IRechargeState>): Promise<string> {
            return await rechargeService.exportRechargeAddresses(context.state.addressParameters);
        }
    }
};
