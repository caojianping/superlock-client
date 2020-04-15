import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { IPageParameters, IPointPageParameters } from '@/ts/interfaces';
import { PointAccountModel } from '@/ts/models';

const pointModule = namespace('point');

@Component({
    name: 'PointAccount',
    components: {}
})
export default class PointAccount extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;

    @pointModule.State('accountParameters') accountParameters!: IPageParameters<IPointPageParameters>;
    @pointModule.State('totalCount') totalCount!: number;
    @pointModule.State('list') list!: Array<PointAccountModel>;
    @pointModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @pointModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @pointModule.Action('fetchPointAccounts') fetchPointAccounts!: () => any;

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
        this.fetchPointAccounts();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let accountParameters = Utils.duplicate(this.accountParameters);
        accountParameters.pageNum = 1;
        accountParameters.pageSize = pageSize;
        this.setStates({ accountParameters });
        this.fetchPointAccounts();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchPointAccounts();
    }
}
