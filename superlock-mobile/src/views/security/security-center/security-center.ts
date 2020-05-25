import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import Locales from '@/locales';
import TYPES from '@/store/types';
import { From } from '@/ts/common';
import { UserInfoModel } from '@/ts/models';

import { Toast, PullRefresh, Icon, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const i18n = Locales.buildLocale();
const userModule = namespace('user');

@Component({
    name: 'SecurityCenter',
    components: { PullRefresh, Icon, CellGroup, Cell, Header }
})
export default class SecurityCenter extends Vue {
    @userModule.State('userInfo') userInfo?: UserInfoModel | null;
    @userModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @userModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: (isLoading?: boolean) => any;

    isPulling: boolean = false; // 是否下拉刷新

    // 跳转至资金密码页面
    goFund() {
        From.setFundFrom('/security/center');
        this.$router.push({
            path: '/security/fund/password',
            query: { from: '/security/center' }
        });
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        (!this.userInfo || isRefresh) && this.fetchUserInfo(true);
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
