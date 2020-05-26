import MineIndex from '@/views/mine/mine-index';
import InviteFriend from '@/views/mine/invite-friend';
import HelpCenter from '@/views/mine/help-center';
import MessageCenter from '@/views/mine/message-center';
import SettingCenter from '@/views/mine/setting-center';
import LangCenter from '@/views/mine/lang-center';

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
    },
    {
        path: '/lang/center',
        name: 'LangCenter',
        component: LangCenter
    }
];
