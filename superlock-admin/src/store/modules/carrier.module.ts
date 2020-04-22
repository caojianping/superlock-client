import TYPES from '@/store/types';
import { CarrierFormType, OperationType } from '@/ts/config';
import { IActionContext, ICarrierState } from '@/store/interfaces';
import { PageResult, CarrierFormModel, CarrierModel, RebateOrderModel, FlashOrderModel, WithdrawOrderModel } from '@/ts/models';
import { CarrierService } from '@/ts/services';

const carrierState: ICarrierState = {
    cycleOptions: [
        { label: '1周', value: '1_周' },
        { label: '2周', value: '2_周' },
        { label: '3周', value: '3_周' },
        { label: '1个月', value: '1_月' },
        { label: '3个月', value: '3_月' },
        { label: '6个月', value: '6_月' }
    ],

    operationType: OperationType.Add,
    formType: CarrierFormType.CarrierForm,
    carrierForm: new CarrierFormModel(),
    carrier: undefined,

    carrierParameters: {
        conditions: {
            carrierName: '',
            mobile: '',
            email: '',
            beginTime: '',
            endTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    rebateParameters: {
        conditions: {
            carrierName: '',
            beginTime: '',
            endTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    flashParameters: {
        conditions: {
            serial: '',
            carrierName: '',
            status: '',
            beginTime: '',
            endTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    withdrawParameters: {
        conditions: {
            serial: '',
            carrierName: '',
            status: '',
            address: '',
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
            state.operationType = OperationType.Add;
            state.formType = CarrierFormType.CarrierForm;
            state.carrierForm = new CarrierFormModel();

            state.carrierParameters = {
                conditions: {
                    carrierName: '',
                    mobile: '',
                    email: '',
                    beginTime: '',
                    endTime: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.rebateParameters = {
                conditions: {
                    carrierName: '',
                    beginTime: '',
                    endTime: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.flashParameters = {
                conditions: {
                    serial: '',
                    carrierName: '',
                    status: '',
                    beginTime: '',
                    endTime: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.withdrawParameters = {
                conditions: {
                    serial: '',
                    carrierName: '',
                    status: '',
                    address: '',
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
        // 获取运营商列表
        async fetchCarriers(context: IActionContext<ICarrierState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<CarrierModel> = await carrierService.fetchCarriers(state.carrierParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出运营商列表
        async exportCarriers(context: IActionContext<ICarrierState>): Promise<string> {
            return await carrierService.exportCarriers(context.state.carrierParameters);
        },

        // 添加运营商
        async addCarrier(context: IActionContext<ICarrierState>, isCode: boolean = false): Promise<boolean> {
            return await carrierService.addCarrier(context.state.carrierForm, isCode);
        },

        // 更新运营商
        async updateCarrier(context: IActionContext<ICarrierState>, isCode: boolean = false): Promise<boolean> {
            let { formType, carrierForm } = context.state;
            return await carrierService.updateCarrier(formType, carrierForm, isCode);
        },

        // 获取返点订单列表
        async fetchRebateOrders(context: IActionContext<ICarrierState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<RebateOrderModel> = await carrierService.fetchRebateOrders(state.rebateParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
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
                return Promise.reject(error);
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
                return Promise.reject(error);
            }
        },

        // 导出提现订单列表
        async exportWithdrawOrders(context: IActionContext<ICarrierState>): Promise<string> {
            return await carrierService.exportWithdrawOrders(context.state.withdrawParameters);
        }
    }
};
