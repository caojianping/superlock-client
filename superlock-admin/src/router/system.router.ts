import SystemUser from '@/views/system/system-user';
// import SystemGoogle from '@/views/system/system-google';
import SystemPassword from '@/views/system/system-password';

export default [
    {
        path: '/system/user',
        name: 'SystemUser',
        component: SystemUser
    },
    // {
    //     path: '/system/google',
    //     name: 'SystemGoogle',
    //     component: SystemGoogle
    // },
    {
        path: '/system/password',
        name: 'SystemPassword',
        component: SystemPassword
    }
];
