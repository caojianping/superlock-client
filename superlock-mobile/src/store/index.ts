import Vue from 'vue';
import Vuex from 'vuex';

import TYPES from './types';
import { IRootState } from './interfaces';
import loginModule from './modules/login.module';

Vue.use(Vuex);

const rootState: IRootState = {};

export default new Vuex.Store({
    strict: false,
    modules: {
        login: loginModule
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
    actions: {}
});
