import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { WithdrawModel } from '@/ts/models';

import { List, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const withdrawModule = namespace('withdraw');

@Component({
    name: 'WithdrawRecord',
    components: { List, CellGroup, Cell, Header }
})
export default class WithdrawRecord extends Vue {
    @withdrawModule.State('pageNum') pageNum!: number;
    @withdrawModule.State('pageSize') pageSize!: number;
    @withdrawModule.State('withdraws') withdraws?: Array<WithdrawModel>;

    @withdrawModule.Mutation(TYPES.SET_STATES) setStates!: (
        payload: any
    ) => any;
    @withdrawModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @withdrawModule.Action('fetchWithdraws') fetchWithdraws!: () => any;

    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束

    // 获取数据
    async fetchData() {
        let recharges = await this.fetchWithdraws();
        this.isLoading = false;
        this.isFinished = recharges && recharges.length <= 0;
    }

    mounted() {
        this.fetchData();
    }
}
