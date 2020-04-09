import Vue from 'vue';
import { State } from 'vuex-class';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import {
    DefaultRateModel,
    DefaultRateStatsModel,
    DefaultRateFormModel,
} from '@/ts/models';
import { ChildService } from '@/ts/services';

import { Field, Button } from 'vant';
import Modal from '@/components/common/modal';

@Component({
    name: 'RateModal',
    components: { Field, Button, Modal },
})
export default class RateModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly defaultRateStats?: DefaultRateStatsModel | null; // 默认利率统计信息

    @State('unitTypes') unitTypes!: Array<string>;

    isShow: boolean = this.value; // 是否显示模态框
    defaultRateForms: Array<DefaultRateFormModel> = []; // 默认利率表单列表

    // 处理模态框close事件
    handleModalClose() {
        this.isShow = false;
        this.$emit('close', false);
    }

    // 取消
    cancel() {
        this.handleModalClose();
    }

    // 提交
    submit() {
        let defaultRateForms = this.defaultRateForms,
            result: ValidationResult = ChildService.validateDefaultRateForms(
                defaultRateForms
            );
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        this.$emit('close', false);
        this.$emit('submit', defaultRateForms);
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            let defaultRateStats = this.defaultRateStats;
            if (defaultRateStats) {
                let defaultRateForms: Array<DefaultRateFormModel> = [];
                (defaultRateStats.defaultRateList || []).forEach(
                    (rate: DefaultRateModel) => {
                        let defaultRateForm = new DefaultRateFormModel();
                        defaultRateForm.type = rate.type;
                        defaultRateForm.length = rate.length;
                        defaultRateForm.unit = rate.unit;
                        defaultRateForm.value = rate.childValue;
                        defaultRateForm.max = rate.value;
                        console.log(defaultRateForm);
                        defaultRateForms.push(defaultRateForm);
                    }
                );
                this.defaultRateForms = defaultRateForms;
            }
        }
    }
}
