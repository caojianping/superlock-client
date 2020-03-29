import SecurityCenter from '@/views/security/security-center';
import LoginPassword from '@/views/security/login-password';
import FundPassword from '@/views/security/fund-password';

export default [
    {
        path: '/security/center',
        name: 'SecurityCenter',
        component: SecurityCenter
    },
    {
        path: '/security/login/password',
        name: 'LoginPassword',
        component: LoginPassword
    },
    {
        path: '/security/fund/password',
        name: 'FundPassword',
        component: FundPassword
    }
];
