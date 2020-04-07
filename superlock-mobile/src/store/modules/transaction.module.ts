import TYPES from '@/store/types';
import { IActionContext, ITransactionState } from '@/store/interfaces';
import { TransactionService } from '@/ts/services';
import { TransactionModel } from '@/ts/models';

const transactionState: ITransactionState = {
    pageNum: 1,
    pageSize: 10,
    transactions: undefined,
    transaction: new TransactionModel(),

    transactionTypes: [],
    transactionType: undefined
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
        [TYPES.CLEAR_STATES](state: ITransactionState) {
            state.pageNum = 1;
            state.pageSize = 10;
            state.transactions = undefined;
            state.transaction = new TransactionModel();

            state.transactionTypes = [];
            state.transactionType = undefined;
        }
    },
    actions: {
        // 获取交易类型列表
        async fetchTransactionTypes(
            context: IActionContext<ITransactionState>
        ): Promise<void> {
            let commit = context.commit;
            try {
                let transactionTypes = await transactionService.fetchTransactionTypes();
                commit(TYPES.SET_STATES, { transactionTypes });
            } catch (error) {
                commit(TYPES.SET_STATES, { transactionTypes: [] });
            }
        },

        // 获取交易分页列表
        async fetchTransactions(
            context: IActionContext<ITransactionState>
        ): Promise<Array<TransactionModel> | undefined> {
            if (isPending) return undefined;

            isPending = true;
            let { commit, state } = context;
            try {
                let {
                        pageNum,
                        pageSize,
                        transactions,
                        transactionType
                    } = state,
                    data = await transactionService.fetchTransactions(
                        transactionType ? transactionType.type : 1000,
                        pageNum,
                        pageSize
                    );
                if (data.length > 0) {
                    commit(TYPES.SET_STATES, {
                        pageNum: pageNum + 1,
                        transactions:
                            pageNum === 1
                                ? data
                                : (transactions || []).concat(data)
                    });
                }
                isPending = false;
                return data;
            } catch (error) {
                commit(TYPES.SET_STATES, { transactions: [] });
                isPending = false;
                return [];
            }
        }
    }
};
