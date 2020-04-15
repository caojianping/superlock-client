import Carrierlist from '@/views/carrier/carrier-list';
import RebateOrder from '@/views/carrier/rebate-order';
import FlashOrder from '@/views/carrier/flash-order';
import WithdrawOrder from '@/views/carrier/withdraw-order';

export default [
    {
        path: '/carrier/list',
        name: 'Carrierlist',
        component: Carrierlist
    },
    {
        path: '/carrier/rebate/order',
        name: 'RebateOrder',
        component: RebateOrder
    },
    {
        path: '/carrier/flash/order',
        name: 'FlashOrder',
        component: FlashOrder
    },
    {
        path: '/carrier/withdraw/order',
        name: 'WithdrawOrder',
        component: WithdrawOrder
    }
];
