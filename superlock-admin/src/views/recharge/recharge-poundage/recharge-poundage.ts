import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { OperationType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { RechargePoundageModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';
import PoundageModal from '@/components/modals/poundage-modal';

const rechargeModule = namespace('recharge');

const enum SecondVerifyType {
    Add = 1,
    Edit = 2
}

@Component({
    name: 'RechargePoundage',
    components: { SecondVerify, PoundageModal }
})
export default class RechargePoundage extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;

    @rechargeModule.State('list') list!: Array<RechargePoundageModel>;
    @rechargeModule.State('poundage') poundage!: RechargePoundageModel;

    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    
    @rechargeModule.Action('fetchRechargePoundages') fetchRechargePoundages!: () => any;
    @rechargeModule.Action('addRechargePoundage') addRechargePoundage!: (isCode: boolean) => any;
    @rechargeModule.Action('updateRechargePoundage') updateRechargePoundage!: (isCode: boolean) => any;

    isPoundageShow: boolean = false; // 是否显示模态框
    currentType: SecondVerifyType = SecondVerifyType.Add; // 当前二次验证类型
    currentOperation: OperationType = OperationType.Add; // 当前手续费操作类型
    currentPoundage?: RechargePoundageModel = new RechargePoundageModel(); // 当前手续费信息

    columns: Array<any> = [
        {
            title: '交易币种',
            dataIndex: 'tokenType'
        },
        {
            title: '交易类型',
            dataIndex: 'type'
        },
        {
            title: '手续币种',
            dataIndex: 'feeToken'
        },
        {
            title: '手续费比例',
            dataIndex: '',
            key: 'chargeRate',
            scopedSlots: { customRender: 'chargeRate' }
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'operation',
            scopedSlots: { customRender: 'operation' }
        }
    ];

    // 打开手续费模态框
    openPoundageModal(type: OperationType, poundage?: RechargePoundageModel) {
        this.isPoundageShow = true;
        this.currentPoundage = poundage;
        this.currentOperation = type;
        this.currentType = OperationType.Add ? SecondVerifyType.Add : SecondVerifyType.Edit;
    }

    // 私有函数：设置手续费
    async _setPoundage(poundage: RechargePoundageModel, isCode: boolean) {
        try {
            this.setStates({ poundage });
            let operation = this.currentOperation,
                result = operation === OperationType.Add ? await this.addRechargePoundage(isCode) : await this.updateRechargePoundage(isCode);
            if (!result) Prompt.error(`手续费设置${['添加', '更新'][operation - 1]}失败`);
            else await this.fetchRechargePoundages();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理手续费模态框submit事件
    async handlePoundageSubmit(poundage: RechargePoundageModel) {
        this._setPoundage(poundage, false);
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit() {
        let type = this.currentType;
        if (type === SecondVerifyType.Add || type === SecondVerifyType.Edit) {
            await this._setPoundage(this.poundage, true);
        }
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchRechargePoundages();
    }
}
