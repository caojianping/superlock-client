import TYPES from '@/store/types';
import { IActionContext, ITransactionState } from '@/store/interfaces';
import { TransactionService } from '@/ts/services';
import { TransactionModel, TransactionTypeModel } from '@/ts/models';

const transactionState: ITransactionState = {
    transactionTypes: [],
    transactionType: new TransactionTypeModel(1000, '全部'),

    pageNum: 1,
    pageSize: 15,
    transactions: undefined,

    type: 0,
    orderId: '',
    transaction: undefined
};

const transactionService = new TransactionService();

var isPending = false;

export default {
    namespaced: true,
    state: transactionState,
    mutations: {
        [TYPES.SET_STATES](state: ITransactionState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: ITransactionState, withoutType: boolean = false) {
            state.transactionTypes = [];
            if (!withoutType) {
                state.transactionType = new TransactionTypeModel(1000, '全部');
            }

            state.pageNum = 1;
            state.pageSize = 15;
            state.transactions = undefined;

            state.type = 0;
            state.orderId = '';
            state.transaction = undefined;
        }
    },
    actions: {
        // 获取交易类型列表
        async fetchTransactionTypes(context: IActionContext<ITransactionState>): Promise<void> {
            let commit = context.commit;
            try {
                let transactionTypes = await transactionService.fetchTransactionTypes();
                commit(TYPES.SET_STATES, { transactionTypes });
            } catch (error) {
                commit(TYPES.SET_STATES, { transactionTypes: [] });
            }
        },

        // 获取交易分页列表
        async fetchTransactions(context: IActionContext<ITransactionState>): Promise<Array<TransactionModel> | undefined> {
            if (isPending) return undefined;

            isPending = true;
            let { commit, state } = context;
            try {
                let { pageNum, pageSize, transactions, transactionType } = state,
                    data = await transactionService.fetchTransactions(transactionType.type, pageNum, pageSize);
                if (pageNum === 1) {
                    commit(TYPES.SET_STATES, {
                        pageNum: pageNum + 1,
                        transactions: data
                    });
                } else {
                    commit(TYPES.SET_STATES, {
                        pageNum: pageNum + 1,
                        transactions: (transactions || []).concat(data)
                    });
                }
                isPending = false;
                return data;
            } catch (error) {
                commit(TYPES.SET_STATES, { transactions: [] });
                isPending = false;
                return [];
            }
        },

        // 获取交易信息
        async fetchTransaction(context: IActionContext<ITransactionState>): Promise<void> {
            let { commit, state } = context;
            try {
                let transaction = await transactionService.fetchTransaction(state.type, state.orderId);
                commit(TYPES.SET_STATES, { transaction });
            } catch (error) {
                commit(TYPES.SET_STATES, { transaction: null });
            }
        }
    }
};
