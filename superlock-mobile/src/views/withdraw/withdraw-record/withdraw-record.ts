import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { SessionStorage } from 'jts-storage';

import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { WithdrawModel } from '@/ts/models';

import { Toast, PullRefresh, List, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const withdrawModule = namespace('withdraw');

@Component({
    name: 'WithdrawRecord',
    components: { PullRefresh, List, CellGroup, Cell, Header }
})
export default class WithdrawRecord extends Vue {
    @withdrawModule.State('withdraws') withdraws?: Array<WithdrawModel>;
    @withdrawModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @withdrawModule.Mutation(TYPES.CLEAR_STATES) clearStates!: (withoutSelected: boolean) => any;
    @withdrawModule.Action('fetchWithdraws') fetchWithdrawsAction!: () => any;

    isPulling: boolean = false; // 是否下拉刷新
    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束

    // 跳转至详情页面
    goDetail(withdraw: WithdrawModel) {
        this.setStates({ withdraw });
        SessionStorage.setItem<WithdrawModel>(CONSTANTS.WITHDRAW, withdraw);
        this.$router.push('/withdraw/detail');
    }

    // 获取提现列表
    async fetchWithdraws() {
        let withdraws = await this.fetchWithdrawsAction();
        this.isLoading = false;
        this.isFinished = withdraws && withdraws.length <= 0;
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        if (!this.withdraws || isRefresh) {
            this.setStates({ pageNum: 1 });
            await this.fetchWithdraws();
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
