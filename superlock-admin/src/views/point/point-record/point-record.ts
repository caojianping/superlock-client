import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { IPageParameters, IPointPageParameters } from '@/ts/interfaces';
import { PointModel } from '@/ts/models';

import PointModal from '@/components/point/point-modal';
import TransferModal from '@/components/point/transfer-modal';

const pointModule = namespace('point');

@Component({
    name: 'PointRecord',
    components: { PointModal, TransferModal }
})
export default class PointRecord extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;

    @pointModule.State('pointParameters') pointParameters!: IPageParameters<IPointPageParameters>;
    @pointModule.State('totalCount') totalCount!: number;
    @pointModule.State('list') list!: Array<PointModel>;
    @pointModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @pointModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @pointModule.Action('fetchPoints') fetchPoints!: () => any;
    @pointModule.Action('exportPoints') exportPoints!: () => any;

    isPointShow: boolean = false;
    isTransferShow: boolean = false;

    columns: Array<any> = [
        {
            title: '时间',
            dataIndex: '',
            key: 'date',
            scopedSlots: { customRender: 'date' }
        },
        {
            title: '收款ID',
            dataIndex: 'toId'
        },
        {
            title: '收款账户类型',
            dataIndex: 'toAccountType'
        },
        {
            title: '转账ID',
            dataIndex: 'fromId'
        },
        {
            title: '币种类型',
            dataIndex: 'coin'
        },
        {
            title: '数量',
            dataIndex: 'amount'
        },
        {
            title: '备注',
            dataIndex: 'remark'
        }
    ];

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let pointParameters = Utils.duplicate(this.pointParameters);
        pointParameters.conditions[key] = value;
        this.setStates({ pointParameters });
    }

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let pointParameters = Utils.duplicate(this.pointParameters);
        pointParameters.conditions.beginTime = dateStrings[0];
        pointParameters.conditions.endTime = dateStrings[1];
        this.setStates({ pointParameters });
    }

    // 搜索
    async search() {
        try {
            let pointParameters = Utils.duplicate(this.pointParameters);
            pointParameters.pageNum = 1;
            this.setStates({ pointParameters });
            await this.fetchPoints();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportPoints();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 打开模态框
    openModal(key: string) {
        this[key] = true;
    }

    // 处理模态框submit事件
    handleModalSubmit() {
        this.fetchPoints();
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let pointParameters = Utils.duplicate(this.pointParameters);
        pointParameters.pageNum = page;
        pointParameters.pageSize = pageSize;
        this.setStates({ pointParameters });
        this.fetchPoints();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let pointParameters = Utils.duplicate(this.pointParameters);
        pointParameters.pageNum = 1;
        pointParameters.pageSize = pageSize;
        this.setStates({ pointParameters });
        this.fetchPoints();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchPoints();
    }
}
