import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component, Model, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { ISelectOption } from '@/ts/interfaces';
import { RateFormModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const memberModule = namespace('member');

@Component({
    name: 'RateModal',
    components: { SecondVerify }
})
export default class RateModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model

    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;

    @memberModule.State('projectOptions') projectOptions!: Array<ISelectOption>;
    @memberModule.State('rateForm') rateForm!: RateFormModel;
    @memberModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @memberModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @memberModule.Action('fetchProjectTypes') fetchProjectTypes!: () => any;
    @memberModule.Action('setRate') setRate!: (isCode?: boolean) => any;

    isShow: boolean = this.value; // 是否显示模态框

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let rateForm = Utils.duplicate(this.rateForm);
        rateForm[key] = value;
        this.setStates({ rateForm });
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交利率表单
    async submit(isCode?: boolean) {
        try {
            let result = await this.setRate(isCode);
            if (!result) Prompt.error('利率设置失败');
            else {
                Prompt.success('利率设置成功');
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
            let rateForm = new RateFormModel();
            this.setStates({ rateForm });
            this.fetchProjectTypes();
        }
    }
}
