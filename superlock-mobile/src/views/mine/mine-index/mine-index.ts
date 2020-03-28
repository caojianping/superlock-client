import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { UserInfoModel } from '@/ts/models';

import { Icon, CellGroup, Cell } from 'vant';
import Navs from '@/components/common/navs';
import ModifyName from '@/components/user/modify-name';

const userModule = namespace('user');

@Component({
    name: 'MineIndex',
    components: { Icon, CellGroup, Cell, Navs, ModifyName }
})
export default class MineIndex extends Vue {
    @userModule.State('userInfo') userInfo!: UserInfoModel;
    @userModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @userModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: () => any;

    isShow: boolean = false;

    // 处理修改名称组件submit事件
    handleModifyNameSubmit(nickname: string) {
        let userInfo = Utils.duplicate(this.userInfo);
        userInfo.nickName = nickname;
        this.setStates({ userInfo });
    }

    mounted() {
        this.fetchUserInfo();
    }
}
