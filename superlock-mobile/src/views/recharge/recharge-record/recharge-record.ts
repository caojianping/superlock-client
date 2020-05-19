import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { SessionStorage } from 'jts-storage';

import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { RechargeModel } from '@/ts/models';

import { Toast, PullRefresh, List, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const rechargeModule = namespace('recharge');

@Component({
    name: 'RechargeRecord',
    components: { PullRefresh, List, CellGroup, Cell, Header }
})
export default class RechargeRecord extends Vue {
    @rechargeModule.State('rechargeCoin') rechargeCoin!: string;
    @rechargeModule.State('pageNum') pageNum!: number;
    @rechargeModule.State('pageSize') pageSize!: number;
    @rechargeModule.State('recharges') recharges?: Array<RechargeModel>;

    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @rechargeModule.Action('fetchRecharges') fetchRechargesAction!: () => any;

    isPulling: boolean = false; // 是否下拉刷新
    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束

    // 跳转至详情页面
    goDetail(recharge: RechargeModel) {
        this.setStates({ recharge });
        SessionStorage.setItem<RechargeModel>(CONSTANTS.RECHARGE, recharge);
        this.$router.push('/recharge/detail');
    }

    // 获取充值列表
    async fetchRecharges() {
        let recharges = await this.fetchRechargesAction();
        this.isLoading = false;
        this.isFinished = recharges && recharges.length <= 0;
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        if (!this.recharges || isRefresh) {
            this.setStates({ pageNum: 1 });
            await this.fetchRecharges();
        }
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData(true);
        this.isPulling = false;
        Toast('刷新成功');
    }

    mounted() {
        this.fetchData(false);
    }
}
