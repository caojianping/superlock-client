import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { TransferChildModel } from '@/ts/models';

import { Search, List, CellGroup, Cell, Checkbox, Icon } from 'vant';
import Header from '@/components/common/header';

const transferModule = namespace('transfer');

@Component({
    name: 'TransferChild',
    components: { Search, List, CellGroup, Cell, Checkbox, Icon, Header }
})
export default class TransferChild extends Vue {
    @transferModule.State('transferChilds') transferChilds?: Array<
        TransferChildModel
    >;
    @transferModule.State('selectedTransferChild')
    selectedTransferChild?: TransferChildModel;

    @transferModule.Mutation(TYPES.SET_STATES) setStates!: (
        payload: any
    ) => any;
    @transferModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @transferModule.Action('fetchTransferChilds') fetchTransferChilds!: (
        keyword?: string
    ) => any;

    keyword: string = '';
    isLoading: boolean = false; // 是否正在加载
    isFinished: boolean = false; // 是否加载结束

    // 处理搜索框action事件
    handleSearchAction() {
        console.log('action', this.keyword);
        this.setStates({ pageNum: 1 });
        this.fetchData();
    }

    // 选择转账下级
    chooseChild(transferChild: TransferChildModel) {
        this.setStates({ selectedTransferChild: transferChild });
        this.$router.push('/transfer/index');
    }

    // 获取数据
    async fetchData() {
        let transferChilds = await this.fetchTransferChilds(this.keyword);
        this.isLoading = false;
        this.isFinished = transferChilds && transferChilds.length <= 0;
    }

    mounted() {
        this.fetchData();
    }
}
