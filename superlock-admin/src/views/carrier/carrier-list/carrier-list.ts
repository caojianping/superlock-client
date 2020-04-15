import Vue from 'vue';
import { namespace, State, Mutation } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { OperationType, CarrierFormType, ResponseCode } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { IPageParameters } from '@/ts/interfaces';
import { CarrierModel, CarrierFormModel, SecondVerifyResult } from '@/ts/models';

import { Modal } from 'ant-design-vue';
import SecondVerify from '@/components/common/second-verify';
import CarrierModal from '@/components/carrier/carrier-modal';

const carrierModule = namespace('carrier');

@Component({
    name: 'FundRecord',
    components: { SecondVerify, CarrierModal }
})
export default class FundRecord extends Vue {
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('isPageLoading') isPageLoading!: boolean;
    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;
    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;
    @Mutation(TYPES.CLEAR_STATES) clearRootStates!: () => any;

    @carrierModule.State('operationType') operationType!: OperationType;
    @carrierModule.State('formType') formType!: CarrierFormType;
    @carrierModule.State('carrierForm') carrierForm!: CarrierFormModel;
    @carrierModule.State('carrier') carrier?: CarrierModel;

    @carrierModule.State('carrierParameters') carrierParameters!: IPageParameters<null>;
    @carrierModule.State('totalCount') totalCount!: number;
    @carrierModule.State('list') list!: Array<CarrierModel>;

    @carrierModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @carrierModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @carrierModule.Action('fetchCarriers') fetchCarriers!: () => any;
    @carrierModule.Action('addCarrier') addCarrier!: (isCode?: boolean) => any;
    @carrierModule.Action('updateCarrier') updateCarrier!: (isCode?: boolean) => any;

    isCarrierShow: boolean = false; // 是否显示运营商模态框
    currentCarrier?: CarrierModel = undefined; // 当前运营商数据

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
            dataIndex: 'mobileNumber'
        },
        {
            title: '锁仓总量(DC)',
            dataIndex: 'totalLock'
        },
        {
            title: '返点比例(%)',
            dataIndex: 'rebateRatio'
        },
        {
            title: '结算周期',
            dataIndex: 'billingCycle'
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

    // 打开运营商模态框
    openCarrierModal(operationType: OperationType, formType: CarrierFormType, carrier?: CarrierModel) {
        this.isCarrierShow = true;
        this.setStates({ operationType, formType, carrier });
    }

    // 私有函数：设置运营商
    async _setCarrier(carrierForm: CarrierFormModel, isCode?: boolean) {
        try {
            this.setStates({ carrierForm });
            let operationType = this.operationType,
                result = operationType === OperationType.Add ? await this.addCarrier(isCode) : await this.updateCarrier(isCode);
            if (!result) Prompt.error('操作失败');
            else {
                Prompt.success('操作成功');
                await this.fetchCarriers();
            }
        } catch (error) {
            let code = error.code;
            if (code === ResponseCode.SecondVerify) {
                let data = error.data as SecondVerifyResult;
                if (data.verifyMethod === '001') {
                    this.setRootStates({ isSecondVerifyShow: true });
                }
            } else {
                Prompt.error(error.message || error);
            }
        }
    }

    // 处理运营商模态框submit事件
    async handleCarrierModalSubmit(carrierForm: CarrierFormModel) {
        this._setCarrier(carrierForm, false);
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit(code: string) {
        this._setCarrier(this.carrierForm, true);
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

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchCarriers();
    }
}
