import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import Locales from '@/locales';
import { CONSTANTS } from '@/ts/config';
import { Clipboard } from '@/ts/common';
import { UserInfoModel } from '@/ts/models';

import { Toast, PullRefresh, Icon, CellGroup, Cell } from 'vant';
import Navs from '@/components/common/navs';
import ModifyName from '@/components/mine/modify-name';

const i18n = Locales.buildLocale();
const userModule = namespace('user');

@Component({
    name: 'MineIndex',
    components: { PullRefresh, Icon, CellGroup, Cell, Navs, ModifyName }
})
export default class MineIndex extends Vue {
    @userModule.State('userInfo') userInfo?: UserInfoModel | null;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: (isLoading?: boolean) => any;

    isPulling: boolean = false; // 是否下拉刷新
    isShow: boolean = false; // 是否显示修改昵称组件

    // 跳转至客服页面
    goCustomerService() {
        window.location.href = CONSTANTS.CUSTOMER_SERVICE;
    }

    // 处理修改名称组件submit事件
    handleModifyNameSubmit() {
        this.fetchUserInfo(true);
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        (!this.userInfo || isRefresh) && (await this.fetchUserInfo(true));
        Clipboard.copy('mineUid', 'UID');// id添加前缀，防止复制元素重复
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData(true);
        this.isPulling = false;
        Toast(i18n.tc('COMMON.REFRESH_SUCCESS'));
    }

    mounted() {
        this.fetchData(false);
    }
}
