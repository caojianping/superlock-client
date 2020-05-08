import Vue from 'vue';
import { namespace, State, Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { ISelectOption, IPageParameters, ILockPageParameters } from '@/ts/interfaces';
import { LockModel } from '@/ts/models';

const lockModule = namespace('lock');

@Component({
    name: 'LockOrder',
    components: {}
})
export default class LockOrder extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('carrierOptions') carrierOptions!: Array<ISelectOption>;
    @Action('fetchCarrierOptions') fetchCarrierOptions!: () => any;

    @lockModule.State('statusOptions') statusOptions!: Array<ISelectOption>;
    @lockModule.State('lockParameters') lockParameters!: IPageParameters<ILockPageParameters>;
    @lockModule.State('totalCount') totalCount!: number;
    @lockModule.State('list') list!: Array<LockModel>;
    @lockModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @lockModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @lockModule.Action('fetchLocks') fetchLocks!: () => any;
    @lockModule.Action('exportLocks') exportLocks!: () => any;

    statusColors = {
        '0': 'text-grey',
        '10': 'text-black',
        '20': 'text-green',
        '21': 'text-green',
        '30': 'text-red',
        '40': 'text-red',
        '50': 'text-orange'
    };

    statusNames = {
        '0': '创建',
        '10': '锁仓资金操作中',
        '20': '锁仓中',
        '21': '计息中',
        '30': '锁仓到期',
        '40': '锁仓失败',
        '50': '质押中'
    };

    columns: Array<any> = [
        {
            title: '锁仓订单号',
            dataIndex: '',
            key: 'serial',
            scopedSlots: { customRender: 'serial' }
        },
        {
            title: 'UID',
            dataIndex: 'uid'
        },
        {
            title: '用户来源',
            dataIndex: 'userSource'
        },
        {
            title: '锁仓数量(BCB)',
            dataIndex: '',
            key: 'amount',
            scopedSlots: { customRender: 'amount' }
        },
        {
            title: '锁仓利率(%)',
            dataIndex: '',
            key: 'rate',
            scopedSlots: { customRender: 'rate' }
        },
        {
            title: '锁仓价值(DC)',
            dataIndex: '',
            key: 'value',
            scopedSlots: { customRender: 'value' }
        },
        {
            title: '锁仓周期',
            dataIndex: 'cycle'
        },
        {
            title: '订单创建时间',
            dataIndex: '',
            key: 'createDate',
            scopedSlots: { customRender: 'createDate' }
        },
        {
            title: '开始日期',
            dataIndex: 'beginDate'
        },
        {
            title: '结束日期',
            dataIndex: 'endDate'
        },
        {
            title: '状态',
            dataIndex: '',
            key: 'status',
            scopedSlots: { customRender: 'status' }
        }
    ];

    // 运营商过滤选项
    carrierFilterOption(input: string, option: any) {
        let text = option.componentOptions.children[0].text.toLowerCase(),
            tinput = input.toLowerCase();
        return text.indexOf(tinput) > -1;
    }

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let lockParameters = Utils.duplicate(this.lockParameters);
        lockParameters.conditions[key] = value;
        this.setStates({ lockParameters });
    }

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let lockParameters = Utils.duplicate(this.lockParameters);
        lockParameters.conditions.beginTime = dateStrings[0];
        lockParameters.conditions.endTime = dateStrings[1];
        this.setStates({ lockParameters });
    }

    // 搜索
    async search() {
        try {
            let lockParameters = Utils.duplicate(this.lockParameters);
            lockParameters.pageNum = 1;
            this.setStates({ lockParameters });
            await this.fetchLocks();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportLocks();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let lockParameters = this.lockParameters;
        lockParameters.pageNum = page;
        lockParameters.pageSize = pageSize;
        this.setStates({ lockParameters });
        this.fetchLocks();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let lockParameters = this.lockParameters;
        lockParameters.pageNum = 1;
        lockParameters.pageSize = pageSize;
        this.setStates({ lockParameters });
        this.fetchLocks();
    }

    // 获取数据，同时请求
    fetchData() {
        this.fetchCarrierOptions();
        this.fetchLocks();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchData();
    }
}
