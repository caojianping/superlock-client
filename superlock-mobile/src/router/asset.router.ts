import AssetIndex from '@/views/asset/asset-index';
import AssetIncome from '@/views/asset/asset-income';
import AssetRecord from '@/views/asset/asset-record';
import AssetDetail from '@/views/asset/asset-detail';

export default [
    {
        path: '/asset/index',
        name: 'AssetIndex',
        component: AssetIndex
    },
    {
        path: '/asset/income',
        name: 'AssetIncome',
        component: AssetIncome
    },
    {
        path: '/asset/record',
        name: 'AssetRecord',
        component: AssetRecord
    },
    {
        path: '/asset/detail',
        name: 'AssetDetail',
        component: AssetDetail
    }
];
