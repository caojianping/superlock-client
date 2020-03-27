import TYPES from '@/store/types';
import { IActionContext, IRechargeState } from '@/store/interfaces';
import { RechargeModel } from '@/ts/models';
import { RechargeService } from '@/ts/services';

const rechargeState: IRechargeState = {
    coins: [],
    coin: '',
    address: '',

    pageNum: 1,
    pageSize: 10,
    recharges: [],
    recharge: new RechargeModel()
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
            state.coin = '';
            state.address = '';

            state.pageNum = 1;
            state.pageSize = 10;
            state.recharges = [];
            state.recharge = new RechargeModel();
        }
    },
    actions: {
        // 获取充值币种列表
        async fetchRechargeCoins(
            context: IActionContext<IRechargeState>
        ): Promise<void> {
            let commit = context.commit;
            try {
                let coins = await rechargeService.fetchRechargeCoins();
                commit(TYPES.SET_STATES, { coins });
            } catch (error) {
                commit(TYPES.SET_STATES, { coins: [] });
            }
        },

        // 获取充值地址信息
        async fetchRechargeAddress(
            context: IActionContext<IRechargeState>
        ): Promise<void> {
            let { commit, state } = context;
            try {
                let coin = state.coin,
                    address = await rechargeService.fetchRechargeAddress(coin);
                commit(TYPES.SET_STATES, { address });
            } catch (error) {
                commit(TYPES.SET_STATES, { address: '' });
            }
        },

        // 获取充值记录列表
        async fetchRechargeRecords(
            context: IActionContext<IRechargeState>
        ): Promise<Array<RechargeModel> | undefined> {
            console.log('fetchRechargeRecords isPending:', isPending);
            if (isPending) return undefined;

            isPending = true;
            let { commit, state } = context;
            try {
                let { pageNum, pageSize, recharges } = state,
                    data = await rechargeService.fetchRechargeRecords(
                        pageNum,
                        pageSize
                    );
                commit(TYPES.SET_STATES, {
                    pageNum: pageNum + 1,
                    recharges: recharges.concat(data)
                });
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
