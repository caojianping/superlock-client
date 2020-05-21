import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Utils from '@/ts/utils';

import Locales from '@/locales';
import { Button } from 'vant';
import Header from '@/components/common/header';

const i18n = Locales.buildLocale();

@Component({
    name: 'LoanRepayResult',
    components: { Button, Header }
})
export default class LoanRepayResult extends Vue {
    type: number = -1;
    msg: string = '';

    get title() {
        return ['还款失败', '还款成功'][this.type] || '';
    }

    // 初始化数据
    initData() {
        let params: any = this.$route.params || {};
        this.type = Utils.digitConvert(params.type);

        let query: any = this.$route.query || {};
        this.msg = query.msg || '';
    }

    created() {
        this.initData();
    }
}
