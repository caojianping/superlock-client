import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import Locales from '@/locales';
import TYPES from '@/store/types';
import { LoanInterestModel } from '@/ts/models';

import { Toast, PullRefresh, List, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const i18n = Locales.buildLocale();
const loanModule = namespace('loan');

@Component({
    name: 'LoanInterests',
    components: { PullRefresh, List, CellGroup, Cell, Header }
})
export default class LoanInterests extends Vue {
    @loanModule.State('id') id!: string;
    @loanModule.State('pageNum') pageNum!: number;
    @loanModule.State('pageSize') pageSize!: number;
    @loanModule.State('loanInterests') loanInterests?: Array<LoanInterestModel>;

    @loanModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loanModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @loanModule.Action('fetchLoanInterests') fetchLoanInterestsAction!: () => any;

    isPulling: boolean = false; // 是否下拉刷新
    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束

    // 获取贷款利息列表
    async fetchLoanInterests() {
        let loanInterests = await this.fetchLoanInterestsAction();
        this.isLoading = false;
        this.isFinished = loanInterests && loanInterests.length <= 0;
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        if (!this.loanInterests || isRefresh) {
            this.setStates({ pageNum: 1 });
            await this.fetchLoanInterests();
        }
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData(true);
        this.isPulling = false;
        Toast(i18n.tc('COMMON.REFRESH_SUCCESS'));
    }

    // 初始化数据
    initData() {
        let params: any = this.$route.params || {};
        this.setStates({ id: params.id });
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchData(false);
    }
}
