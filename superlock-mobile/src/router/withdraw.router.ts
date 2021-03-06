import WithdrawIndex from '@/views/withdraw/withdraw-index';
import WithdrawAddress from '@/views/withdraw/withdraw-address';
import WithdrawRecord from '@/views/withdraw/withdraw-record';
import WithdrawDetail from '@/views/withdraw/withdraw-detail';
import WithdrawResult from '@/views/withdraw/withdraw-result';

export default [
    {
        path: '/withdraw/index',
        name: 'WithdrawIndex',
        component: WithdrawIndex
    },
    {
        path: '/withdraw/address',
        name: 'WithdrawAddress',
        component: WithdrawAddress
    },
    {
        path: '/withdraw/record',
        name: 'WithdrawRecord',
        component: WithdrawRecord
    },
    {
        path: '/withdraw/detail',
        name: 'WithdrawDetail',
        component: WithdrawDetail
    },
    {
        path: '/withdraw/result/:type',
        name: 'WithdrawResult',
        component: WithdrawResult
    }
];
