import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { SessionStorage } from 'jts-storage';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { CONSTANTS } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { UserLockQuotaModel, ProjectModel } from '@/ts/models';

import { Toast, PullRefresh } from 'vant';
import Header from '@/components/common/header';

const userModule = namespace('user');
const lockModule = namespace('lock');

@Component({
    name: 'LockIntro',
    components: { PullRefresh, Header }
})
export default class LockIntro extends Vue {
    @State('unitTypes') unitTypes!: Array<string>;

    @userModule.State('userLockQuota') userLockQuota?: UserLockQuotaModel | null;
    @userModule.Action('fetchUserLockQuota') fetchUserLockQuota!: () => any;

    @lockModule.State('lockProject') lockProject?: ProjectModel | null;
    @lockModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @lockModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    dateCalculate: Function = Utils.dateCalculate;

    isPulling: boolean = false; // 是否下拉刷新

    // 获取数据
    async fetchData(isRefresh: boolean) {
        (!this.userLockQuota || isRefresh) && (await this.fetchUserLockQuota());
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData(true);
        this.isPulling = false;
        Toast('刷新成功');
    }

    // 初始化数据
    initData() {
        let lockProjectCache = SessionStorage.getItem<ProjectModel>(CONSTANTS.LOCK_PROJECT);
        if (!lockProjectCache) {
            Prompt.error('异常的锁仓项目信息，数据丢失');
            this.$router.push('/home/index');
            return;
        }

        this.setStates({ lockProject: lockProjectCache });
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchData(false);
    }
}
