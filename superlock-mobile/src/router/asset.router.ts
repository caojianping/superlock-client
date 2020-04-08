import AssetIndex from '@/views/asset/asset-index';
import RewardRecord from '@/views/asset/reward-record';

export default [
    {
        path: '/asset/index',
        name: 'AssetIndex',
        component: AssetIndex
    },
    {
        path: '/reward/record/:type',
        name: 'RewardRecord',
        component: RewardRecord
    }
];
