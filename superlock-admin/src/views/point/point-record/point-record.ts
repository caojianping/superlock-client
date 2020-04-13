import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { ResponseCode } from '@/ts/config';
import { Utils, Prompt } from '@/ts/common';
import {
    IPageParameters,
    IPointRecordPageParameters,
    PointRecordModel,
    PointForm,
    TransferForm,
    SecondVerifyResult
} from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';
import PointModal from '@/components/point/point-modal';
import TransferModal from '@/components/point/transfer-modal';

const pointModule = namespace('point');

const enum SecondVerifyType {
    PointInfo = 1,
    TransferInfo = 2
}

@Component({
    name: 'PointRecord',
    components: { SecondVerify, PointModal, TransferModal }
})
export default class PointRecord extends Vue {
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('isPageLoading') isPageLoading!: boolean;

    @pointModule.State('pointParameters') pointParameters!: IPageParameters<
        IPointRecordPageParameters
    >;
    @pointModule.State('totalCount') totalCount!: number;
    @pointModule.State('list') list!: Array<PointRecordModel>;

    @pointModule.State('pointForm') pointForm!: PointForm;
    @pointModule.State('transferForm') transferForm!: TransferForm;

    @pointModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @pointModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @pointModule.Action('fetchPagePointRecords')
    fetchPagePointRecords!: () => any;
    @pointModule.Action('exportPointRecords') exportPointRecords!: () => any;
    @pointModule.Action('setPointInfo') setPointInfo!: (isCode: boolean) => any;
    @pointModule.Action('setTransferInfo') setTransferInfo!: (
        isCode: boolean
    ) => any;

    isPointShow: boolean = false;
    isTransferShow: boolean = false;

    isSecondVerifyShow: boolean = false; // 是否显示二次验证
    currentType: SecondVerifyType = SecondVerifyType.PointInfo; // 当前二次验证类型

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

    // 搜索
    async search() {
        try {
            let pointParameters = Utils.duplicate(this.pointParameters);
            pointParameters.pageNum = 1;
            this.setStates({ pointParameters });
            await this.fetchPagePointRecords();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportPointRecords();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

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

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let pointParameters = Utils.duplicate(this.pointParameters);
        pointParameters.pageNum = page;
        pointParameters.pageSize = pageSize;
        this.setStates({ pointParameters });
        this.fetchPagePointRecords();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let pointParameters = Utils.duplicate(this.pointParameters);
        pointParameters.pageNum = 1;
        pointParameters.pageSize = pageSize;
        this.setStates({ pointParameters });
        this.fetchPagePointRecords();
    }

    // 打开上分模态框
    openPointModal() {
        this.isPointShow = true;
        this.currentType = SecondVerifyType.PointInfo;
    }

    // 打开转账模态框
    openTransferModal() {
        this.isTransferShow = true;
        this.currentType = SecondVerifyType.TransferInfo;
    }

    // 私有函数：提交上分信息
    async _submitPoint(pointForm: PointForm, isCode: boolean) {
        try {
            this.setStates({ pointForm });
            let result = await this.setPointInfo(isCode);
            if (!result) Prompt.error('操作失败');
            else await this.fetchPagePointRecords();
        } catch (error) {
            let code = error.code;
            if (code === ResponseCode.SecondVerify) {
                let data = error.data as SecondVerifyResult;
                if (data.verifyMethod === '001') {
                    this.isSecondVerifyShow = true;
                }
            } else {
                Prompt.error(error.message || error);
            }
        }
    }

    // 处理上分模态框submit事件
    async handlePointSubmit(pointForm: PointForm) {
        await this._submitPoint(pointForm, false);
    }

    // 私有函数：提交转账信息
    async _submitTransfer(transferForm: TransferForm, isCode: boolean) {
        try {
            this.setStates({ transferForm });
            let result = await this.setTransferInfo(isCode);
            if (!result) Prompt.error('操作失败');
            else await this.fetchPagePointRecords();
        } catch (error) {
            let code = error.code;
            if (code === ResponseCode.SecondVerify) {
                let data = error.data as SecondVerifyResult;
                if (data.verifyMethod === '001') {
                    this.isSecondVerifyShow = true;
                }
            } else {
                Prompt.error(error.message || error);
            }
        }
    }

    // 处理转账模态框submit事件
    async handleTransferSubmit(transferForm: TransferForm) {
        await this._submitTransfer(transferForm, false);
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit(code: string) {
        let type = this.currentType;
        if (type === SecondVerifyType.PointInfo) {
            let pointForm = Utils.duplicate(this.pointForm);
            pointForm.code = code;
            await this._submitPoint(pointForm, true);
        } else if (type === SecondVerifyType.TransferInfo) {
            let transferForm = Utils.duplicate(this.transferForm);
            transferForm.code = code;
            await this._submitTransfer(transferForm, true);
        }
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchPagePointRecords();
    }
}
