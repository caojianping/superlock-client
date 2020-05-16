import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { Prompt, From } from '@/ts/common';
import { UserInfoModel, RechargeCoinModel } from '@/ts/models';

import { Toast, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const userModule = namespace('user');
const rechargeModule = namespace('recharge');

@Component({
    name: 'RechargeAddress',
    components: { CellGroup, Cell, Header }
})
export default class RechargeAddress extends Vue {
    @userModule.State('userInfo') userInfo!: UserInfoModel;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: () => any;

    @rechargeModule.State('rechargeCoins') rechargeCoins?: Array<RechargeCoinModel>;
    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @rechargeModule.Action('fetchRechargeCoins') fetchRechargeCoins!: (isLoading?: boolean) => any;

    goCode(rechargeCoin: any) {
        let haveFundPasswd = this.userInfo.haveFundPasswd;
        if (!haveFundPasswd) {
            Prompt.info('为保障您的资金安全，请先设置一下资金密码').then(() => {
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

    async fetchData() {
        Toast.loading({ mask: true, duration: 0, message: '加载中...' });
        await this.fetchUserInfo();
        await this.fetchRechargeCoins();
        Toast.clear();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        this.fetchData();
    }
}
