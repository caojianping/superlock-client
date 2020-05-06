import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { OperationType } from '@/ts/config';
import { RechargePoundageModel } from '@/ts/models';

import PoundageModal from '@/components/modals/poundage-modal';

const rechargeModule = namespace('recharge');

@Component({
    name: 'RechargePoundage',
    components: { PoundageModal }
})
export default class RechargePoundage extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;

    @rechargeModule.State('list') list!: Array<RechargePoundageModel>;
    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @rechargeModule.Action('fetchRechargePoundages') fetchRechargePoundages!: () => any;

    isPoundageShow: boolean = false;
    operationType: OperationType = OperationType.Add;
    poundage?: RechargePoundageModel;

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

    // 打开模态框
    openModal(operationType: OperationType, poundage?: RechargePoundageModel) {
        this.isPoundageShow = true;
        this.operationType = operationType;
        this.poundage = poundage;
    }

    // 处理模态框submit事件
    handleModalSubmit() {
        this.fetchRechargePoundages();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchRechargePoundages();
    }
}
