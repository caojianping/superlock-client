import Vue from 'vue';
import { namespace, State, Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { From, Clipboard } from '@/ts/common';
import { ExchangeRateModel } from '@/ts/models';

import { Toast, Button } from 'vant';
import Header from '@/components/common/header';
import RechargePrompt from '@/components/recharge/recharge-prompt';

const rechargeModule = namespace('recharge');

@Component({
    name: 'RechargeCode',
    components: { Button, Header, RechargePrompt }
})
export default class RechargeCode extends Vue {
    @State('exchangeRate') exchangeRate?: ExchangeRateModel | null;
    @Action('fetchExchangeRate') fetchExchangeRate!: (payload: any) => any;

    @rechargeModule.State('rechargeCoin') rechargeCoin!: string;
    @rechargeModule.State('rechargeAddress') rechargeAddress!: string;
    @rechargeModule.State('minAmount') minAmount!: number;
    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @rechargeModule.Action('fetchRechargeAddress') fetchRechargeAddress!: () => any;
    @rechargeModule.Action('fetchMinAmount') fetchMinAmount!: () => any;

    from: string = '';

    // 充值地址二维码
    get rechargeAddressQrcode() {
        let rechargeCoin = this.rechargeCoin || '',
            rechargeAddress = this.rechargeAddress || '';
        return rechargeAddress.indexOf('bcb') === 0 ? `bcbpay://${rechargeCoin}/${rechargeAddress}/*` : rechargeAddress;
    }

    // 初始化数据
    initData() {
        let params: any = this.$route.params || {};
        this.setStates({ rechargeCoin: params.coin || '' });

        let query: any = this.$route.query || {};
        this.from = query.from || From.getRechargeFrom();
    }

    // 获取数据
    async fetchData() {
        Toast.loading({ mask: true, duration: 0, message: '加载中...' });
        let rechargeCoin = this.rechargeCoin;
        if (rechargeCoin !== 'BCB') {
            await this.fetchMinAmount();
            await this.fetchExchangeRate({ fromCoin: rechargeCoin, toCoin: 'BCB' });
        }
        await this.fetchRechargeAddress();
        Toast.clear();
    }

    created() {
        this.clearStates();
        this.initData();
    }

    mounted() {
        Clipboard.copy('address', '充值地址');
        this.fetchData();
    }
}
