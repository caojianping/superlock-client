import Vue from 'vue';
import Vuex from 'vuex';

import TYPES from './types';
import { IActionContext, IRootState } from './interfaces';
import { TokenInfo } from '@/ts/models';
import { CommonService } from '@/ts/services';

import userModule from './modules/user.module';
import homeModule from './modules/home.module';
import assetModule from './modules/asset.module';
import rechargeModule from './modules/recharge.module';
import withdrawModule from './modules/withdraw.module';

Vue.use(Vuex);

const rootState: IRootState = {
    tokenInfo: new TokenInfo(),
    lockUnits: ['天', '月', '年'],
    lockStatuses: new Map([
        [0, '订单已创建'],
        [10, '订单处理中'],
        [20, '锁仓计息中'],
        [30, '锁仓到期'],
        [40, '锁仓失败']
    ])
};

const commonService = new CommonService();

export default new Vuex.Store({
    strict: false,
    modules: {
        user: userModule,
        home: homeModule,
        asset: assetModule,
        recharge: rechargeModule,
        withdraw: withdrawModule
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
