import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { IPageParameters, IProjectPageParameters } from '@/ts/interfaces';
import { ProjectModel, ProjectFormModel } from '@/ts/models';

import ProjectModal from '@/components/modals/project-modal';

const lockModule = namespace('lock');

@Component({
    name: 'LockProject',
    components: { ProjectModal }
})
export default class LockProject extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;

    @lockModule.State('projectParameters') projectParameters!: IPageParameters<IProjectPageParameters>;
    @lockModule.State('totalCount') totalCount!: number;
    @lockModule.State('list') list!: Array<ProjectModel>;
    @lockModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @lockModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @lockModule.Action('fetchProjects') fetchProjects!: () => any;

    isProjectShow: boolean = false;
    project: ProjectModel = new ProjectModel();

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
            title: '直推奖励利率(%)',
            dataIndex: '',
            key: 'pushRate',
            scopedSlots: { customRender: 'pushRate' }
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

    // 打开模态框
    openModal(project: ProjectModel) {
        this.isProjectShow = true;
        this.project = project;
    }

    // 处理模态框submit事件
    handleModalSubmit() {
        this.fetchProjects();
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

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchProjects();
    }
}
