import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { SessionStorage } from 'jts-storage';

import Locales from '@/locales';
import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { LoanBaseInfoModel, LoanableLockModel } from '@/ts/models';

import { Toast, PullRefresh, List, CellGroup, Cell, Button } from 'vant';
import Header from '@/components/common/header';
import LoanBanner from '@/components/common/loan-banner';

const i18n = Locales.buildLocale();
const loanModule = namespace('loan');

@Component({
    name: 'LoanIndex',
    components: { PullRefresh, List, CellGroup, Cell, Button, Header, LoanBanner }
})
export default class LoanIndex extends Vue {
    @loanModule.State('loanFlags') loanFlags!: Map<number, string>;
    @loanModule.State('loanBaseInfo') loanBaseInfo?: LoanBaseInfoModel | null;
    @loanModule.State('pageNum') pageNum!: number;
    @loanModule.State('pageSize') pageSize!: number;
    @loanModule.State('loanableLocks') loanableLocks?: Array<LoanableLockModel>;

    @loanModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @loanModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @loanModule.Action('fetchLoanBaseInfo') fetchLoanBaseInfo!: () => any;
    @loanModule.Action('fetchLoanableLocks') fetchLoanableLocksAction!: () => any;

    isCache: boolean = false; // 是否需要缓存
    isPulling: boolean = false; // 是否下拉刷新
    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束

    // 跳转至申请贷款页面
    goApply(loanableLock: LoanableLockModel) {
        if (loanableLock.loanFlag !== 1) return;

        this.setStates({ loanableLock });
        SessionStorage.setItem<LoanableLockModel>(CONSTANTS.LOANABLE_LOCK, loanableLock);
        this.$router.push('/loan/apply');
    }

    // 获取可贷款的锁仓列表
    async fetchLoanableLocks() {
        let loanableLocks = await this.fetchLoanableLocksAction();
        this.isLoading = false;
        this.isFinished = loanableLocks && loanableLocks.length <= 0;
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        Toast.loading({ mask: true, duration: 0, message: i18n.tc('COMMON.LOADING') });
        (!this.loanBaseInfo || isRefresh) && (await this.fetchLoanBaseInfo());

        if (!this.loanableLocks || isRefresh) {
            this.setStates({ pageNum: 1 });
            await this.fetchLoanableLocks();
        }
        Toast.clear();
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData(true);
        this.isPulling = false;
        Toast(i18n.tc('COMMON.REFRESH_SUCCESS'));
    }

    created() {
        let query: any = this.$route.query || {};
        this.isCache = Boolean(query.isCache);
    }

    mounted() {
        this.fetchData(!this.isCache);
    }
}
