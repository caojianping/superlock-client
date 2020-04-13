import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { Utils, Prompt } from '@/ts/common';
import {
    IPageParameters,
    IPointRecordPageParameters,
    PointAccountModel
} from '@/ts/models';

const pointModule = namespace('point');

@Component({
    name: 'PointAccount',
    components: {}
})
export default class PointAccount extends Vue {
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('isPageLoading') isPageLoading!: boolean;

    @pointModule.State('accountParameters') accountParameters!: IPageParameters<
        IPointRecordPageParameters
    >;
    @pointModule.State('totalCount') totalCount!: number;
    @pointModule.State('list') list!: Array<PointAccountModel>;

    @pointModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @pointModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @pointModule.Action('fetchPagePointAccounts')
    fetchPagePointAccounts!: () => any;

    columns: Array<any> = [
        {
            title: '账户ID',
            dataIndex: 'accountId'
        },
        {
            title: '账户类型',
            dataIndex: 'accountType'
        },
        {
            title: '币种',
            dataIndex: 'coin'
        },
        {
            title: '可用余额',
            dataIndex: 'canusedAmount'
        },
        {
            title: '冻结余额',
            dataIndex: 'freezeAmount'
        },
        {
            title: '累计注入数量',
            dataIndex: 'totalAmount'
        }
    ];

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let accountParameters = Utils.duplicate(this.accountParameters);
        accountParameters.pageNum = page;
        accountParameters.pageSize = pageSize;
        this.setStates({ accountParameters });
        this.fetchPagePointAccounts();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let accountParameters = Utils.duplicate(this.accountParameters);
        accountParameters.pageNum = 1;
        accountParameters.pageSize = pageSize;
        this.setStates({ accountParameters });
        this.fetchPagePointAccounts();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchPagePointAccounts();
    }
}
