import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import Locales from '@/locales';
import TYPES from '@/store/types';
import { LockInterestModel } from '@/ts/models';

import { Toast, PullRefresh, List, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const i18n = Locales.buildLocale();
const lockModule = namespace('lock');

@Component({
    name: 'LockInterests',
    components: { PullRefresh, List, CellGroup, Cell, Header }
})
export default class LockInterests extends Vue {
    @lockModule.State('id') id!: string;
    @lockModule.State('pageNum') pageNum!: number;
    @lockModule.State('pageSize') pageSize!: number;
    @lockModule.State('lockInterests') lockInterests?: Array<LockInterestModel>;

    @lockModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @lockModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @lockModule.Action('fetchLockInterests') fetchLockInterestsAction!: () => any;

    isPulling: boolean = false; // 是否下拉刷新
    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束

    // 获取锁仓利息列表
    async fetchLockInterests() {
        let lockInterests = await this.fetchLockInterestsAction();
        this.isLoading = false;
        this.isFinished = lockInterests && lockInterests.length <= 0;
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        if (!this.lockInterests || isRefresh) {
            this.setStates({ pageNum: 1 });
            await this.fetchLockInterests();
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
        // 利息页面传递的id不一样，需要刷新
        this.fetchData(true);
    }
}
