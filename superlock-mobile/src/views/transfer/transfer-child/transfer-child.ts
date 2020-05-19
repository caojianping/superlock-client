import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { TransferChildModel } from '@/ts/models';

import { Toast, PullRefresh, Search, List, CellGroup, Cell, Checkbox, Icon } from 'vant';
import Header from '@/components/common/header';

const transferModule = namespace('transfer');

@Component({
    name: 'TransferChild',
    components: { PullRefresh, Search, List, CellGroup, Cell, Checkbox, Icon, Header }
})
export default class TransferChild extends Vue {
    @transferModule.State('transferChilds') transferChilds?: Array<TransferChildModel>;
    @transferModule.State('selectedTransferChild') selectedTransferChild?: TransferChildModel;
    @transferModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @transferModule.Mutation(TYPES.CLEAR_STATES) clearStates!: (withoutSelected: boolean) => any;
    @transferModule.Action('fetchTransferChilds') fetchTransferChildsAction!: (keyword?: string) => any;

    keyword: string = ''; // 关键字
    isPulling: boolean = false; // 是否下拉刷新
    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束

    // 处理搜索框action事件
    handleSearchAction() {
        this.setStates({ pageNum: 1 });
        this.fetchTransferChilds();
    }

    // 选择转账下级
    chooseChild(transferChild: TransferChildModel) {
        this.setStates({ selectedTransferChild: transferChild });
        this.$router.push('/transfer/index');
    }

    // 获取转账下级列表
    async fetchTransferChilds() {
        let transferChilds = await this.fetchTransferChildsAction(this.keyword);
        this.isLoading = false;
        this.isFinished = transferChilds && transferChilds.length <= 0;
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        if (!this.transferChilds || isRefresh) {
            this.setStates({ pageNum: 1 });
            await this.fetchTransferChilds();
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
