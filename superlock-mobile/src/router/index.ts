import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import TYPES from '@/store/types';
import { Token } from '@/ts/common';

import Home from '@/views/home';
import UserRouter from './user.router';
import RechargeRouter from './recharge.router';
import WithdrawRouter from './withdraw.router';
import TransferRouter from './transfer.router';
import LockRouter from './lock.router';
import AssetRouter from './asset.router';
import MineRouter from './mine.router';

Vue.use(Router);

const routes = [
    {
        path: '/home/index',
        name: 'Home',
        component: Home
    },
    ...UserRouter,
    ...RechargeRouter,
    ...WithdrawRouter,
    ...TransferRouter,
    ...LockRouter,
    ...AssetRouter,
    ...MineRouter
];

const router = new Router({
    mode: 'hash',
    routes
});

// 是否为无需授权页面
function isWithoutAuth(path: string): boolean {
    const urls = ['/user/register', '/user/login', '/user/forget'];
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
        // if (token) next('/home/index');
        // else next();
        next();
    } else {
        if (token) next();
        else {
            Token.removeTokenInfo();
            store.commit(TYPES.CLEAR_STATES);
            next('/user/login');
        }
    }
});

export default router;
