import Vue from 'vue';
import { namespace, State, Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import Locales from '@/locales';
import TYPES from '@/store/types';
import { From, Clipboard } from '@/ts/common';
import { ExchangeRateModel } from '@/ts/models';

import { Toast, Button } from 'vant';
import Header from '@/components/common/header';
import RechargePrompt from '@/components/recharge/recharge-prompt';

const i18n = Locales.buildLocale();
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

    from: string = ''; // 页面来源

    // 充值地址二维码
    get rechargeAddressQrcode() {
        let rechargeCoin = this.rechargeCoin || '',
            rechargeAddress = this.rechargeAddress || '';
        return rechargeAddress.indexOf('bcb') === 0 ? `bcbpay://${rechargeCoin}/${rechargeAddress}/*` : rechargeAddress;
    }

    // 获取数据
    async fetchData() {
        Toast.loading({ mask: true, duration: 0, message: i18n.tc('COMMON.LOADING') });
        let rechargeCoin = this.rechargeCoin;
        if (rechargeCoin !== 'BCB') {
            await this.fetchMinAmount();
            await this.fetchExchangeRate({ fromCoin: rechargeCoin, toCoin: 'BCB' });
        }

        await this.fetchRechargeAddress();
        Toast.clear();

        Clipboard.copy('rechargeAddress', i18n.tc('COMMON.RECHARGE_ADDRESS'));// id添加前缀，防止复制元素重复
    }

    // 初始化数据
    initData() {
        let params: any = this.$route.params || {};
        this.setStates({ rechargeCoin: params.coin || '' });

        let query: any = this.$route.query || {};
        this.from = query.from || From.getRechargeFrom();
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchData();
    }
}
