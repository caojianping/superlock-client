import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { PromoteRewardType } from '@/ts/config';
import {
    PromoteRewardPushModel,
    PromoteRewardLockModel,
    PromoteRewardUnlockModel,
    PromoteRewardSaleModel,
} from '@/ts/models';

import { List, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const projectModule = namespace('project');

@Component({
    name: 'RewardRecord',
    components: { List, CellGroup, Cell, Header },
})
export default class RewardRecord extends Vue {
    @projectModule.State('pageNum') pageNum!: number;
    @projectModule.State('pageSize') pageSize!: number;
    @projectModule.State('rewards') rewards?: Array<
        | PromoteRewardPushModel
        | PromoteRewardLockModel
        | PromoteRewardUnlockModel
        | PromoteRewardSaleModel
    >;

    @projectModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @projectModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @projectModule.Action('fetchPromoteRewards') fetchPromoteRewards!: (
        type: PromoteRewardType
    ) => any;

    type: PromoteRewardType = PromoteRewardType.Push; // 奖励类型
    title!: string; // 标题
    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束

    // 初始化数据
    async initData() {
        let params = this.$route.params || {},
            ntype = Number(params.type),
            type = isNaN(ntype) ? PromoteRewardType.Push : ntype;
        this.type = type;
        this.title = {
            1: '直推奖励',
            2: '团队锁仓奖励',
            3: '推广解锁奖励',
            4: '销量达标奖励',
        }[type];
    }

    // 获取数据
    async fetchData() {
        let rewards = await this.fetchPromoteRewards(this.type);
        this.isLoading = false;
        this.isFinished = rewards && rewards.length <= 0;
    }

    created() {
        this.clearStates();
        this.initData();
    }

    mounted() {
        this.fetchData();
    }
}
