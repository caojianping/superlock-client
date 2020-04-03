import MineIndex from '@/views/mine/mine-index';
import InviteFriend from '@/views/mine/invite-friend';
import HelpCenter from '@/views/mine/help-center';
import MessageCenter from '@/views/mine/message-center';
import SettingCenter from '@/views/mine/setting-center';

export default [
    {
        path: '/mine/index',
        name: 'MineIndex',
        component: MineIndex
    },
    {
        path: '/invite/friend',
        name: 'InviteFriend',
        component: InviteFriend
    },
    {
        path: '/help/center',
        name: 'HelpCenter',
        component: HelpCenter
    },
    {
        path: '/message/center',
        name: 'MessageCenter',
        component: MessageCenter
    },
    {
        path: '/setting/center',
        name: 'SettingCenter',
        component: SettingCenter
    }
];
