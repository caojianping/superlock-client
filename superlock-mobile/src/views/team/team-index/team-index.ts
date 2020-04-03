import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import {
    UserLockQuotaModel,
    LockPromoteRateModel,
    ChildModel
} from '@/ts/models';

import { PullRefresh, Toast, List, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const userModule = namespace('user');
const childModule = namespace('child');

@Component({
    name: 'TeamIndex',
    components: { PullRefresh, List, CellGroup, Cell, Header }
})
export default class TeamIndex extends Vue {
    @State('units') units!: Array<string>;
    @State('rateTypes') rateTypes!: Array<string>;

    @userModule.State('userLockQuota')
    userLockQuota?: UserLockQuotaModel | null;
    @userModule.Action('fetchUserLockQuota') fetchUserLockQuota!: () => any;

    @childModule.State('lockPromoteRates') lockPromoteRates!: Array<
        LockPromoteRateModel
    >;

    @childModule.State('pageNum') pageNum!: number;
    @childModule.State('pageSize') pageSize!: number;
    @childModule.State('childs') childs?: Array<ChildModel>;

    @childModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @childModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @childModule.Action('fetchLockPromoteRates')
    fetchLockPromoteRates!: () => any;
    @childModule.Action('fetchChilds') fetchChildsAction!: () => any;

    from: string = ''; // 页面来源
    isPulling: boolean = false; // 是否下拉刷新
    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束

    // 获取下级列表
    async fetchChilds() {
        let childs = await this.fetchChildsAction();
        this.isLoading = false;
        this.isFinished = childs && childs.length <= 0;
    }

    // 获取数据
    async fetchData() {
        Toast.loading({
            mask: true,
            duration: 0,
            message: '加载中...'
        });
        await this.fetchUserLockQuota();
        await this.fetchLockPromoteRates();

        this.setStates({ pageNum: 1 });
        await this.fetchChilds();
        Toast.clear();
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData();
        this.isPulling = false;
        Toast('刷新成功');
    }

    created() {
        let from: any = this.$route.query.from;
        console.log(from);
        this.from = from;
    }

    mounted() {
        this.fetchData();
    }
}
