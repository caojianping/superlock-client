import LockDetail from '@/views/lock/lock-detail';
import LockCreate from '@/views/lock/lock-create';
import LockResult from '@/views/lock/lock-result';

export default [
    {
        path: '/lock/detail',
        name: 'LockDetail',
        component: LockDetail
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
