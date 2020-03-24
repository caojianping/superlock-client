import LockDetail from '@/views/lock/lock-detail';
import LockCreate from '@/views/lock/lock-create';

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
    }
];
