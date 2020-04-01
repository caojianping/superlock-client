import Vue from 'vue';
import { State } from 'vuex-class';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import {
    TeamRateInfoModel,
    TeamRateFormModel,
    TeamRateModel
} from '@/ts/models';
import { UserService } from '@/ts/services';

import { Field, Button } from 'vant';
import Modal from '@/components/common/modal';

@Component({
    name: 'RateModal',
    components: { Field, Button, Modal }
})
export default class RateModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly teamRateInfo?: TeamRateInfoModel | null; // 团队利率信息

    @State('units') units!: Array<string>;

    isShow: boolean = this.value; // 是否显示模态框
    rateForms: Array<TeamRateFormModel> = []; // 团队利率表单

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
        let rateForms = this.rateForms,
            result: ValidationResult = UserService.validateRateForms(rateForms);
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        this.$emit('close', false);
        this.$emit('submit', rateForms);
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            let teamRateInfo = this.teamRateInfo;
            if (teamRateInfo) {
                let rateForms: Array<TeamRateFormModel> = [];
                (teamRateInfo.defaultRateList || []).forEach(
                    (rate: TeamRateModel) => {
                        let rateForm = new TeamRateFormModel();
                        rateForm.type = rate.type;
                        rateForm.length = rate.length;
                        rateForm.unit = rate.unit;
                        rateForm.max = Number(rate.value);
                        rateForms.push(rateForm);
                    }
                );
                this.rateForms = rateForms;
            }
        }
    }
}
