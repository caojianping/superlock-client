import Vue from 'vue';
import Vuex from 'vuex';

import TYPES from './types';
import { IActionContext, IRootState } from './interfaces';
import { TokenInfo } from '@/ts/models';
import { CommonService } from '@/ts/services';

import userModule from './modules/user.module';

Vue.use(Vuex);

const rootState: IRootState = {
    tokenInfo: new TokenInfo()
};

const commonService = new CommonService();

export default new Vuex.Store({
    strict: false,
    modules: {
        user: userModule
    },
    state: rootState,
    mutations: {
        [TYPES.SET_STATES](state: IRootState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IRootState) {}
    },
    actions: {
        // 获取短信验证码
        async fetchSmsCode(
            context: IActionContext<IRootState>,
            payload: { areaCode: string; mobile: string }
        ): Promise<boolean> {
            let { areaCode, mobile } = payload;
            return await commonService.fetchSmsCode(areaCode, mobile);
        }
    }
});
