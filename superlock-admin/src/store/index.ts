import Vue from 'vue';
import Vuex from 'vuex';

import TYPES from './types';
import { IRootState } from './interfaces';
import { TokenInfo } from '@/ts/models';
import loginModule from './modules/login.module';
import googleModule from './modules/google.module';
import homeModule from './modules/home.module';
import rechargeModule from './modules/recharge.module';
import withdrawModule from './modules/withdraw.module';
import lockModule from './modules/lock.module';
import financeModule from './modules/finance.module';
import loanModule from './modules/loan.module';
import fundModule from './modules/fund.module';
import riskModule from './modules/risk.module';
import memberModule from './modules/member.module';
import pointModule from './modules/point.module';
import systemModule from './modules/system.module';

Vue.use(Vuex);

const rootState: IRootState = {
    tokenInfo: new TokenInfo('', ''),
    isFullLoading: false,
    isPageLoading: false,

    pageSizeOptions: ['10', '50', '100', '200'],
    statusColors: {
        '0': 'text-black',
        '10': 'text-grey',
        '20': 'text-green'
    },
    auditColors: {
        '1': 'text-grey',
        '3': 'text-green',
        '5': 'text-red'
    },
    statusNames: {
        '0': '已创建',
        '10': '未到账',
        '20': '已到账'
    },
    auditNames: {
        '1': '待审核',
        '3': '已审核',
        '5': '已驳回'
    }
};

export default new Vuex.Store({
    strict: false,
    modules: {
        login: loginModule,
        google: googleModule,
        home: homeModule,
        recharge: rechargeModule,
        withdraw: withdrawModule,
        lock: lockModule,
        finance: financeModule,
        loan: loanModule,
        fund: fundModule,
        risk: riskModule,
        member: memberModule,
        point: pointModule,
        system: systemModule
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
            state.tokenInfo = new TokenInfo('', '');
            state.isFullLoading = false;
            state.isPageLoading = false;
            state.pageSizeOptions = ['5', '10', '20', '50'];
        },
        [TYPES.SET_LOADING](
            state: IRootState,
            payload: { key: string; value: boolean }
        ) {
            const { key, value } = payload;
            state[key] = value;
        }
    },
    actions: {}
});
