import TransferIndex from '@/views/transfer/transfer-index';
import TransferAddress from '@/views/transfer/transfer-address';
import TransferRecord from '@/views/transfer/transfer-record';
import TransferDetail from '@/views/transfer/transfer-detail';

export default [
    {
        path: '/transfer/index',
        name: 'TransferIndex',
        component: TransferIndex
    },
    {
        path: '/transfer/address',
        name: 'TransferAddress',
        component: TransferAddress
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
