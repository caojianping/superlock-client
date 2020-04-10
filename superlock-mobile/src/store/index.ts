import Vue from 'vue';
import Vuex from 'vuex';

import TYPES from './types';
import { IActionContext, IRootState } from './interfaces';
import { TokenInfo } from '@/ts/models';
import { CommonService } from '@/ts/services';

import userModule from './modules/user.module';
import childModule from './modules/child.module';
import projectModule from './modules/project.module';
import transactionModule from './modules/transaction.module';
import lockModule from './modules/lock.module';
import rechargeModule from './modules/recharge.module';
import withdrawModule from './modules/withdraw.module';
import transferModule from './modules/transfer.module';
import securityModule from './modules/security.module';

Vue.use(Vuex);

const rootState: IRootState = {
    tokenInfo: new TokenInfo(),
    quota: undefined,
    exchangeRate: undefined,

    unitTypes: ['天', '月', '年'],
    rateTypes: ['锁仓利率', '推广解锁利率', '锁仓额度']
};

const commonService = new CommonService();

export default new Vuex.Store({
    strict: false,
    modules: {
        user: userModule,
        child: childModule,
        project: projectModule,
        transaction: transactionModule,
        lock: lockModule,
        recharge: rechargeModule,
        withdraw: withdrawModule,
        transfer: transferModule,
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
            state.quota = undefined;
            state.exchangeRate = undefined;
        }
    },
    actions: {
        // 获取短信验证码
        async fetchSmsCode(context: IActionContext<IRootState>, payload: { areaCode: string; mobile: string }): Promise<boolean> {
            let { areaCode, mobile } = payload;
            return await commonService.fetchSmsCode(areaCode, mobile);
        },

        // 获取可提现、可转账额度
        async fetchQuota(context: IActionContext<IRootState>): Promise<void> {
            let commit = context.commit;
            try {
                let quota = await commonService.fetchQuota();
                commit(TYPES.SET_STATES, { quota });
            } catch (error) {
                commit(TYPES.SET_STATES, { quota: null });
            }
        },

        // 获取今日汇率信息
        async fetchExchangeRate(
            context: IActionContext<IRootState>,
            payload: {
                fromCoin: string;
                toCoin: string;
            }
        ): Promise<void> {
            let commit = context.commit;
            try {
                let exchangeRate = await commonService.fetchExchangeRate(payload.fromCoin, payload.toCoin);
                commit(TYPES.SET_STATES, { exchangeRate });
            } catch (error) {
                commit(TYPES.SET_STATES, { exchangeRate: null });
            }
        }
    }
});
