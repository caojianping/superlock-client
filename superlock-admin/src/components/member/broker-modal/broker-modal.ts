import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component, Model, Watch, Prop } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { defaultAreaCode, OperationType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { ISelectOption } from '@/ts/interfaces';
import { BrokerFormModel, BrokerModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const memberModule = namespace('member');

@Component({
    name: 'BrokerModal',
    components: { SecondVerify }
})
export default class BrokerModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly operationType!: OperationType;
    @Prop() readonly broker!: BrokerModel;

    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;
    @State('areaCodeOptions') areaCodeOptions!: Array<ISelectOption>;

    @memberModule.State('brokerForm') brokerForm!: BrokerFormModel;
    @memberModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @memberModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @memberModule.Action('addBroker') addBroker!: (isCode?: boolean) => any;
    @memberModule.Action('updateMobile') updateMobile!: (isCode?: boolean) => any;

    isShow: boolean = this.value; // 是否显示模态框

    // 国家地区过滤选项
    areaCodeFilterOption(input: any, option: any) {
        let text = option.componentOptions.children[0].text.toLowerCase(),
            tinput = input.toLowerCase();
        return text.indexOf(tinput) > -1;
    }

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let brokerForm = Utils.duplicate(this.brokerForm);
        brokerForm[key] = value;
        this.setStates({ brokerForm });
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交券商表单
    async submit(isCode?: boolean) {
        try {
            let operationType = this.operationType,
                msg = { 1: '券商添加', 2: '手机号更改' }[operationType],
                result = operationType === OperationType.Add ? await this.addBroker(isCode) : await this.updateMobile(isCode);
            if (!result) Prompt.error(`${msg}失败`);
            else {
                Prompt.success(`${msg}成功`);
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
                brokerForm = new BrokerFormModel();
            brokerForm.areaCode = defaultAreaCode.id;
            if (operationType === OperationType.Edit) {
                brokerForm.uid = this.broker.uid;
            }
            this.setStates({ brokerForm });
        }
    }
}
