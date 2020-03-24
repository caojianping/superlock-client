import MineIndex from '@/views/mine/mine-index';
import TeamMgmt from '@/views/mine/team-mgmt';
import InviteFriend from '@/views/mine/invite-friend';
import SecurityCenter from '@/views/mine/security-center';
import MessageCenter from '@/views/mine/message-center';
import SettingCenter from '@/views/mine/setting-center';

export default [
    {
        path: '/mine/index',
        name: 'MineIndex',
        component: MineIndex
    },
    {
        path: '/team/mgmt',
        name: 'TeamMgmt',
        component: TeamMgmt
    },
    {
        path: '/invite/friend',
        name: 'InviteFriend',
        component: InviteFriend
    },
    {
        path: '/security/center',
        name: 'SecurityCenter',
        component: SecurityCenter
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
