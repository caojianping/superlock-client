import RechargeCode from '@/views/recharge/recharge-code';
import RechargeAddress from '@/views/recharge/recharge-address';
import RechargeRecord from '@/views/recharge/recharge-record';
import RechargeDetail from '@/views/recharge/recharge-detail';

export default [
    {
        path: '/recharge/code/:coin',
        name: 'RechargeCode',
        component: RechargeCode
    },
    {
        path: '/recharge/address',
        name: 'RechargeAddress',
        component: RechargeAddress
    },
    {
        path: '/recharge/record',
        name: 'RechargeRecord',
        component: RechargeRecord
    },
    {
        path: '/recharge/detail',
        name: 'RechargeDetail',
        component: RechargeDetail
    }
];
