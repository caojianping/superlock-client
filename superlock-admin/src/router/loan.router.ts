import LoanOrder from '@/views/loan/loan-order';
import LoanInterest from '@/views/loan/loan-interest';
import LoanSetting from '@/views/loan/loan-setting';

export default [
    {
        path: '/loan/order',
        name: 'LoanOrder',
        component: LoanOrder
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
    }
];
