import TYPES from '@/store/types';
import { IActionContext, IHomeState } from '@/store/interfaces';
import { VirtualType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { HomeModel, InitModel, VirtualModel } from '@/ts/models';
import { HomeService } from '@/ts/services';

const homeState: IHomeState = {
    home: new HomeModel(),
    init: new InitModel(),

    type: VirtualType.LockVirtual,
    virtual: new VirtualModel()
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
            state.home = new HomeModel();
            state.init = new InitModel();

            state.type = VirtualType.LockVirtual;
            state.virtual = new VirtualModel();
        }
    },
    actions: {
        // 获取首页数据
        async fetchHomeData(context: IActionContext<IHomeState>): Promise<void> {
            const commit = context.commit;
            try {
                let home = await homeService.fetchHomeData();
                commit(TYPES.SET_STATES, { home });
            } catch (error) {
                commit(TYPES.SET_STATES, { home: new HomeModel() });
                Prompt.error(error.message || error);
            }
        },

        // 获取初始化数据
        async fetchInitData(context: IActionContext<IHomeState>): Promise<void> {
            const commit = context.commit;
            try {
                let init = await homeService.fetchInitData();
                commit(TYPES.SET_STATES, { init });
            } catch (error) {
                commit(TYPES.SET_STATES, { init: new InitModel() });
                Prompt.error(error.message || error);
            }
        },

        // 设置初始信息
        async setInitData(context: IActionContext<IHomeState>, isCode: boolean = false): Promise<boolean> {
            return await homeService.setInitData(context.state.init, isCode);
        },

        // 获取模拟数据
        async fetchVirtualData(context: IActionContext<IHomeState>): Promise<void> {
            let { commit, state } = context;
            try {
                let virtual = await homeService.fetchVirtualData(state.type);
                commit(TYPES.SET_STATES, { virtual });
            } catch (error) {
                commit(TYPES.SET_STATES, { virtual: new VirtualModel() });
                Prompt.error(error.message || error);
            }
        },

        // 设置模拟数据
        async setVirtualData(context: IActionContext<IHomeState>, isCode: boolean = false): Promise<boolean> {
            let state = context.state;
            return await homeService.setVirtualData(state.type, state.virtual, isCode);
        }
    }
};
