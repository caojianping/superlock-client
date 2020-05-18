import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component, Model, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { Prompt, From } from '@/ts/common';
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

    @userModule.State('userInfo') userInfo?: UserInfoModel | null;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: (isLoading?: boolean) => any;

    @rechargeModule.State('rechargeCoins') rechargeCoins?: Array<RechargeCoinModel>;
    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @rechargeModule.Action('fetchRechargeCoins') fetchRechargeCoins!: (isLoading?: boolean) => any;

    isShow: boolean = this.value;
    isSpinning: boolean = false;

    // 处理弹出框close事件
    handlePopupClose() {
        this.$emit('close', false);
    }

    goCode(rechargeCoin: any) {
        if (!this.userInfo || !this.userInfo.haveFundPasswd) {
            Prompt.info('为保障您的资金安全，请先设置一下资金密码').then(() => {
                From.setFundFrom('/asset/index');
                this.$router.push({
                    path: '/security/fund/password',
                    query: { from: '/asset/index' }
                });
            });
            return;
        } else {
            From.setRechargeFrom('/asset/index');
            this.$router.push({
                path: `/recharge/code/${rechargeCoin.symbol}`,
                query: { from: '/asset/index' }
            });
        }
    }

    // 获取数据
    async fetchData() {
        !this.userInfo && (await this.fetchUserInfo());
        
        let rechargeCoins = this.rechargeCoins;
        if (!rechargeCoins || rechargeCoins.length <= 0) {
            this.isSpinning = true;
            await this.fetchRechargeCoins();
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
