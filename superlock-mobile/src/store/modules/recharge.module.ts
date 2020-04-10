import TYPES from '@/store/types';
import { IActionContext, IRechargeState } from '@/store/interfaces';
import { RechargeModel } from '@/ts/models';
import { RechargeService } from '@/ts/services';

const rechargeState: IRechargeState = {
    rechargeCoins: undefined,
    rechargeCoin: '',
    rechargeAddress: '',

    pageNum: 1,
    pageSize: 15,
    recharges: undefined,
    recharge: undefined
};

const rechargeService = new RechargeService();

var isPending = false;

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
            state.rechargeCoins = undefined;
            state.rechargeCoin = '';
            state.rechargeAddress = '';

            state.pageNum = 1;
            state.pageSize = 15;
            state.recharges = undefined;
            state.recharge = undefined;
        }
    },
    actions: {
        // 获取充值币种列表
        async fetchRechargeCoins(context: IActionContext<IRechargeState>, isLoading: boolean = false): Promise<void> {
            let commit = context.commit;
            try {
                let rechargeCoins = await rechargeService.fetchRechargeCoins(isLoading);
                commit(TYPES.SET_STATES, { rechargeCoins });
            } catch (error) {
                commit(TYPES.SET_STATES, { rechargeCoins: [] });
            }
        },

        // 获取充值地址
        async fetchRechargeAddress(context: IActionContext<IRechargeState>): Promise<void> {
            let { commit, state } = context;
            try {
                let rechargeAddress = await rechargeService.fetchRechargeAddress(state.rechargeCoin);
                commit(TYPES.SET_STATES, { rechargeAddress });
            } catch (error) {
                commit(TYPES.SET_STATES, { rechargeAddress: '' });
            }
        },

        // 获取充值列表
        async fetchRecharges(context: IActionContext<IRechargeState>): Promise<Array<RechargeModel> | undefined> {
            if (isPending) return undefined;

            isPending = true;
            let { commit, state } = context;
            try {
                let { pageNum, pageSize, recharges } = state,
                    data = await rechargeService.fetchRecharges(pageNum, pageSize);
                if (pageNum === 1) {
                    commit(TYPES.SET_STATES, {
                        pageNum: pageNum + 1,
                        recharges: data
                    });
                } else {
                    commit(TYPES.SET_STATES, {
                        pageNum: pageNum + 1,
                        recharges: (recharges || []).concat(data)
                    });
                }
                isPending = false;
                return data;
            } catch (error) {
                commit(TYPES.SET_STATES, { recharges: [] });
                isPending = false;
                return [];
            }
        }
    }
};
