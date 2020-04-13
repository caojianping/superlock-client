import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { Utils, Prompt } from '@/ts/common';
import {
    IPageParameters,
    IMemberPageParameters,
    BrokerChildModel
} from '@/ts/models';

const memberModule = namespace('member');

@Component({
    name: 'MemberBrokerChild',
    components: {}
})
export default class MemberBrokerChild extends Vue {
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('isPageLoading') isPageLoading!: boolean;

    @memberModule.State('parameters') parameters!: IPageParameters<
        IMemberPageParameters
    >;
    @memberModule.State('totalCount') totalCount!: number;
    @memberModule.State('list') list!: Array<BrokerChildModel>;
    @memberModule.State('count') count!: number;

    @memberModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @memberModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @memberModule.Action('fetchPageBrokerChilds')
    fetchPageBrokerChilds!: () => any;

    uid: string = '';

    columns: Array<any> = [
        {
            title: '下级UID',
            dataIndex: 'uid'
        },
        {
            title: '手机号',
            dataIndex: 'mobile'
        },
        // {
        //     title: '总代理额度(DC)',
        //     dataIndex: 'totalDegree'
        // },
        {
            title: '个人锁仓数量(DC)',
            dataIndex: 'totalLock'
        },
        {
            title: '累计推广数量(DC)',
            dataIndex: 'totalPromote'
        },
        {
            title: '累计收益(DC)',
            dataIndex: 'totalReward'
        },
        {
            title: '累计到账(BCB)',
            dataIndex: 'acceptReward'
        }
    ];

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let parameters = Utils.duplicate(this.parameters);
        parameters.pageNum = page;
        parameters.pageSize = pageSize;
        this.setStates({ parameters });
        this.fetchPageBrokerChilds();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let parameters = Utils.duplicate(this.parameters);
        parameters.pageNum = 1;
        parameters.pageSize = pageSize;
        this.setStates({ parameters });
        this.fetchPageBrokerChilds();
    }

    created() {
        let params = this.$route.params,
            uid = params.uid,
            parameters = Utils.duplicate(this.parameters);
        this.uid = uid;
        parameters.conditions.uid = uid;
        this.setStates({ parameters, totalCount: 0, list: [] });
    }

    mounted() {
        Utils.jumpTop();
        this.fetchPageBrokerChilds();
    }
}
