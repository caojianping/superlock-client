import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { ProjectModel, ProjectFormModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const lockModule = namespace('lock');

@Component({
    name: 'ProjectModal',
    components: { SecondVerify }
})
export default class ProjectModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly project!: ProjectModel; // 锁仓项目数据

    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;

    @lockModule.State('projectForm') projectForm!: ProjectFormModel;
    @lockModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @lockModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @lockModule.Action('updateProject') updateProject!: (isCode?: boolean) => any;

    isShow: boolean = this.value; // 是否显示模态框

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let projectForm = Utils.duplicate(this.projectForm);
        projectForm[key] = value;
        this.setStates({ projectForm });
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交锁仓项目
    async submit(isCode?: boolean) {
        try {
            let result = await this.updateProject(isCode);
            if (!result) Prompt.error('锁仓项目修改失败');
            else {
                Prompt.success('锁仓项目修改成功');
                this.$emit('close', false);
                this.$emit('submit');
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit() {
        await this.submit(true);
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            let project = this.project,
                quota = Number(project.quota),
                rate = Number(project.rate) * 100,
                pushRate = Number(project.pushRate) * 100,
                projectForm = new ProjectFormModel();
            projectForm.id = project.id;
            projectForm.memo = project.memo;
            projectForm.quota = quota;
            projectForm.rate = rate;
            projectForm.pushRate = pushRate;
            projectForm.enable = project.enable;
            projectForm.originQuota = quota;
            projectForm.originRate = rate;
            this.setStates({ projectForm });
        }
    }
}
