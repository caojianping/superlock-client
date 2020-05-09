import UserLog from '@/views/log/user-log';
import SystemLog from '@/views/log/system-log';

export default [
    {
        path: '/log/user',
        name: 'UserLog',
        component: UserLog
    },
    {
        path: '/log/system',
        name: 'SystemLog',
        component: SystemLog
    }
];
