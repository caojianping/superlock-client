import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { CONSTANTS } from '@/ts/config';
import { Clipboard } from '@/ts/common';
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

    // 跳转至客服页面
    goCustomerService() {
        window.location.href = CONSTANTS.CUSTOMER_SERVICE;
    }

    // 处理修改名称组件submit事件
    handleModifyNameSubmit(name: string) {
        let userInfo = Utils.duplicate(this.userInfo);
        userInfo.nickName = name;
        this.setStates({ userInfo });
    }

    mounted() {
        Clipboard.copy('uid', 'UID');
        this.fetchUserInfo();
    }
}
