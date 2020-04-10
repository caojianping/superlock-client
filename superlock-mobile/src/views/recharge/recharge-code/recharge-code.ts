import Vue from 'vue';
import { namespace, State, Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import ClipboardJS from 'clipboard';
import TYPES from '@/store/types';
import { Prompt } from '@/ts/common';
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
    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @rechargeModule.Action('fetchRechargeAddress') fetchRechargeAddress!: () => any;

    // 充值地址二维码
    get rechargeAddressQrcode() {
        let rechargeCoin = this.rechargeCoin || '',
            rechargeAddress = this.rechargeAddress || '';
        return rechargeAddress.indexOf('bcb') > -1 ? `bcbpay://${rechargeCoin}/${rechargeAddress}/*` : rechargeAddress;
    }

    // 初始化数据
    initData() {
        let params: any = this.$route.params || {};
        this.setStates({ rechargeCoin: params.coin || '' });
    }

    // 复制地址
    copyAddress() {
        let address = document.getElementById('address'),
            clipboard = new ClipboardJS(address);

        clipboard.on('success', function(e) {
            Prompt.success('充值地址复制成功');
        });

        clipboard.on('error', function(e) {
            Prompt.error('充值地址复制失败');
        });
    }

    // 获取数据
    async fetchData() {
        Toast.loading({
            mask: true,
            duration: 0,
            message: '加载中...'
        });
        let rechargeCoin = this.rechargeCoin;
        if (rechargeCoin !== 'BCB') {
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
        this.copyAddress();
        this.fetchData();
    }
}
