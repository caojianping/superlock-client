import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { ResponseCode } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { SecondVerifyResult, ProjectFormModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const lockModule = namespace('lock');

@Component({
    name: 'LockCreate',
    components: { SecondVerify }
})
export default class LockCreate extends Vue {
    @lockModule.State('projectForm') projectForm!: ProjectFormModel;
    @lockModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @lockModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @lockModule.Action('crateProject') crateProject!: (isCode: boolean) => any;

    isSecondVerifyShow: boolean = false; // 是否显示二次验证

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let projectForm = Utils.duplicate(this.projectForm);
        projectForm[key] = value;
        this.setStates({ projectForm });
    }

    // 提交锁仓信息
    async submit(isCode: boolean) {
        try {
            let result = await this.crateProject(isCode);
            if (!result) Prompt.error('锁仓创建失败');
            else this.$router.push({ path: '/lock/project' });
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
        let projectForm = Utils.duplicate(this.projectForm);
        projectForm.code = code;
        this.setStates({ projectForm });
        await this.submit(true);
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
    }
}
