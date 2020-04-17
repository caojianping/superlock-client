import LockOrder from '@/views/lock/lock-order';
import LockAward from '@/views/lock/lock-award';
import LockProject from '@/views/lock/lock-project';

export default [
    {
        path: '/lock/order',
        name: 'LockOrder',
        component: LockOrder
    },
    {
        path: '/lock/award',
        name: 'LockAward',
        component: LockAward
    },
    {
        path: '/lock/project',
        name: 'LockProject',
        component: LockProject
    }
];
