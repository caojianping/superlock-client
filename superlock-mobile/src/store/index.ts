import Vue from 'vue';
import Vuex from 'vuex';

import TYPES from './types';
import { IActionContext, IRootState } from './interfaces';
import { TokenInfo } from '@/ts/models';
import { CommonService } from '@/ts/services';

import userModule from './modules/user.module';
import childModule from './modules/child.module';
import projectModule from './modules/project.module';
import lockModule from './modules/lock.module';
import rechargeModule from './modules/recharge.module';
import withdrawModule from './modules/withdraw.module';
import securityModule from './modules/security.module';

Vue.use(Vuex);

const rootState: IRootState = {
    tokenInfo: new TokenInfo(),
    units: ['天', '月', '年'],
    rateTypes: ['锁仓利率', '推广解锁利率', '锁仓额度']
};

const commonService = new CommonService();

export default new Vuex.Store({
    strict: false,
    modules: {
        user: userModule,
        child: childModule,
        project: projectModule,
        lock: lockModule,
        recharge: rechargeModule,
        withdraw: withdrawModule,
        security: securityModule
    },
    state: rootState,
    mutations: {
        [TYPES.SET_STATES](state: IRootState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IRootState) {
            state.tokenInfo = new TokenInfo();
        }
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
