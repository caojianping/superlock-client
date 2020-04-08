import TransactionRecord from '@/views/transaction/transaction-record';
import TransactionDetail from '@/views/transaction/transaction-detail';

export default [
    {
        path: '/transaction/record',
        name: 'TransactionRecord',
        component: TransactionRecord
    },
    {
        path: '/transaction/detail/:type/:orderId',
        name: 'TransactionDetail',
        component: TransactionDetail
    }
];
