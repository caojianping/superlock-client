import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Utils from '@/ts/utils';

import { Button } from 'vant';
import Header from '@/components/common/header';

@Component({
    name: 'TransferResult',
    components: { Button, Header }
})
export default class TransferResult extends Vue {
    type: number = -1;
    amount: string = '';
    msg: string = '';

    get title() {
        return ['转账失败', '转账成功'][this.type] || '';
    }

    // 初始化数据
    initData() {
        let params: any = this.$route.params || {};
        this.type = Utils.digitConvert(params.type);

        let query: any = this.$route.query || {};
        if (this.type === 0) {
            this.msg = query.msg || '';
        } else if (this.type === 1) {
            this.amount = query.amount || '';
        }
    }

    created() {
        this.initData();
    }
}
