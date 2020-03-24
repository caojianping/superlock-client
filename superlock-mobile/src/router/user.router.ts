import UserLogin from '@/views/user/user-login';
import UserRegister from '@/views/user/user-register';
import UserForget from '@/views/user/user-forget';

export default [
    {
        path: '/',
        redirect: '/user/login'
    },
    {
        path: '/user/login',
        name: 'UserLogin',
        component: UserLogin
    },
    {
        path: '/user/register',
        name: 'UserRegister',
        component: UserRegister
    },
    {
        path: '/user/forget',
        name: 'UserForget',
        component: UserForget
    }
];
