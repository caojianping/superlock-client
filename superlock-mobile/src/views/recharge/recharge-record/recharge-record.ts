import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { RechargeModel } from '@/ts/models';

import { List, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const rechargeModule = namespace('recharge');

@Component({
    name: 'RechargeRecord',
    components: { List, CellGroup, Cell, Header }
})
export default class RechargeRecord extends Vue {
    @rechargeModule.State('pageNum') pageNum!: number;
    @rechargeModule.State('pageSize') pageSize!: number;
    @rechargeModule.State('recharges') recharges!: Array<RechargeModel>;

    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (
        payload: any
    ) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @rechargeModule.Action('fetchRecharges') fetchRecharges!: () => any;

    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束

    // 获取数据
    async fetchData() {
        let recharges = await this.fetchRecharges();
        this.isLoading = false;
        this.isFinished = recharges && recharges.length <= 0;
    }

    mounted() {
        this.fetchData();
    }
}
