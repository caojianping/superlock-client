import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import Locales from '@/locales';
import TYPES from '@/store/types';
import { Prompt, From } from '@/ts/common';
import { UserInfoModel, RechargeCoinModel } from '@/ts/models';

import { Toast, PullRefresh, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const i18n = Locales.buildLocale();
const userModule = namespace('user');
const rechargeModule = namespace('recharge');

@Component({
    name: 'RechargeAddress',
    components: { PullRefresh, CellGroup, Cell, Header }
})
export default class RechargeAddress extends Vue {
    @userModule.State('userInfo') userInfo?: UserInfoModel | null;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: (isLoading?: boolean) => any;

    @rechargeModule.State('rechargeCoins') rechargeCoins?: Array<RechargeCoinModel>;
    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @rechargeModule.Action('fetchRechargeCoins') fetchRechargeCoins!: (isLoading?: boolean) => any;

    isPulling: boolean = false; // 是否下拉刷新

    // 跳转至充值码页面
    goCode(rechargeCoin: any) {
        if (!this.userInfo || !this.userInfo.haveFundPasswd) {
            Prompt.info(i18n.tc('COMMON.SETTING_FUND')).then(() => {
                From.setFundFrom('/recharge/address');
                this.$router.push({
                    path: '/security/fund/password',
                    query: { from: '/recharge/address' }
                });
            });
            return;
        } else {
            From.setRechargeFrom('/recharge/address');
            this.$router.push({
                path: `/recharge/code/${rechargeCoin.symbol}`,
                query: { from: '/recharge/address' }
            });
        }
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        Toast.loading({ mask: true, duration: 0, message: i18n.tc('COMMON.LOADING') });
        (!this.userInfo || isRefresh) && (await this.fetchUserInfo());
        (!this.rechargeCoins || isRefresh) && (await this.fetchRechargeCoins());
        Toast.clear();
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
