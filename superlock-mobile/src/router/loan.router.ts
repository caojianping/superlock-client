import LoanIndex from '@/views/loan/loan-index';
import LoanIntro from '@/views/loan/loan-intro';
import LoanApply from '@/views/loan/loan-apply';
import LoanApplyResult from '@/views/loan/loan-apply-result';
import LoanDetail from '@/views/loan/loan-detail';
import LoanRepay from '@/views/loan/loan-repay';
import LoanRepayResult from '@/views/loan/loan-repay-result';
import LoanInterests from '@/views/loan/loan-interests';

export default [
    {
        path: '/loan/index',
        name: 'LoanIndex',
        component: LoanIndex
    },
    {
        path: '/loan/intro',
        name: 'LoanIntro',
        component: LoanIntro
    },
    {
        path: '/loan/apply',
        name: 'LoanApply',
        component: LoanApply
    },
    {
        path: '/loan/apply/result/:id',
        name: 'LoanApplyResult',
        component: LoanApplyResult
    },
    {
        path: '/loan/detail',
        name: 'LoanDetail',
        component: LoanDetail
    },
    {
        path: '/loan/detail/:id',
        name: 'LoanDetail',
        component: LoanDetail
    },
    {
        path: '/loan/repay',
        name: 'LoanRepay',
        component: LoanRepay
    },
    {
        path: '/loan/repay/result',
        name: 'LoanRepayResult',
        component: LoanRepayResult
    },
    {
        path: '/loan/interests/:id',
        name: 'LoanInterests',
        component: LoanInterests
    }
];
