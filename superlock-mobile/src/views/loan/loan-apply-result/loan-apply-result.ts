import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { From } from '@/ts/common';
import { Button } from 'vant';
import Header from '@/components/common/header';

@Component({
    name: 'LoanApplyResult',
    components: { Button, Header }
})
export default class LoanApplyResult extends Vue {
    id: string = '';

    // 跳转至贷款详情页面
    goLoanDetail() {
        From.setLoanFrom('/loan/index');
        this.$router.push(`/loan/detail/${this.id}`);
    }

    // 初始化数据
    initData() {
        let params: any = this.$route.params || {};
        this.id = params.id;
    }

    created() {
        this.initData();
    }
}
