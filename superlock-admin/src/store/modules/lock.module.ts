import TYPES from '@/store/types';
import { IActionContext, ILockState } from '@/store/interfaces';
import { Prompt } from '@/ts/common';
import { PageResult, LockModel, ProjectModel, ProjectFormModel, AwardFormModel } from '@/ts/models';
import { LockService } from '@/ts/services';

const lockState: ILockState = {
    // 0创建，10锁仓资金操作中，20锁仓中，30锁仓到期,40锁仓失败
    statusOptions: [
        { label: '全部', value: '' },
        { label: '创建', value: '0' },
        { label: '锁仓资金操作中', value: '10' },
        { label: '锁仓中', value: '20' },
        { label: '锁仓到期', value: '30' },
        { label: '锁仓失败', value: '40' }
    ],

    lockParameters: {
        conditions: {
            uid: '',
            serial: '',
            status: '',
            beginTime: '',
            endTime: '',
            carrierId: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    projectParameters: {
        conditions: {
            projectId: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    totalCount: 0,
    list: [],

    projectForm: new ProjectFormModel(),
    awardForm: new AwardFormModel()
};

const lockService = new LockService();

export default {
    namespaced: true,
    state: lockState,
    mutations: {
        [TYPES.SET_STATES](state: ILockState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: ILockState) {
            state.lockParameters = {
                conditions: {
                    uid: '',
                    serial: '',
                    status: '',
                    beginTime: '',
                    endTime: '',
                    carrierId: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.projectParameters = {
                conditions: {
                    projectId: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.totalCount = 0;
            state.list = [];

            state.projectForm = new ProjectFormModel();
            state.awardForm = new AwardFormModel();
        }
    },
    actions: {
        // 获取锁仓列表
        async fetchLocks(context: IActionContext<ILockState>): Promise<void> {
            let { commit, state } = context,
                parameters = state.lockParameters;
            try {
                let result: PageResult<LockModel> = await lockService.fetchLocks(parameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 导出锁仓列表
        async exportLocks(context: IActionContext<ILockState>): Promise<string> {
            return await lockService.exportLocks(context.state.lockParameters);
        },

        // 获取项目列表
        async fetchProjects(context: IActionContext<ILockState>): Promise<void> {
            let { commit, state } = context,
                parameters = state.projectParameters;
            try {
                let result: PageResult<ProjectModel> = await lockService.fetchProjects(parameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 创建锁仓
        async crateProject(context: IActionContext<ILockState>, isCode: boolean = false): Promise<boolean> {
            return await lockService.crateProject(context.state.projectForm, isCode);
        },

        // 更新项目
        async updateProject(context: IActionContext<ILockState>, isCode: boolean = false): Promise<boolean> {
            return await lockService.updateProject(context.state.projectForm, isCode);
        },

        // 获取锁仓奖励信息
        async fetchLockAward(context: IActionContext<ILockState>): Promise<void> {
            let { commit, state } = context;
            try {
                let awardForm = await lockService.fetchLockAward();
                awardForm.originPromotionRate = awardForm.promotionRate;
                if (!awardForm.dailySalesDto) {
                    awardForm.dailySalesDto = [];
                }
                commit(TYPES.SET_STATES, { awardForm });
            } catch (error) {
                commit(TYPES.SET_STATES, { awardForm: new AwardFormModel() });
                Prompt.error(error.message || error);
            }
        },

        // 更新锁仓奖励信息
        async updateLockAward(context: IActionContext<ILockState>, isCode: boolean = false): Promise<boolean> {
            return await lockService.updateLockAward(context.state.awardForm, isCode);
        }
    }
};
