import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace, State } from 'vuex-class';
import { SessionStorage } from 'jts-storage';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { CONSTANTS } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { UserLockQuotaModel, ProjectModel } from '@/ts/models';

import Header from '@/components/common/header';

const userModule = namespace('user');
const lockModule = namespace('lock');

@Component({
    name: 'LockDetail',
    components: { Header }
})
export default class LockDetail extends Vue {
    dateCalculate: Function = Utils.dateCalculate;

    @State('unitTypes') unitTypes!: Array<string>;

    @userModule.State('userLockQuota') userLockQuota?: UserLockQuotaModel | null;
    @userModule.Action('fetchUserLockQuota') fetchUserLockQuota!: () => any;

    @lockModule.State('lockProject') lockProject!: ProjectModel;
    @lockModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @lockModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    // 初始化数据
    initData() {
        let lockProjectCache = SessionStorage.getItem<ProjectModel>(
            CONSTANTS.LOCK_PROJECT
        );
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
        this.fetchUserLockQuota();
    }
}
