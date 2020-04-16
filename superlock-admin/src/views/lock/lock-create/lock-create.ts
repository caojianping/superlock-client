import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { ProjectFormModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const lockModule = namespace('lock');

@Component({
    name: 'LockCreate',
    components: { SecondVerify }
})
export default class LockCreate extends Vue {
    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;

    @lockModule.State('projectForm') projectForm!: ProjectFormModel;
    @lockModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @lockModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @lockModule.Action('crateProject') crateProject!: (isCode: boolean) => any;

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
    }
}
