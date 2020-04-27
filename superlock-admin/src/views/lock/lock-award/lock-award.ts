import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { AwardFormModel, AwardDailySaleModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const lockModule = namespace('lock');

@Component({
    name: 'LockAward',
    components: { SecondVerify }
})
export default class LockAward extends Vue {
    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;

    @lockModule.State('awardForm') awardForm!: AwardFormModel;
    @lockModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @lockModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @lockModule.Action('fetchLockAward') fetchLockAward!: () => any;
    @lockModule.Action('updateLockAward') updateLockAward!: (isCode: boolean) => any;

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let awardForm = Utils.duplicate(this.awardForm);
        awardForm[key] = value;
        this.setStates({ awardForm });
    }

    // 处理日销表单change事件
    handleDailySaleChange(cindex: number, key: string, value: number) {
        let awardForm = Utils.duplicate(this.awardForm),
            dailySales: Array<AwardDailySaleModel> = awardForm.dailySalesDto || [];
        dailySales.forEach((dailySale: AwardDailySaleModel, index: number) => {
            if (cindex === index) {
                dailySale[key] = value;
            }
        });
        this.setStates({ awardForm });
    }

    // 添加日销信息
    addDailySale() {
        let awardForm = Utils.duplicate(this.awardForm);
        if (!Array.isArray(awardForm.dailySalesDto)) {
            awardForm.dailySalesDto = [];
        }
        awardForm.dailySalesDto.push(new AwardDailySaleModel());
        this.setStates({ awardForm });
    }

    // 删除日销信息
    removeDailySale(cindex: number) {
        let awardForm = Utils.duplicate(this.awardForm);
        if (!Array.isArray(awardForm.dailySalesDto)) {
            awardForm.dailySalesDto = [];
        }
        awardForm.dailySalesDto.splice(cindex, 1);
        this.setStates({ awardForm });
    }

    // 提交奖励信息
    async submit(isCode: boolean) {
        try {
            let result = await this.updateLockAward(isCode);
            if (!result) Prompt.error('奖励设置失败');
            else {
                Prompt.success('奖励设置成功');
                await this.fetchLockAward();
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit() {
        await this.submit(true);
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchLockAward();
    }
}
