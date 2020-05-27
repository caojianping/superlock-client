import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { SessionStorage } from 'jts-storage';

import Locales from '@/locales';
import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { UserLockQuotaModel, LockPromoteRateModel, ChildModel } from '@/ts/models';

import { Toast, PullRefresh, List, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const i18n = Locales.buildLocale();
const userModule = namespace('user');
const childModule = namespace('child');

@Component({
    name: 'TeamIndex',
    components: { PullRefresh, List, CellGroup, Cell, Header }
})
export default class TeamIndex extends Vue {
    @State('unitTypes') unitTypes!: Array<string>;
    @State('rateTypes') rateTypes!: Array<string>;

    @userModule.State('userLockQuota') userLockQuota?: UserLockQuotaModel | null;
    @userModule.Action('fetchUserLockQuota') fetchUserLockQuota!: () => any;

    @childModule.State('lockPromoteRates') lockPromoteRates!: Array<LockPromoteRateModel>;
    @childModule.State('pageNum') pageNum!: number;
    @childModule.State('pageSize') pageSize!: number;
    @childModule.State('childs') childs?: Array<ChildModel>;

    @childModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @childModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @childModule.Action('fetchLockPromoteRates') fetchLockPromoteRates!: () => any;
    @childModule.Action('fetchChilds') fetchChildsAction!: () => any;

    from: string = ''; // 页面来源
    isPulling: boolean = false; // 是否下拉刷新
    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束

    get width() {
        let count = this.lockPromoteRates.length;
        if (count >= 3) return 6.64583;
        else if (count === 2) return 9.96875;
        else if (count === 1) return 19.9375;
        else return 0;
    }

    // 跳转至详情页面
    goDetail(child: ChildModel) {
        this.setStates({ child });
        SessionStorage.setItem<ChildModel>(CONSTANTS.CHILD, child);
        this.$router.push('/team/child');
    }

    // 获取下级列表
    async fetchChilds() {
        let childs = await this.fetchChildsAction();
        this.isLoading = false;
        this.isFinished = childs && childs.length <= 0;
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        Toast.loading({ mask: true, duration: 0, message: i18n.tc('COMMON.LOADING') });
        (!this.userLockQuota || isRefresh) && (await this.fetchUserLockQuota());
        (!this.lockPromoteRates || this.lockPromoteRates.length <= 0 || isRefresh) && (await this.fetchLockPromoteRates());

        if (!this.childs || isRefresh) {
            this.setStates({ pageNum: 1 });
            await this.fetchChilds();
        }
        Toast.clear();
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData(true);
        this.isPulling = false;
        Toast(i18n.tc('COMMON.REFRESH_SUCCESS'));
    }

    // 初始化数据
    initData() {
        let query: any = this.$route.query;
        this.from = query.from || '';
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchData(false);
    }
}
