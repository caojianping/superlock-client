import Vue from 'vue';
import Vuex from 'vuex';

import TYPES from './types';
import { AreaCodes, IAreaCode } from '@/ts/config';
import { IActionContext, IRootState } from './interfaces';
import { TokenInfo } from '@/ts/models';
import { CarrierService } from '@/ts/services';

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
import reportModule from './modules/report.module';
import pointModule from './modules/point.module';
import logModule from './modules/log.module';
import systemModule from './modules/system.module';

Vue.use(Vuex);

const rootState: IRootState = {
    tokenInfo: new TokenInfo('', ''),
    isFullLoading: false,
    isPageLoading: false,
    isGoogleAuthShow: false,
    isSecondVerifyShow: false,
    isComGa: false,

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
    carrierOptions: [],

    statusColors: {
        '0': 'text-black',
        '10': 'text-grey',
        '20': 'text-green'
    },
    statusNames: {
        '0': '已创建',
        '10': '未到账',
        '20': '已到账'
    },

    auditColors: {
        '1': 'text-grey',
        '3': 'text-green',
        '5': 'text-red'
    },
    auditNames: {
        '1': '待审核',
        '3': '已审核',
        '5': '已驳回'
    }
};

const carrierService = new CarrierService();

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
        report: reportModule,
        point: pointModule,
        log: logModule,
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
            state.isGoogleAuthShow = false;
            state.isSecondVerifyShow = false;
            state.isComGa = false;

            state.pageSizeOptions = ['10', '50', '100', '200', '500', '1000'];
            state.carrierOptions = [];
        },
        [TYPES.SET_LOADING](state: IRootState, payload: { key: string; value: boolean }) {
            const { key, value } = payload;
            state[key] = value;
        }
    },
    actions: {
        // 获取运营商选项列表
        async fetchCarrierOptions(context: IActionContext<IRootState>, isRefresh?: boolean): Promise<void> {
            let { commit, state } = context;
            try {
                if (state.carrierOptions.length <= 0 || isRefresh) {
                    let carrierOptions = await carrierService.fetchCarrierOptions();
                    commit(TYPES.SET_STATES, { carrierOptions });
                }
            } catch (error) {
                commit(TYPES.SET_STATES, { carrierOptions: [] });
                return Promise.reject(error);
            }
        }
    }
});
