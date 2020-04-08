import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import TYPES from '@/store/types';
import { TransferModel } from '@/ts/models';

import { List, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const transferModule = namespace('transfer');

@Component({
    name: 'TransferRecord',
    components: { List, CellGroup, Cell, Header }
})
export default class TransferRecord extends Vue {
    @transferModule.State('pageNum') pageNum!: number;
    @transferModule.State('pageSize') pageSize!: number;
    @transferModule.State('transfers') transfers?: Array<TransferModel>;

    @transferModule.Mutation(TYPES.SET_STATES) setStates!: (
        payload: any
    ) => any;
    @transferModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @transferModule.Action('fetchTransfers') fetchTransfers!: () => any;

    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束

    // 获取数据
    async fetchData() {
        let recharges = await this.fetchTransfers();
        this.isLoading = false;
        this.isFinished = recharges && recharges.length <= 0;
    }

    mounted() {
        this.fetchData();
    }
}
