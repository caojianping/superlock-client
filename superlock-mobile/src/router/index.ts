import Vue from 'vue';
import Router from 'vue-router';
import { Token } from '@/ts/common';

import Home from '@/views/home';
import UserRouter from './user.router';
import TeamRouter from './team.router';
import RechargeRouter from './recharge.router';
import WithdrawRouter from './withdraw.router';
import TransferRouter from './transfer.router';
import LockRouter from './lock.router';
import AssetRouter from './asset.router';
import MineRouter from './mine.router';
import SecurityRouter from './security.router';

Vue.use(Router);

const routes = [
    {
        path: '/home/index',
        name: 'Home',
        component: Home
    },
    ...UserRouter,
    ...TeamRouter,
    ...RechargeRouter,
    ...WithdrawRouter,
    ...TransferRouter,
    ...LockRouter,
    ...AssetRouter,
    ...MineRouter,
    ...SecurityRouter
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
        next();
    } else {
        if (token) next();
        else {
            Token.removeTokenInfo();
            next('/user/login');
        }
    }
});

export default router;
