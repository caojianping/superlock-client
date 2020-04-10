import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { SessionStorage } from 'jts-storage';
import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { WithdrawModel } from '@/ts/models';

import { List, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const withdrawModule = namespace('withdraw');

@Component({
    name: 'WithdrawRecord',
    components: { List, CellGroup, Cell, Header }
})
export default class WithdrawRecord extends Vue {
    @withdrawModule.State('withdraws') withdraws?: Array<WithdrawModel>;
    @withdrawModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @withdrawModule.Mutation(TYPES.CLEAR_STATES) clearStates!: (withoutSelected: boolean) => any;
    @withdrawModule.Action('fetchWithdraws') fetchWithdraws!: () => any;

    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束

    // 跳转至详情页面
    goDetail(withdraw: WithdrawModel) {
        SessionStorage.setItem<WithdrawModel>(CONSTANTS.WITHDRAW, withdraw);
        this.$router.push(`/withdraw/detail/${withdraw.orderId}`);
    }

    // 获取数据
    async fetchData() {
        let recharges = await this.fetchWithdraws();
        this.isLoading = false;
        this.isFinished = recharges && recharges.length <= 0;
    }

    created() {
        this.clearStates(true);
    }

    mounted() {
        this.fetchData();
    }
}
