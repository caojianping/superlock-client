import RechargeOrder from '@/views/recharge/recharge-order';
// import RechargePoundage from '@/views/recharge/recharge-poundage';
import RechargeAddress from '@/views/recharge/recharge-address';

export default [
    {
        path: '/recharge/order',
        name: 'RechargeOrder',
        component: RechargeOrder
    },
    // {
    //     path: '/recharge/poundage',
    //     name: 'RechargePoundage',
    //     component: RechargePoundage
    // },
    {
        path: '/recharge/address',
        name: 'RechargeAddress',
        component: RechargeAddress
    }
];
