import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { BrokerModel, QuotaFormModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const memberModule = namespace('member');

@Component({
    name: 'QuotaModal',
    components: { SecondVerify }
})
export default class QuotaModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly broker!: BrokerModel; // 券商数据

    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;

    @memberModule.State('quotaForm') quotaForm!: QuotaFormModel;
    @memberModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @memberModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @memberModule.Action('addQuota') addQuota!: (isCode?: boolean) => any;

    isShow: boolean = this.value; // 是否显示模态框

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let quotaForm = Utils.duplicate(this.quotaForm);
        quotaForm[key] = value;
        this.setStates({ quotaForm });
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交额度表单
    async submit(isCode?: boolean) {
        try {
            let result = await this.addQuota(isCode);
            if (!result) Prompt.error('额度添加失败');
            else {
                Prompt.success('额度添加成功');
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
            let quotaForm = new QuotaFormModel();
            quotaForm.uid = this.broker.uid;
            this.setStates({ quotaForm });
        }
    }
}
