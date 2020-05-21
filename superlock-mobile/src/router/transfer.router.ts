import TransferIndex from '@/views/transfer/transfer-index';
import TransferChild from '@/views/transfer/transfer-child';
import TransferRecord from '@/views/transfer/transfer-record';
import TransferDetail from '@/views/transfer/transfer-detail';

export default [
    {
        path: '/transfer/index',
        name: 'TransferIndex',
        component: TransferIndex
    },
    {
        path: '/transfer/child',
        name: 'TransferChild',
        component: TransferChild
    },
    {
        path: '/transfer/record',
        name: 'TransferRecord',
        component: TransferRecord
    },
    {
        path: '/transfer/detail',
        name: 'TransferDetail',
        component: TransferDetail
    }
];
