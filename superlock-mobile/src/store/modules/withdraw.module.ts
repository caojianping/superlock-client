import TYPES from '@/store/types';
import { IActionContext, IWithdrawState } from '@/store/interfaces';
import {
    WithdrawFormModel,
    WithdrawModel,
    WithdrawAddressModel,
    WithdrawQuotaModel
} from '@/ts/models';
import { WithdrawService } from '@/ts/services';

const withdrawState: IWithdrawState = {
    withdrawQuota: new WithdrawQuotaModel(),
    withdrawForm: new WithdrawFormModel(),

    pageNum: 1,
    pageSize: 10,
    withdraws: undefined,
    withdraw: new WithdrawModel(),

    withdrawAddresses: [],
    selectedWithdrawAddress: undefined
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
            state.withdrawQuota = new WithdrawQuotaModel();
            state.withdrawForm = new WithdrawFormModel();

            state.pageNum = 1;
            state.pageSize = 10;
            state.withdraws = undefined;
            state.withdraw = new WithdrawModel();

            state.withdrawAddresses = [];
            state.selectedWithdrawAddress = undefined;
        }
    },
    actions: {
        // 获取提现额度
        async fetchWithdrawQuota(
            context: IActionContext<IWithdrawState>
        ): Promise<void> {
            let commit = context.commit;
            try {
                let withdrawQuota = await withdrawService.fetchWithdrawQuota();
                commit(TYPES.SET_STATES, { withdrawQuota });
            } catch (error) {
                commit(TYPES.SET_STATES, {
                    withdrawQuota: new WithdrawQuotaModel()
                });
            }
        },

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
        ): Promise<Array<WithdrawModel> | undefined> {
            if (isPending) return undefined;

            isPending = true;
            let { commit, state } = context;
            try {
                let { pageNum, pageSize, withdraws } = state,
                    data = await withdrawService.fetchWithdraws(
                        pageNum,
                        pageSize
                    );
                commit(TYPES.SET_STATES, {
                    pageNum: pageNum + 1,
                    withdraws: (withdraws || []).concat(data)
                });
                isPending = false;
                return data;
            } catch (error) {
                commit(TYPES.SET_STATES, { recharges: [] });
                isPending = false;
                return [];
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
            context: IActionContext<IWithdrawState>,
            withdrawAddress: WithdrawAddressModel
        ): Promise<boolean> {
            return await withdrawService.addWithdrawAddress(withdrawAddress);
        }
    }
};
