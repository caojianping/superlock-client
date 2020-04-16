import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { IPageParameters, IProjectPageParameters } from '@/ts/interfaces';
import { ProjectModel, ProjectFormModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';
import ProjectModal from '@/components/modals/project-modal';

const lockModule = namespace('lock');

@Component({
    name: 'LockProject',
    components: { SecondVerify, ProjectModal }
})
export default class LockProject extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;

    @lockModule.State('projectParameters') projectParameters!: IPageParameters<IProjectPageParameters>;
    @lockModule.State('totalCount') totalCount!: number;
    @lockModule.State('list') list!: Array<ProjectModel>;
    @lockModule.State('projectForm') projectForm!: ProjectFormModel;
    @lockModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @lockModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @lockModule.Action('fetchProjects') fetchProjects!: () => any;
    @lockModule.Action('updateProject') updateProject!: (isCode: boolean) => any;

    isShow: boolean = false;
    currentProject: ProjectModel = new ProjectModel();

    columns: Array<any> = [
        {
            title: '项目ID',
            dataIndex: 'id'
        },
        {
            title: '项目名称',
            dataIndex: 'memo'
        },
        {
            title: '项目周期',
            dataIndex: 'length'
        },
        {
            title: '项目总额度(DC)',
            dataIndex: '',
            key: 'quota',
            scopedSlots: { customRender: 'quota' }
        },
        {
            title: '锁仓利率(%)',
            dataIndex: '',
            key: 'rate',
            scopedSlots: { customRender: 'rate' }
        },
        {
            title: '项目创建时间',
            dataIndex: '',
            key: 'createTime',
            scopedSlots: { customRender: 'createTime' }
        },
        {
            title: '项目结束时间',
            dataIndex: ''
        },
        {
            title: '状态',
            dataIndex: '',
            key: 'enable',
            scopedSlots: { customRender: 'enable' }
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'operation',
            scopedSlots: { customRender: 'operation' }
        }
    ];

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let projectParameters = Utils.duplicate(this.projectParameters);
        projectParameters.conditions[key] = value;
        this.setStates({ projectParameters });
    }

    // 搜索
    async search() {
        try {
            let projectParameters = Utils.duplicate(this.projectParameters);
            projectParameters.pageNum = 1;
            this.setStates({ projectParameters });
            await this.fetchProjects();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let projectParameters = Utils.duplicate(this.projectParameters);
        projectParameters.pageNum = page;
        projectParameters.pageSize = pageSize;
        this.setStates({ projectParameters });
        this.fetchProjects();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let projectParameters = Utils.duplicate(this.projectParameters);
        projectParameters.pageNum = 1;
        projectParameters.pageSize = pageSize;
        this.setStates({ projectParameters });
        this.fetchProjects();
    }

    // 打开项目模态框
    openProjectModal(project: ProjectModel) {
        this.isShow = true;
        this.currentProject = project;
    }

    // 私有函数：提交项目
    async _submitProject(projectForm: ProjectFormModel, isCode: boolean) {
        try {
            this.setStates({ projectForm });
            let result = await this.updateProject(isCode);
            if (!result) Prompt.error('项目修改失败');
            else await this.fetchProjects();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理项目模态框submit事件
    async handleProjectSubmit(projectForm: ProjectFormModel) {
        this._submitProject(projectForm, false);
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit() {
        await this._submitProject(this.projectForm, true);
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchProjects();
    }
}
