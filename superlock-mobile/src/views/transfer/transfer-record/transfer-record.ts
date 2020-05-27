import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { SessionStorage } from 'jts-storage';

import Locales from '@/locales';
import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { TransferModel } from '@/ts/models';

import { Toast, PullRefresh, List, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const i18n = Locales.buildLocale();
const transferModule = namespace('transfer');

@Component({
    name: 'TransferRecord',
    components: { PullRefresh, List, CellGroup, Cell, Header }
})
export default class TransferRecord extends Vue {
    @transferModule.State('transfers') transfers?: Array<TransferModel>;
    @transferModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @transferModule.Mutation(TYPES.CLEAR_STATES) clearStates!: (withoutSelected: boolean) => any;
    @transferModule.Action('fetchTransfers') fetchTransfersAction!: () => any;

    isPulling: boolean = false; // 是否下拉刷新
    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束

    // 跳转至详情页面
    goDetail(transfer: TransferModel) {
        this.setStates({ transfer });
        SessionStorage.setItem<TransferModel>(CONSTANTS.TRANSFER, transfer);
        this.$router.push('/transfer/detail');
    }

    // 获取转账列表
    async fetchTransfers() {
        let transfers = await this.fetchTransfersAction();
        this.isLoading = false;
        this.isFinished = transfers && transfers.length <= 0;
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        if (!this.transfers || isRefresh) {
            this.setStates({ pageNum: 1 });
            await this.fetchTransfers();
        }
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData(true);
        this.isPulling = false;
        Toast(i18n.tc('COMMON.REFRESH_SUCCESS'));
    }

    mounted() {
        this.fetchData(false);
    }
}
