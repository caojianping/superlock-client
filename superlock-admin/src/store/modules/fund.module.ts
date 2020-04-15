import TYPES from '@/store/types';
import { IActionContext, IFundState } from '@/store/interfaces';
import { PageResult, FundModel } from '@/ts/models';
import { FundService } from '@/ts/services';

const fundState: IFundState = {
    coinOptions: [
        { label: '全部', value: '' },
        { label: 'BCB', value: 'BCB' },
        { label: 'DC', value: 'DC' },
        { label: 'USDT', value: 'USDT' },
        { label: 'USDTERC', value: 'USDTERC' }
    ],
    orderOptions: [
        { label: '全部', value: '' },
        { label: '充值', value: '充值' },
        { label: '提现', value: '提现' },
        { label: '锁仓', value: '锁仓' },
        { label: '转账', value: '转账' },
        { label: '锁仓利息', value: '锁仓利息' },
        { label: '推广解锁奖励', value: '推广解锁奖励' },
        { label: '日销达标奖励', value: '日销达标奖励' },
        { label: '团队锁仓奖励', value: '团队锁仓奖励' },
        { label: '锁仓解锁', value: '锁仓解锁' },
        { label: '贷款', value: '贷款' },
        { label: '贷款利息', value: '贷款利息' },
        { label: '还贷', value: '还贷' }
    ],
    accountOptions: [
        { label: '全部', value: '' },
        { label: '上分账户', value: '上分账户' },
        { label: '闪兑账户', value: '闪兑账户' },
        { label: '分账账户', value: '分账账户' },
        { label: '利润账户', value: '利润账户' },
        { label: '锁仓账户', value: '锁仓账户' },
        { label: '锁仓利息账户', value: '锁仓利息账户' },
        { label: '基金账户', value: '基金账户' },
        { label: '贷款账户', value: '贷款账户' },
        { label: '贷款利息账户', value: '贷款利息账户' },
        { label: '贷款发放账户', value: '贷款发放账户' },
        { label: '用户资金账户', value: '用户资金账户' }
    ],

    parameters: {
        conditions: {
            orderId: '',
            coinCode: '',
            beginTime: '',
            endTime: '',
            orderType: '',
            accountName: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    totalCount: 0,
    list: []
};

const fundService = new FundService();

export default {
    namespaced: true,
    state: fundState,
    mutations: {
        [TYPES.SET_STATES](state: IFundState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IFundState) {
            state.parameters = {
                conditions: {
                    orderId: '',
                    coinCode: '',
                    beginTime: '',
                    endTime: '',
                    orderType: '',
                    accountName: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.totalCount = 0;
            state.list = [];
        }
    },
    actions: {
        // 获取资金列表
        async fetchFunds(context: IActionContext<IFundState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<FundModel> = await fundService.fetchFunds(state.parameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出资金列表
        async exportFunds(context: IActionContext<IFundState>): Promise<string> {
            return await fundService.exportFunds(context.state.parameters);
        }
    }
};
