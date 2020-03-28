import TYPES from '@/store/types';
import { IActionContext, IWithdrawState } from '@/store/interfaces';
import {
    WithdrawFormModel,
    WithdrawModel,
    WithdrawAddressModel
} from '@/ts/models';
import { WithdrawService } from '@/ts/services';

const withdrawState: IWithdrawState = {
    withdrawForm: new WithdrawFormModel(),

    pageNum: 1,
    pageSize: 10,
    withdraws: [],
    withdraw: new WithdrawModel(),

    withdrawAddresses: [],
    selectedWithdrawAddress: undefined,
    withdrawAddress: new WithdrawAddressModel()
};

const withdrawService = new WithdrawService();

var isPending = false;

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
            state.withdrawForm = new WithdrawFormModel();

            state.pageNum = 1;
            state.pageSize = 10;
            state.withdraws = [];
            state.withdraw = new WithdrawModel();

            state.withdrawAddresses = [];
            state.selectedWithdrawAddress = undefined;
            state.withdrawAddress = new WithdrawAddressModel();
        }
    },
    actions: {
        // 执行提现
        async executeWithdraw(
            context: IActionContext<IWithdrawState>
        ): Promise<boolean> {
            let state = context.state;
            return await withdrawService.executeWithdraw(state.withdrawForm);
        },

        // 获取提现列表
        async fetchWithdraws(
            context: IActionContext<IWithdrawState>
        ): Promise<void> {
            let commit = context.commit;
            try {
                let withdraws = await withdrawService.fetchWithdraws();
                commit(TYPES.SET_STATES, { withdraws });
            } catch (error) {
                commit(TYPES.SET_STATES, { withdraws: [] });
            }
        },

        // 获取提现地址列表
        async fetchWithdrawAddresses(
            context: IActionContext<IWithdrawState>
        ): Promise<void> {
            let commit = context.commit;
            try {
                let withdrawAddresses = await withdrawService.fetchWithdrawAddresses();
                commit(TYPES.SET_STATES, { withdrawAddresses });
            } catch (error) {
                commit(TYPES.SET_STATES, { withdrawAddresses: [] });
            }
        },

        // 添加提现地址
        async addWithdrawAddress(
            context: IActionContext<IWithdrawState>
        ): Promise<boolean> {
            let state = context.state;
            return await withdrawService.addWithdrawAddress(
                state.withdrawAddress
            );
        }
    }
};
