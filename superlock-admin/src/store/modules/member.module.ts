import TYPES from '@/store/types';
import { IActionContext, IMemberState } from '@/store/interfaces';
import {
    PageResult,
    BrokerModel,
    BrokerChildModel,
    RateModel,
    BrokerForm,
    RateForm,
    QuotaForm,
    BrokerChildPageResult
} from '@/ts/models';
import { MemberService } from '@/ts/services';

const memberState: IMemberState = {
    typeOptions: [
        { label: '全部', value: '' },
        { label: '券商用户', value: '0' },
        { label: '代理用户', value: '1' }
    ],
    projectOptions: [],

    parameters: {
        conditions: {
            uid: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    totalCount: 0,
    list: [],

    brokerForm: new BrokerForm(),
    rateForm: new RateForm(),
    quotaForm: new QuotaForm(),

    count: 0
};

const memberService = new MemberService();

export default {
    namespaced: true,
    state: memberState,
    mutations: {
        [TYPES.SET_STATES](state: IMemberState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IMemberState) {
            state.parameters = {
                conditions: {
                    uid: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.totalCount = 0;
            state.list = [];

            state.brokerForm = new BrokerForm();
            state.rateForm = new RateForm();
            state.quotaForm = new QuotaForm();

            state.count = 0;
        }
    },
    actions: {
        // 获取券商分页列表
        async fetchPageBrokers(
            context: IActionContext<IMemberState>
        ): Promise<void> {
            let { commit, state } = context,
                parameters = state.parameters;
            try {
                let result: PageResult<BrokerModel> = await memberService.fetchPageBrokers(
                    parameters
                );
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, {
                    totalCount: 0,
                    list: []
                });
                return Promise.reject(error);
            }
        },

        // 获取券商下级分页列表
        async fetchPageBrokerChilds(
            context: IActionContext<IMemberState>
        ): Promise<void> {
            let { commit, state } = context,
                parameters = state.parameters;
            try {
                let result: BrokerChildPageResult<BrokerChildModel> = await memberService.fetchPageBrokerChilds(
                    parameters
                );
                commit(TYPES.SET_STATES, {
                    totalCount: result.totalCount,
                    list: result.list,
                    count: result.subordinate
                });
            } catch (error) {
                commit(TYPES.SET_STATES, {
                    totalCount: 0,
                    list: [],
                    count: 0
                });
                return Promise.reject(error);
            }
        },

        // 获取利率分页列表
        async fetchPageRates(
            context: IActionContext<IMemberState>
        ): Promise<void> {
            let { commit, state } = context,
                parameters = state.parameters;
            try {
                let result: PageResult<RateModel> = await memberService.fetchPageRates(
                    parameters
                );
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, {
                    totalCount: 0,
                    list: []
                });
                return Promise.reject(error);
            }
        },

        // 获取项目类型列表
        async fetchProjectTypes(
            context: IActionContext<IMemberState>
        ): Promise<void> {
            let commit = context.commit;
            try {
                let projects = await memberService.fetchProjectTypes();
                commit(TYPES.SET_STATES, { projectOptions: projects });
            } catch (error) {
                commit(TYPES.SET_STATES, { projectOptions: [] });
            }
        },

        // 添加券商
        async addBroker(
            context: IActionContext<IMemberState>,
            isCode: boolean = false
        ): Promise<boolean> {
            let state = context.state;
            return await memberService.addBroker(state.brokerForm, isCode);
        },

        // 设置利率
        async setRate(
            context: IActionContext<IMemberState>,
            isCode: boolean = false
        ): Promise<boolean> {
            let state = context.state;
            return await memberService.setRate(state.rateForm, isCode);
        },

        // 添加额度
        async addQuota(
            context: IActionContext<IMemberState>,
            isCode: boolean = false
        ): Promise<boolean> {
            let state = context.state;
            return await memberService.addQuota(state.quotaForm, isCode);
        }
    }
};
