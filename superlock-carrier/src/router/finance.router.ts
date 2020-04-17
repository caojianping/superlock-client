import FinanceInterest from '@/views/finance/finance-interest';
import FinanceDirect from '@/views/finance/finance-direct';
import FinancePromote from '@/views/finance/finance-promote';
import FinanceSale from '@/views/finance/finance-sale';

export default [
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
    }
];
