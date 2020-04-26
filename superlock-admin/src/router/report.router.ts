import RechargeReport from '@/views/report/recharge-report';
import LockReport from '@/views/report/lock-report';
import ExpendReport from '@/views/report/expend-report';
import UserReport from '@/views/report/user-report';

export default [
    {
        path: '/report/recharge',
        name: 'RechargeReport',
        component: RechargeReport
    },
    {
        path: '/report/lock',
        name: 'LockReport',
        component: LockReport
    },
    {
        path: '/report/expend',
        name: 'ExpendReport',
        component: ExpendReport
    },
    {
        path: '/report/user',
        name: 'UserReport',
        component: UserReport
    }
];
