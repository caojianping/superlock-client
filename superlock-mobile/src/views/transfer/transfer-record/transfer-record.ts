import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { SessionStorage } from 'jts-storage';
import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { TransferModel } from '@/ts/models';

import { List, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const transferModule = namespace('transfer');

@Component({
    name: 'TransferRecord',
    components: { List, CellGroup, Cell, Header }
})
export default class TransferRecord extends Vue {
    @transferModule.State('transfers') transfers?: Array<TransferModel>;
    @transferModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @transferModule.Mutation(TYPES.CLEAR_STATES) clearStates!: (withoutSelected: boolean) => any;
    @transferModule.Action('fetchTransfers') fetchTransfers!: () => any;

    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束

    // 跳转至详情页面
    goDetail(transfer: TransferModel) {
        SessionStorage.setItem<TransferModel>(CONSTANTS.TRANSFER, transfer);
        this.$router.push(`/transfer/detail/${transfer.orderId}`);
    }

    // 获取数据
    async fetchData() {
        let recharges = await this.fetchTransfers();
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
