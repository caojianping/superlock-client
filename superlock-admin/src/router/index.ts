import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';
import TYPES from '@/store/types';
import { Token } from '@/ts/common';

import Login from '@/views/login';
import Layout from '@/views/layout';
import HomeRouter from './home.router';
import RechargeRouter from './recharge.router';
import WithdrawRouter from './withdraw.router';
import LockRouter from './lock.router';
import FinanceRouter from './finance.router';
import LoanRouter from './loan.router';
import FundRouter from './fund.router';
import RiskRouter from './risk.router';
import MemberRouter from './member.router';
import CarrierRouter from './carrier.router';
import PointRouter from './point.router';
import SystemRouter from './system.router';
import ReportRouter from './report.router';

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
            ...HomeRouter,
            ...RechargeRouter,
            ...WithdrawRouter,
            ...LockRouter,
            ...FinanceRouter,
            ...LoanRouter,
            ...FundRouter,
            ...RiskRouter,
            ...MemberRouter,
            ...CarrierRouter,
            ...PointRouter,
            ...SystemRouter,
            ...ReportRouter
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
