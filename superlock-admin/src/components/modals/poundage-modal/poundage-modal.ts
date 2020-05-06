import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { OperationType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { RechargePoundageModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const rechargeModule = namespace('recharge');

@Component({
    name: 'PoundageModal',
    components: { SecondVerify }
})
export default class PoundageModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly operationType!: OperationType; // 操作类型
    @Prop() readonly data?: RechargePoundageModel; // 手续费数据

    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;

    @rechargeModule.State('poundage') poundage!: RechargePoundageModel;
    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @rechargeModule.Action('addRechargePoundage') addRechargePoundage!: (isCode?: boolean) => any;
    @rechargeModule.Action('updateRechargePoundage') updateRechargePoundage!: (isCode?: boolean) => any;

    isShow: boolean = this.value; // 是否显示模态框
    title: string = ''; // 标题

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let poundage = Utils.duplicate(this.poundage);
        poundage[key] = value;
        this.setStates({ poundage });
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交手续费表单
    async submit(isCode?: boolean) {
        try {
            let operationType = this.operationType,
                msg = `手续费设置${['添加', '更新'][operationType - 1]}`,
                result = operationType === OperationType.Add ? await this.addRechargePoundage(isCode) : await this.updateRechargePoundage(isCode);
            if (!result) Prompt.error(`${msg}失败`);
            else {
                Prompt.error(`${msg}成功`);
                this.$emit('close', false);
                this.$emit('submit');
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            let operationType = this.operationType,
                poundage = new RechargePoundageModel();
            this.title = ['新增手续费设置', '修改手续费设置'][operationType - 1];
            if (operationType === OperationType.Edit) {
                let data = this.data;
                if (data) {
                    poundage.tokenType = data.tokenType;
                    poundage.type = data.type;
                    poundage.feeToken = data.feeToken;
                    poundage.chargeRate = Number(data.chargeRate) * 100;
                }
            }
            this.setStates({ poundage });
        }
    }
}
