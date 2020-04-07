import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { PromoteRewardType } from '@/ts/config';
import {
    PromoteRewardPushModel,
    PromoteRewardLockModel,
    PromoteRewardUnlockModel,
    PromoteRewardSaleModel
} from '@/ts/models';

import { Popup, List, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const projectModule = namespace('project');

@Component({
    name: 'RewardList',
    components: { Popup, List, CellGroup, Cell, Header }
})
export default class RewardList extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly type!: PromoteRewardType;

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

    @projectModule.Action('fetchPromoteRewardPushs')
    fetchPromoteRewardPushs!: () => any;
    @projectModule.Action('fetchPromoteRewardLocks')
    fetchPromoteRewardLocks!: () => any;
    @projectModule.Action('fetchPromoteRewardUnlocks')
    fetchPromoteRewardUnlocks!: () => any;
    @projectModule.Action('fetchPromoteRewardSales')
    fetchPromoteRewardSales!: () => any;

    title!: string; // 标题
    isShow: boolean = this.value; // 是否显示弹出框
    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束

    // 关闭弹出框
    closePopup() {
        this.isShow = false;
        this.$emit('close', false);
    }

    // 初始化数据
    async initData() {
        this.title = {
            1: '直推奖励',
            2: '直团队锁仓奖励',
            3: '推广解锁奖励',
            4: '销量达标奖励'
        }[this.type];
    }

    // 获取数据
    async fetchData() {
        let type = this.type,
            funcs = {
                1: this.fetchPromoteRewardPushs,
                2: this.fetchPromoteRewardLocks,
                3: this.fetchPromoteRewardUnlocks,
                4: this.fetchPromoteRewardSales
            },
            list = await funcs[type]();
        this.isLoading = false;
        this.isFinished = list && list.length <= 0;
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            this.initData();
            this.fetchData();
        }
    }
}
