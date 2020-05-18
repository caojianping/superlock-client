import LockIntro from '@/views/lock/lock-intro';
import LockDetail from '@/views/lock/lock-detail';
import LockInterests from '@/views/lock/lock-interests';
import LockCreate from '@/views/lock/lock-create';
import LockResult from '@/views/lock/lock-result';

export default [
    {
        path: '/lock/intro',
        name: 'LockIntro',
        component: LockIntro
    },
    {
        path: '/lock/detail',
        name: 'LockDetail',
        component: LockDetail
    },
    {
        path: '/lock/interests/:id',
        name: 'LockInterests',
        component: LockInterests
    },
    {
        path: '/lock/create',
        name: 'LockCreate',
        component: LockCreate
    },
    {
        path: '/lock/result',
        name: 'LockResult',
        component: LockResult
    }
];
