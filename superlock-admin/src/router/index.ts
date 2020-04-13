import Vue from 'vue';
import Router, { Route } from 'vue-router';
import store from '@/store';
import TYPES from '@/store/types';
import { Token } from '@/ts/common';

import Login from '@/views/login';
import Layout from '@/views/layout';
import Home from '@/views/home';

// 充值模块
import RechargeRecord from '@/views/recharge/recharge-record';
import RechargePoundage from '@/views/recharge/recharge-poundage';

// 提现模块
import WithdrawRecord from '@/views/withdraw/withdraw-record';
import WithdrawTransfer from '@/views/withdraw/withdraw-transfer';

// 锁仓模块
import LockRecord from '@/views/lock/lock-record';
import LockCreate from '@/views/lock/lock-create';
import LockAward from '@/views/lock/lock-award';
import LockProject from '@/views/lock/lock-project';

// 账务模块
import FinanceInterest from '@/views/finance/finance-interest';
import FinanceDirect from '@/views/finance/finance-direct';
import FinancePromote from '@/views/finance/finance-promote';
import FinanceSale from '@/views/finance/finance-sale';

// 贷款模块
import LoanRecord from '@/views/loan/loan-record';
import LoanInterest from '@/views/loan/loan-interest';
import LoanSetting from '@/views/loan/loan-setting';

// 资金模块
import FundRecord from '@/views/fund/fund-record';

// 风控模块
import RiskAudit from '@/views/risk/risk-audit';

// 用户中心模块
import MemberBroker from '@/views/member/member-broker';
import MemberBrokerChild from '@/views/member/member-broker-child';
import MemberRate from '@/views/member/member-rate';

// 上分模块
import PointRecord from '@/views/point/point-record';
import PointAccount from '@/views/point/point-account';

// 系统模块
import SystemUser from '@/views/system/system-user';
import SystemGoogle from '@/views/system/system-google';
import SystemPassword from '@/views/system/system-password';

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/layout',
        name: 'Layout',
        component: Layout,
        children: [
            {
                path: '/home',
                name: 'Home',
                component: Home
            },
            {
                path: '/recharge/record',
                name: 'RechargeRecord',
                component: RechargeRecord
            },
            {
                path: '/recharge/poundage',
                name: 'RechargePoundage',
                component: RechargePoundage
            },
            {
                path: '/withdraw/record',
                name: 'WithdrawRecord',
                component: WithdrawRecord
            },
            {
                path: '/withdraw/transfer',
                name: 'WithdrawTransfer',
                component: WithdrawTransfer
            },
            {
                path: '/lock/record',
                name: 'LockRecord',
                component: LockRecord
            },
            {
                path: '/lock/create',
                name: 'LockCreate',
                component: LockCreate
            },
            {
                path: '/lock/award',
                name: 'LockAward',
                component: LockAward
            },
            {
                path: '/lock/project',
                name: 'LockProject',
                component: LockProject
            },
            {
                path: '/finance/interest',
                name: 'FinanceInterest',
                component: FinanceInterest
            },
            {
                path: '/finance/direct',
                name: 'FinanceDirect',
                component: FinanceDirect
            },
            {
                path: '/finance/promote',
                name: 'FinancePromote',
                component: FinancePromote
            },
            {
                path: '/finance/sale',
                name: 'FinanceSale',
                component: FinanceSale
            },
            {
                path: '/loan/record',
                name: 'LoanRecord',
                component: LoanRecord
            },
            {
                path: '/loan/interest',
                name: 'LoanInterest',
                component: LoanInterest
            },
            {
                path: '/loan/setting',
                name: 'LoanSetting',
                component: LoanSetting
            },
            {
                path: '/fund/record',
                name: 'FundRecord',
                component: FundRecord
            },
            {
                path: '/risk/audit',
                name: 'RiskAudit',
                component: RiskAudit
            },
            {
                path: '/member/broker/:type',
                name: 'MemberBroker',
                component: MemberBroker
            },
            {
                path: '/member/broker/child/:uid',
                name: 'MemberBrokerChild',
                component: MemberBrokerChild
            },
            {
                path: '/member/rate',
                name: 'MemberRate',
                component: MemberRate
            },
            {
                path: '/point/record',
                name: 'PointRecord',
                component: PointRecord
            },
            {
                path: '/point/account',
                name: 'PointAccount',
                component: PointAccount
            },
            {
                path: '/system/user',
                name: 'SystemUser',
                component: SystemUser
            },
            {
                path: '/system/google',
                name: 'SystemGoogle',
                component: SystemGoogle
            },
            {
                path: '/system/password',
                name: 'SystemPassword',
                component: SystemPassword
            }
        ]
    }
];

const router = new Router({
    mode: 'hash',
    routes
});

// 是否为无需授权页面
function isWithoutAuth(path: string): boolean {
    const urls = ['/login'];
    let result = false;
    for (let i = 0; i < urls.length; i++) {
        let url = urls[i];
        if (path.indexOf(url) === 0) {
            result = true;
            break;
        }
    }
    return result;
}

router.beforeEach((to, from, next) => {
    Vue.prototype.cancelRequest();

    let tokenInfo = Token.getTokenInfo(),
        token = tokenInfo.token;
    if (isWithoutAuth(to.path)) {
        if (token) next('/home');
        else next();
    } else {
        if (token) next();
        else {
            Token.removeTokenInfo();
            store.commit(TYPES.CLEAR_STATES);
            next('/login');
        }
    }
});

export default router;
