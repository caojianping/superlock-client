import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { ResponseCode } from '@/ts/config';
import { Utils, Prompt } from '@/ts/common';
import { AwardForm, AwardDailySale, SecondVerifyResult } from '@/ts/models';
import SecondVerify from '@/components/common/second-verify';

const lockModule = namespace('lock');

@Component({
    name: 'LockAward',
    components: { SecondVerify }
})
export default class LockAward extends Vue {
    @lockModule.State('awardForm') awardForm!: AwardForm;

    @lockModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @lockModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @lockModule.Action('fetchLockAward') fetchLockAward!: () => any;
    @lockModule.Action('updateLockAward') updateLockAward!: (
        isCode: boolean
    ) => any;

    isSecondVerifyShow: boolean = false; // 是否显示二次验证

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let awardForm = Utils.duplicate(this.awardForm);
        awardForm[key] = value;
        this.setStates({ awardForm });
    }

    // 处理日销表单change事件
    handleDailySaleChange(cindex: number, key: string, value: number) {
        let awardForm = Utils.duplicate(this.awardForm),
            dailySales: Array<AwardDailySale> = awardForm.dailySalesDto;
        dailySales.forEach((dailySale: AwardDailySale, index: number) => {
            if (cindex === index) {
                dailySale[key] = value;
            }
        });
        this.setStates({ awardForm });
    }

    // 添加日销信息
    addDailySale() {
        let awardForm = Utils.duplicate(this.awardForm);
        awardForm.dailySalesDto.push(new AwardDailySale());
        this.setStates({ awardForm });
    }

    // 删除日销信息
    removeDailySale(cindex: number) {
        let awardForm = Utils.duplicate(this.awardForm);
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
            let code = error.code;
            if (code === ResponseCode.SecondVerify) {
                let data = error.data as SecondVerifyResult;
                if (data.verifyMethod === '001') {
                    this.isSecondVerifyShow = true;
                }
            } else {
                Prompt.error(error.message || error);
            }
        }
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit(code: string) {
        let awardForm = Utils.duplicate(this.awardForm);
        awardForm.code = code;
        this.setStates({ awardForm });
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
