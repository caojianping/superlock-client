import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { IPageParameters, IRatePageParameters } from '@/ts/interfaces';
import { RateModel } from '@/ts/models';

const memberModule = namespace('member');

@Component({
    name: 'MemberRate',
    components: {}
})
export default class MemberRate extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;

    @memberModule.State('typeOptions') typeOptions!: Array<any>;
    @memberModule.State('rateParameters') rateParameters!: IPageParameters<IRatePageParameters>;
    @memberModule.State('totalCount') totalCount!: number;
    @memberModule.State('list') list!: Array<RateModel>;
    @memberModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @memberModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @memberModule.Action('fetchRates') fetchRates!: () => any;

    columns: Array<any> = [
        {
            title: 'UID',
            dataIndex: 'uid'
        },
        {
            title: '用户类型',
            dataIndex: 'type'
        },
        {
            title: '项目名称',
            dataIndex: 'projectName'
        },
        {
            title: '利率类型',
            dataIndex: 'rateType'
        },
        {
            title: '利率值',
            dataIndex: 'rate'
        }
    ];

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let rateParameters = Utils.duplicate(this.rateParameters);
        rateParameters.conditions[key] = value;
        this.setStates({ rateParameters });
    }

    // 搜索
    async search() {
        try {
            let rateParameters = Utils.duplicate(this.rateParameters);
            rateParameters.pageNum = 1;
            this.setStates({ rateParameters });
            await this.fetchRates();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let rateParameters = Utils.duplicate(this.rateParameters);
        rateParameters.pageNum = page;
        rateParameters.pageSize = pageSize;
        this.setStates({ rateParameters });
        this.fetchRates();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let rateParameters = Utils.duplicate(this.rateParameters);
        rateParameters.pageNum = 1;
        rateParameters.pageSize = pageSize;
        this.setStates({ rateParameters });
        this.fetchRates();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchRates();
    }
}
