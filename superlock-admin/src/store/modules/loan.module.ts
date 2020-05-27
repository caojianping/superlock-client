import TYPES from '@/store/types';
import { IActionContext, ILoanState } from '@/store/interfaces';
import { PageResult, LoanModel, LoanInterestModel, LoanInfoModel } from '@/ts/models';
import { LoanService } from '@/ts/services';

const loanState: ILoanState = {
    auditOptions: [
        { label: '待审核', value: 1 },
        { label: '已审核', value: 3 },
        { label: '已驳回', value: 5 }
    ],
    statusOptions: [
        { label: '已逾期', value: -1 },
        { label: '已创建', value: 0 },
        { label: '贷款中', value: 20 },
        { label: '爆仓', value: 30 },
        { label: '还款中', value: 40 },
        { label: '贷款已还清', value: 50 }
    ],
    statusColors: {
        '-1': 'text-red',
        '0': 'text-grey',
        '20': 'text-green',
        '30': 'text-orange',
        '40': 'text-green',
        '50': 'text-black'
    },
    statusNames: {
        '-1': '已逾期',
        '0': '已创建',
        '20': '贷款中',
        '30': '爆仓',
        '40': '还款中',
        '50': '贷款已还清'
    },

    loanParameters: {
        conditions: {
            loanSerial: '',
            lockSerial: '',
            uid: '',
            beginTime: '',
            endTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    totalCount: 0,
    list: [],

    loanInfo: new LoanInfoModel()
};

const loanService = new LoanService();

export default {
    namespaced: true,
    state: loanState,
    mutations: {
        [TYPES.SET_STATES](state: ILoanState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: ILoanState) {
            state.loanParameters = {
                conditions: {
                    loanSerial: '',
                    lockSerial: '',
                    uid: '',
                    beginTime: '',
                    endTime: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.totalCount = 0;
            state.list = [];

            state.loanInfo = new LoanInfoModel();
        }
    },
    actions: {
        // 获取贷款列表
        async fetchLoans(context: IActionContext<ILoanState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<LoanModel> = await loanService.fetchLoans(state.loanParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出贷款列表
        async exportLoans(context: IActionContext<ILoanState>): Promise<string> {
            return await loanService.exportLoans(context.state.loanParameters);
        },

        // 获取贷款计息列表
        async fetchLoanInterests(context: IActionContext<ILoanState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result: PageResult<LoanInterestModel> = await loanService.fetchLoanInterests(state.loanParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出贷款计息列表
        async exportLoanInterests(context: IActionContext<ILoanState>): Promise<string> {
            return await loanService.exportLoanInterests(context.state.loanParameters);
        },

        // 获取贷款设置信息
        async fetchLoanInfo(context: IActionContext<ILoanState>): Promise<void> {
            let commit = context.commit;
            try {
                let loanInfo = await loanService.fetchLoanInfo();
                commit(TYPES.SET_STATES, { loanInfo: loanInfo });
            } catch (error) {
                commit(TYPES.SET_STATES, { loanInfo: new LoanInfoModel() });
                return Promise.reject(error);
            }
        },

        // 设置贷款信息
        async setLoanInfo(context: IActionContext<ILoanState>, isCode: boolean = false): Promise<boolean> {
            return await loanService.setLoanInfo(context.state.loanInfo, isCode);
        }
    }
};
