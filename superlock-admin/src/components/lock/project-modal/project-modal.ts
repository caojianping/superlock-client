import Vue from 'vue';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import Utils from '@/ts/utils';
import { OperationType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { ProjectModel, ProjectFormModel } from '@/ts/models';
import { LockService } from '@/ts/services';

@Component({
    name: 'ProjectModal',
    components: {}
})
export default class ProjectModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly title!: string; // 标题
    @Prop() readonly project!: ProjectModel; // 锁仓项目数据

    isShow: boolean = this.value; // 是否显示模态框
    projectForm: ProjectFormModel = new ProjectFormModel(); // 锁仓项目表单

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let projectForm = Utils.duplicate(this.projectForm);
        projectForm[key] = value;
        this.projectForm = projectForm;
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交锁仓项目信息
    async submit() {
        let projectForm = this.projectForm,
            result: ValidationResult = LockService.validateProjectForm(projectForm, false, OperationType.Edit);
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        this.$emit('close', false);
        this.$emit('submit', projectForm);
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            let project = this.project,
                quota = Number(project.quota),
                rate = Number(project.rate) * 100,
                projectForm = new ProjectFormModel();
            projectForm.id = project.id;
            projectForm.memo = project.memo;
            projectForm.quota = quota;
            projectForm.rate = rate;
            projectForm.enable = project.enable;
            projectForm.code = undefined;
            projectForm.originQuota = quota;
            projectForm.originRate = rate;
            this.projectForm = projectForm;
        }
    }
}
