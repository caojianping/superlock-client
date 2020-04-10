import TYPES from '@/store/types';
import { IActionContext, ITransferState } from '@/store/interfaces';
import { TransferFormModel, TransferChildModel, TransferModel } from '@/ts/models';
import { TransferService } from '@/ts/services';

const transferState: ITransferState = {
    transferForm: new TransferFormModel(),

    pageNum: 1,
    pageSize: 15,
    transfers: undefined,
    transfer: undefined,

    transferChilds: undefined,
    selectedTransferChild: undefined
};

const transferService = new TransferService();

var isPending = false;

export default {
    namespaced: true,
    state: transferState,
    mutations: {
        [TYPES.SET_STATES](state: ITransferState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: ITransferState, withoutSelected: boolean = false) {
            state.transferForm = new TransferFormModel();

            state.pageNum = 1;
            state.pageSize = 15;
            state.transfers = undefined;
            state.transfer = undefined;

            state.transferChilds = undefined;
            if (!withoutSelected) {
                state.selectedTransferChild = undefined;
            }
        }
    },
    actions: {
        // 执行转账
        async executeTransfer(context: IActionContext<ITransferState>): Promise<boolean> {
            let state = context.state;
            return await transferService.executeTransfer(state.transferForm);
        },

        // 获取转账列表
        async fetchTransfers(context: IActionContext<ITransferState>): Promise<Array<TransferModel> | undefined> {
            if (isPending) return undefined;

            isPending = true;
            let { commit, state } = context;
            try {
                let { pageNum, pageSize, transfers } = state,
                    data = await transferService.fetchTransfers(pageNum, pageSize);
                if (pageNum === 1) {
                    commit(TYPES.SET_STATES, {
                        pageNum: pageNum + 1,
                        transfers: data
                    });
                } else {
                    commit(TYPES.SET_STATES, {
                        pageNum: pageNum + 1,
                        transfers: (transfers || []).concat(data)
                    });
                }
                isPending = false;
                return data;
            } catch (error) {
                commit(TYPES.SET_STATES, { transfers: [] });
                isPending = false;
                return [];
            }
        },

        // 获取转账下级列表
        async fetchTransferChilds(context: IActionContext<ITransferState>, keyword: string = ''): Promise<Array<TransferChildModel> | undefined> {
            if (isPending) return undefined;

            isPending = true;
            let { commit, state } = context;
            try {
                let { pageNum, pageSize, transferChilds } = state,
                    data = await transferService.fetchTransferChilds(keyword, pageNum, pageSize);
                if (pageNum === 1) {
                    commit(TYPES.SET_STATES, {
                        pageNum: pageNum + 1,
                        transferChilds: data
                    });
                } else {
                    commit(TYPES.SET_STATES, {
                        pageNum: pageNum + 1,
                        transferChilds: (transferChilds || []).concat(data)
                    });
                }
                isPending = false;
                return data;
            } catch (error) {
                commit(TYPES.SET_STATES, { transferChilds: [] });
                isPending = false;
                return [];
            }
        }
    }
};
