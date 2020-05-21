import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { PromoteRewardType } from '@/ts/config';
import { PromoteRewardPushModel, PromoteRewardLockModel, PromoteRewardUnlockModel, PromoteRewardSaleModel } from '@/ts/models';

import { Toast, PullRefresh, List, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const projectModule = namespace('project');

@Component({
    name: 'RewardRecord',
    components: { PullRefresh, List, CellGroup, Cell, Header }
})
export default class RewardRecord extends Vue {
    @projectModule.State('pageNum') pageNum!: number;
    @projectModule.State('pageSize') pageSize!: number;
    @projectModule.State('rewards') rewards?: Array<
        PromoteRewardPushModel | PromoteRewardLockModel | PromoteRewardUnlockModel | PromoteRewardSaleModel
    >;
    @projectModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @projectModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @projectModule.Action('fetchPromoteRewards') fetchPromoteRewardsAction!: (type: PromoteRewardType) => any;

    type: PromoteRewardType = PromoteRewardType.Push; // 奖励类型
    title!: string; // 标题

    isPulling: boolean = false; // 是否下拉刷新
    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束

    // 获取奖励列表
    async fetchPromoteRewards() {
        let rewards = await this.fetchPromoteRewardsAction(this.type);
        this.isLoading = false;
        this.isFinished = rewards && rewards.length <= 0;
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        if (!this.rewards || isRefresh) {
            this.setStates({ pageNum: 1 });
            await this.fetchPromoteRewards();
        }
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData(true);
        this.isPulling = false;
        Toast('刷新成功');
    }

    // 初始化数据
    async initData() {
        let params = this.$route.params || {},
            type = Utils.digitConvert(params.type) || PromoteRewardType.Push;
        this.type = type;
        this.title = {
            1: '直推奖励',
            2: '团队锁仓奖励',
            3: '推广解锁奖励',
            4: '销量达标奖励'
        }[type];
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchData(false);
    }
}
