import Vue from 'vue';
import { namespace, State, Mutation, Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { OperationType, CarrierFormType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { IPageParameters, ISelectOption, ICarrierPageParameters } from '@/ts/interfaces';
import { CarrierModel } from '@/ts/models';

import CarrierModal from '@/components/modals/carrier-modal';

const carrierModule = namespace('carrier');

@Component({
    name: 'CarrierList',
    components: { CarrierModal }
})
export default class CarrierList extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('carrierOptions') carrierOptions!: Array<ISelectOption>;
    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;
    @Mutation(TYPES.CLEAR_STATES) clearRootStates!: () => any;
    @Action('fetchCarrierOptions') fetchCarrierOptions!: (isRefresh?: boolean) => any;

    @carrierModule.State('operationType') operationType!: OperationType;
    @carrierModule.State('formType') formType!: CarrierFormType;
    @carrierModule.State('carrier') carrier?: CarrierModel;
    @carrierModule.State('carrierParameters') carrierParameters!: IPageParameters<ICarrierPageParameters>;
    @carrierModule.State('totalCount') totalCount!: number;
    @carrierModule.State('list') list!: Array<CarrierModel>;
    @carrierModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @carrierModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @carrierModule.Action('fetchCarriers') fetchCarriers!: () => any;
    @carrierModule.Action('exportCarriers') exportCarriers!: () => any;

    isCarrierShow: boolean = false;

    columns: Array<any> = [
        {
            title: '运营商ID',
            dataIndex: 'carrierId'
        },
        {
            title: '运营商名称',
            dataIndex: 'carrierName'
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
            title: '锁仓总量(DC)',
            dataIndex: 'totalLock'
        },
        {
            title: '返点比例(%)',
            dataIndex: '',
            key: 'rebateRatio',
            scopedSlots: { customRender: 'rebateRatio' }
        },
        {
            title: '结算周期',
            dataIndex: '',
            key: 'cycle',
            scopedSlots: { customRender: 'cycle' }
        },
        {
            title: '返点总额(DC)',
            dataIndex: 'totalRebate'
        },
        {
            title: '账户余额(DC)',
            dataIndex: 'dcBalance'
        },
        {
            title: '账户余额(BCB)',
            dataIndex: 'bcbBalance'
        },
        {
            title: '创建时间',
            dataIndex: '',
            key: 'createTime',
            scopedSlots: { customRender: 'createTime' }
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'operation',
            scopedSlots: { customRender: 'operation' }
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
        let carrierParameters = Utils.duplicate(this.carrierParameters);
        carrierParameters.conditions[key] = value;
        this.setStates({ carrierParameters });
    }

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let carrierParameters = Utils.duplicate(this.carrierParameters);
        carrierParameters.conditions.beginTime = dateStrings[0];
        carrierParameters.conditions.endTime = dateStrings[1];
        this.setStates({ carrierParameters });
    }

    // 搜索
    async search() {
        try {
            let carrierParameters = Utils.duplicate(this.carrierParameters);
            carrierParameters.pageNum = 1;
            this.setStates({ carrierParameters });
            await this.fetchCarriers();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportCarriers();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 打开模态框
    openModal(operationType: OperationType, formType: CarrierFormType, carrier?: CarrierModel) {
        this.isCarrierShow = true;
        this.setStates({ operationType, formType, carrier });
    }

    // 处理模态框submit事件
    async handleModalSubmit() {
        await this.fetchCarrierOptions(true);
        await this.fetchCarriers();
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let carrierParameters = Utils.duplicate(this.carrierParameters);
        carrierParameters.pageNum = page;
        carrierParameters.pageSize = pageSize;
        this.setStates({ carrierParameters });
        this.fetchCarriers();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let carrierParameters = Utils.duplicate(this.carrierParameters);
        carrierParameters.pageNum = 1;
        carrierParameters.pageSize = pageSize;
        this.setStates({ carrierParameters });
        this.fetchCarriers();
    }

    // 获取数据
    async fetchData() {
        await this.fetchCarrierOptions();
        await this.fetchCarriers();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchData();
    }
}
