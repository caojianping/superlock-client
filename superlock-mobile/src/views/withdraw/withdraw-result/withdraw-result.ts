import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import Locales from '@/locales';
import Utils from '@/ts/utils';

import { Button } from 'vant';
import Header from '@/components/common/header';

const i18n = Locales.buildLocale();

@Component({
    name: 'WithdrawResult',
    components: { Button, Header }
})
export default class WithdrawResult extends Vue {
    type: number = -1;
    address: string = '';
    amount: string = '';
    msg: string = '';

    get title() {
        return [i18n.tc('WITHDRAW.WITHDRAW_FAILURE'), i18n.tc('WITHDRAW.WITHDRAW_SUCCESS')][this.type] || '';
    }

    // 初始化数据
    initData() {
        let params: any = this.$route.params || {};
        this.type = Utils.digitConvert(params.type);

        let query: any = this.$route.query || {};
        if (this.type === 0) {
            this.msg = query.msg || '';
        } else if (this.type === 1) {
            this.address = query.address || '';
            this.amount = query.amount || '';
        }
    }

    created() {
        this.initData();
    }
}
