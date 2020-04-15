import WithdrawRecord from '@/views/withdraw/withdraw-record';
import WithdrawTransfer from '@/views/withdraw/withdraw-transfer';

export default [
    {
        path: '/withdraw/record',
        name: 'WithdrawRecord',
        component: WithdrawRecord
    },
    {
        path: '/withdraw/transfer',
        name: 'WithdrawTransfer',
        component: WithdrawTransfer
    }
];
