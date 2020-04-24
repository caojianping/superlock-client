import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component, Model, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { Prompt, Token } from '@/ts/common';
import { UserInfoModel, RechargeCoinModel } from '@/ts/models';

import { Popup, CellGroup, Cell } from 'vant';
import Spin from '@/components/common/spin';

const userModule = namespace('user');
const rechargeModule = namespace('recharge');

@Component({
    name: 'RechargeCoins',
    components: { Popup, CellGroup, Cell, Spin }
})
export default class RechargeCoins extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model

    @userModule.State('userInfo') userInfo!: UserInfoModel;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: () => any;

    @rechargeModule.State('rechargeCoins') rechargeCoins?: Array<RechargeCoinModel>;
    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @rechargeModule.Action('fetchRechargeCoins') fetchRechargeCoins!: (isLoading: boolean) => any;

    isShow: boolean = this.value;
    isSpinning: boolean = false;

    // 处理弹出框close事件
    handlePopupClose() {
        this.$emit('close', false);
    }

    goCode(rechargeCoin: any) {
        let haveFundPasswd = this.userInfo.haveFundPasswd;
        if (!haveFundPasswd) {
            Prompt.info('为保障您的资金安全，请先设置一下资金密码').then(() => {
                Token.setFundFrom('/asset/index');
                this.$router.push({
                    path: '/security/fund/password',
                    query: { from: '/asset/index' }
                });
            });
            return;
        } else {
            this.$router.push(`/recharge/code/${rechargeCoin.symbol}`);
        }
    }

    // 获取数据
    async fetchData() {
        await this.fetchUserInfo();
        let rechargeCoins = this.rechargeCoins;
        if (!rechargeCoins || rechargeCoins.length <= 0) {
            this.isSpinning = true;
            await this.fetchRechargeCoins(false);
            this.isSpinning = false;
        }
    }

    mounted() {
        this.fetchData();
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            this.fetchData();
        }
    }
}
