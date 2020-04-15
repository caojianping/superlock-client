import PointRecord from '@/views/point/point-record';
import PointAccount from '@/views/point/point-account';

export default [
    {
        path: '/point/record',
        name: 'PointRecord',
        component: PointRecord
    },
    {
        path: '/point/account',
        name: 'PointAccount',
        component: PointAccount
    }
];
