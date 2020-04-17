import Vue from 'vue';
import Vuex from 'vuex';

import TYPES from './types';
import { IRootState } from './interfaces';
import { AreaCodes, IAreaCode } from '@/ts/config';
import { TokenInfo } from '@/ts/models';

import loginModule from './modules/login.module';
import homeModule from './modules/home.module';
import lockModule from './modules/lock.module';
import financeModule from './modules/finance.module';
import memberModule from './modules/member.module';
import carrierModule from './modules/carrier.module';
import systemModule from './modules/system.module';

Vue.use(Vuex);

const rootState: IRootState = {
    tokenInfo: TokenInfo.createInstance(),
    isFullLoading: false,
    isPageLoading: false,
    isSecondVerifyShow: false,

    pageSizeOptions: ['10', '50', '100', '200', '500', '1000'],
    areaCodeOptions: AreaCodes.map((areaCode: IAreaCode) => ({
        label: `${areaCode.name} +${areaCode.code}`,
        value: areaCode.id
    })),
    coinOptions: [
        { label: '全部', value: '' },
        { label: 'BCB', value: 'BCB' },
        { label: 'DC', value: 'DC' },
        { label: 'USDT', value: 'USDT' },
        { label: 'USDTERC', value: 'USDTERC' }
    ],
    withdrawOptions: [
        { label: '全部', value: '' },
        { label: '未提现', value: '0' },
        { label: '提现中', value: '10' },
        { label: '提现成功', value: '20' },
        { label: '提现失败', value: '30' }
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
        home: homeModule,
        lock: lockModule,
        finance: financeModule,
        member: memberModule,
        carrier: carrierModule,
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
            state.tokenInfo = TokenInfo.createInstance();
            state.isFullLoading = false;
            state.isPageLoading = false;
            state.isSecondVerifyShow = false;
        },
        [TYPES.SET_LOADING](state: IRootState, payload: { key: string; value: boolean }) {
            const { key, value } = payload;
            state[key] = value;
        }
    },
    actions: {}
});
