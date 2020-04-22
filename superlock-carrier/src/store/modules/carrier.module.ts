import TYPES from '@/store/types';
import { IActionContext, ICarrierState } from '@/store/interfaces';
import {
    PageResult,
    WithdrawFormModel,
    ExchangeFormModel,
    ExchangeStatsModel,
    RebateOrderModel,
    FlashOrderModel,
    WithdrawOrderModel
} from '@/ts/models';
import { CarrierService } from '@/ts/services';

const carrierState: ICarrierState = {
    carrierInfo: undefined,
    rate: 0,
    serial: '',
    withdrawForm: new WithdrawFormModel(),

    rebateParameters: {
        conditions: {
            serial: '',
            beginTime: '',
            endTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    flashParameters: {
        conditions: {
            serial: '',
            beginTime: '',
            endTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    withdrawParameters: {
        conditions: {
            serial: '',
            address: '',
            hash: '',
            beginTime: '',
            endTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    totalCount: 0,
    list: []
};

const carrierService = new CarrierService();

export default {
    namespaced: true,
    state: carrierState,
    mutations: {
        [TYPES.SET_STATES](state: ICarrierState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: ICarrierState) {
            state.carrierInfo = undefined;
            state.rate = 0;
            state.serial = '';
            state.withdrawForm = new WithdrawFormModel();

            state.rebateParameters = {
                conditions: {
                    serial: '',
                    beginTime: '',
                    endTime: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.flashParameters = {
                conditions: {
                    serial: '',
                    beginTime: '',
                    endTime: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.withdrawParameters = {
                conditions: {
                    serial: '',
                    address: '',
                    hash: '',
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
        // 获取运营商信息
        async fetchCarrierInfo(context: IActionContext<ICarrierState>): Promise<void> {
            let commit = context.commit;
            try {
                let carrierInfo = await carrierService.fetchCarrierInfo();
                commit(TYPES.SET_STATES, { carrierInfo });
            } catch (error) {
                commit(TYPES.SET_STATES, { carrierInfo: null });
            }
        },

        // 获取兑换汇率
        async fetchRate(context: IActionContext<ICarrierState>): Promise<void> {
            let commit = context.commit;
            try {
                let rate = await carrierService.fetchRate();
                commit(TYPES.SET_STATES, { rate });
            } catch (error) {
                commit(TYPES.SET_STATES, { rate: 0 });
            }
        },

        // 预兑换
        async presetExchange(
            context: IActionContext<ICarrierState>,
            payload: { exchangeForm: ExchangeFormModel; isCode: boolean }
        ): Promise<ExchangeStatsModel | null> {
            return await carrierService.presetExchange(payload.exchangeForm, payload.isCode);
        },

        // 确认兑换
        async confirmExchange(context: IActionContext<ICarrierState>, isCode: boolean = false): Promise<boolean> {
            return await carrierService.confirmExchange(context.state.serial, isCode);
        },

        // 提现
        async withdrawCoin(context: IActionContext<ICarrierState>, isCode: boolean = false): Promise<boolean> {
            return await carrierService.withdrawCoin(context.state.withdrawForm, isCode);
        },

        // 获取返点订单列表
        async fetchRebateOrders(context: IActionContext<ICarrierState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<RebateOrderModel> = await carrierService.fetchRebateOrders(state.rebateParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
            }
        },

        // 导出返点订单列表
        async exportRebateOrders(context: IActionContext<ICarrierState>): Promise<string> {
            return await carrierService.exportRebateOrders(context.state.rebateParameters);
        },

        // 获取闪兑订单列表
        async fetchFlashOrders(context: IActionContext<ICarrierState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<FlashOrderModel> = await carrierService.fetchFlashOrders(state.flashParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
            }
        },

        // 导出闪兑订单列表
        async exportFlashOrders(context: IActionContext<ICarrierState>): Promise<string> {
            return await carrierService.exportFlashOrders(context.state.flashParameters);
        },

        // 获取提现订单列表
        async fetchWithdrawOrders(context: IActionContext<ICarrierState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<WithdrawOrderModel> = await carrierService.fetchWithdrawOrders(state.withdrawParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
            }
        },

        // 导出提现订单列表
        async exportWithdrawOrders(context: IActionContext<ICarrierState>): Promise<string> {
            return await carrierService.exportWithdrawOrders(context.state.withdrawParameters);
        }
    }
};
