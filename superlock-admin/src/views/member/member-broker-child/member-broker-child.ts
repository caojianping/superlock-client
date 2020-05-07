import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { IPageParameters, IBrokerChildPageParameters } from '@/ts/interfaces';
import { BrokerChildModel } from '@/ts/models';

const memberModule = namespace('member');

@Component({
    name: 'MemberBrokerChild',
    components: {}
})
export default class MemberBrokerChild extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;

    @memberModule.State('childParameters') childParameters!: IPageParameters<IBrokerChildPageParameters>;
    @memberModule.State('totalCount') totalCount!: number;
    @memberModule.State('list') list!: Array<BrokerChildModel>;
    @memberModule.State('count') count!: number;
    @memberModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @memberModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @memberModule.Action('fetchBrokerChilds') fetchBrokerChilds!: () => any;
    @memberModule.Action('exportBrokerChilds') exportBrokerChilds!: () => any;

    uid: string = '';

    columns: Array<any> = [
        {
            title: '下级UID',
            dataIndex: 'uid'
        },
        {
            title: '手机号',
            dataIndex: '',
            key: 'mobile',
            scopedSlots: { customRender: 'mobile' }
        },
        {
            title: '邮箱',
            dataIndex: 'email'
        },
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

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let childParameters = Utils.duplicate(this.childParameters);
        childParameters.conditions[key] = value;
        this.setStates({ childParameters });
    }

    // 搜索
    async search() {
        try {
            let childParameters = Utils.duplicate(this.childParameters);
            childParameters.pageNum = 1;
            this.setStates({ childParameters });
            await this.fetchBrokerChilds();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportBrokerChilds();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let childParameters = Utils.duplicate(this.childParameters);
        childParameters.pageNum = page;
        childParameters.pageSize = pageSize;
        this.setStates({ childParameters });
        this.fetchBrokerChilds();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let childParameters = Utils.duplicate(this.childParameters);
        childParameters.pageNum = 1;
        childParameters.pageSize = pageSize;
        this.setStates({ childParameters });
        this.fetchBrokerChilds();
    }

    created() {
        let params: any = this.$route.params || {},
            uid = params.uid,
            childParameters = Utils.duplicate(this.childParameters);
        this.uid = uid;
        childParameters.conditions.uid = uid;
        this.setStates({ childParameters, totalCount: 0, list: [] });
    }

    mounted() {
        Utils.jumpTop();
        this.fetchBrokerChilds();
    }
}
