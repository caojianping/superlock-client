import TYPES from '@/store/types';
import { IActionContext, IHomeState } from '@/store/interfaces';
import { Prompt } from '@/ts/common';
import { HomeModel } from '@/ts/models';
import { HomeService } from '@/ts/services';

const homeState: IHomeState = {
    homeData: new HomeModel()
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
        }
    },
    actions: {
        // 获取首页数据
        async fetchHomeData(context: IActionContext<IHomeState>): Promise<void> {
            const commit = context.commit;
            try {
                let homeData = await homeService.fetchHomeData();
                commit(TYPES.SET_STATES, { homeData: homeData });
            } catch (error) {
                commit(TYPES.SET_STATES, { homeData: new HomeModel() });
                Prompt.error(error.message || error);
            }
        }
    }
};
