import TYPES from '@/store/types';
import { IActionContext, IHomeState } from '@/store/interfaces';
import { Prompt } from '@/ts/common';
import { HomeModel, InitInfoForm } from '@/ts/models';
import { HomeService } from '@/ts/services';

const homeState: IHomeState = {
    homeData: new HomeModel(),
    initInfoForm: new InitInfoForm()
};

const homeService = new HomeService();

export default {
    namespaced: true,
    state: homeState,
    mutations: {
        [TYPES.SET_STATES](state: IHomeState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IHomeState) {
            state.homeData = new HomeModel();
            state.initInfoForm = new InitInfoForm();
        }
    },
    actions: {
        // 获取首页数据
        async fetchHomeData(
            context: IActionContext<IHomeState>
        ): Promise<void> {
            const commit = context.commit;
            try {
                let homeData = await homeService.fetchHomeData();
                commit(TYPES.SET_STATES, { homeData: homeData });
            } catch (error) {
                commit(TYPES.SET_STATES, { homeData: new HomeModel() });
                Prompt.error(error.message || error);
            }
        },

        // 获取初始信息
        async fetchInitInfo(
            context: IActionContext<IHomeState>
        ): Promise<void> {
            const commit = context.commit;
            try {
                let initInfo = await homeService.fetchInitInfo();
                commit(TYPES.SET_STATES, { initInfoForm: initInfo });
            } catch (error) {
                commit(TYPES.SET_STATES, { initInfoForm: new InitInfoForm() });
                Prompt.error(error.message || error);
            }
        },

        // 设置初始信息
        async setInitInfo(
            context: IActionContext<IHomeState>,
            isCode: boolean = false
        ): Promise<boolean> {
            const state = context.state;
            return await homeService.setInitInfo(state.initInfoForm, isCode);
        }
    }
};
