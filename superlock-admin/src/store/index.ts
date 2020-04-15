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
import carrierModule from './modules/carrier.module';
import pointModule from './modules/point.module';
import systemModule from './modules/system.module';

Vue.use(Vuex);

const rootState: IRootState = {
    tokenInfo: new TokenInfo('', ''),
    isFullLoading: false,
    isPageLoading: false,
    isSecondVerifyShow: false,

    pageSizeOptions: ['10', '50', '100', '200', '500', '1000'],
    withdrawOptions: [
        { label: '全部', value: '' },
        { label: '未提现', value: '0' },
        { label: '提现中', value: '10' },
        { label: '提现成功', value: '20' },
        { label: '提现失败', value: '30' }
    ],
    carrierOptions: [
        { value: '100', text: '运营商一' },
        { value: '200', text: '运营商二' },
        { value: '300', text: '运营商三' }
    ],

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
        carrier: carrierModule,
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
            state.isSecondVerifyShow = false;

            state.pageSizeOptions = ['10', '50', '100', '200', '500', '1000'];
            state.carrierOptions = [];
        },
        [TYPES.SET_LOADING](state: IRootState, payload: { key: string; value: boolean }) {
            const { key, value } = payload;
            state[key] = value;
        }
    },
    actions: {}
});
