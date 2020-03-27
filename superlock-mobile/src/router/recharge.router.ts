import RechargeAddress from '@/views/recharge/recharge-address';
import RechargeAddresses from '@/views/recharge/recharge-addresses';
import RechargeRecord from '@/views/recharge/recharge-record';
import RechargeDetail from '@/views/recharge/recharge-detail';

export default [
    {
        path: '/recharge/address/:coin',
        name: 'RechargeAddress',
        component: RechargeAddress
    },
    {
        path: '/recharge/addresses',
        name: 'RechargeAddresses',
        component: RechargeAddresses
    },
    {
        path: '/recharge/record',
        name: 'RechargeRecord',
        component: RechargeRecord
    },
    {
        path: '/recharge/detail/:id',
        name: 'RechargeDetail',
        component: RechargeDetail
    }
];
