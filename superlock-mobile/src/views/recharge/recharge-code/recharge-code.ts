import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import ClipboardJS from 'clipboard';

import TYPES from '@/store/types';
import { Prompt } from '@/ts/common';

import { Button } from 'vant';
import Header from '@/components/common/header';
import RechargePrompt from '@/components/recharge/recharge-prompt';

const rechargeModule = namespace('recharge');

@Component({
    name: 'RechargeCode',
    components: { Button, Header, RechargePrompt }
})
export default class RechargeCode extends Vue {
    @rechargeModule.State('rechargeCoin') rechargeCoin!: string;
    @rechargeModule.State('rechargeAddress') rechargeAddress!: string;

    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (
        payload: any
    ) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @rechargeModule.Action('fetchRechargeAddress')
    fetchRechargeAddress!: () => any;

    // 复制地址
    copyAddress() {
        let copy = document.getElementById('copy'),
            clipboard = new ClipboardJS(copy);

        clipboard.on('success', function(e) {
            Prompt.success('充值地址复制成功');
        });

        clipboard.on('error', function(e) {
            Prompt.error('充值地址复制失败');
        });
    }

    // 获取数据
    async fetchData() {
        await this.fetchRechargeAddress();
        this.copyAddress();
    }

    created() {
        let coin = this.$route.params.coin;
        this.setStates({ rechargeCoin: coin });
    }

    mounted() {
        this.fetchData();
    }
}
