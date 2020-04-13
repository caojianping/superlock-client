import TYPES from '@/store/types';
import { IActionContext, ILockState } from '@/store/interfaces';
import { Prompt } from '@/ts/common';
import {
    PageResult,
    LockRecordModel,
    LockProjectModel,
    ProjectForm,
    AwardForm
} from '@/ts/models';
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

    recordParameters: {
        conditions: {
            uid: '',
            serial: '',
            status: '',
            beginTime: '',
            endTime: ''
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

    projectForm: new ProjectForm(),
    awardForm: new AwardForm()
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
            state.recordParameters = {
                conditions: {
                    uid: '',
                    serial: '',
                    status: '',
                    beginTime: '',
                    endTime: ''
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

            state.projectForm = new ProjectForm();
            state.awardForm = new AwardForm();
        }
    },
    actions: {
        // 获取锁仓记录分页列表
        async fetchPageLockRecords(
            context: IActionContext<ILockState>
        ): Promise<void> {
            let { commit, state } = context,
                parameters = state.recordParameters;
            try {
                let result: PageResult<LockRecordModel> = await lockService.fetchPageLockRecords(
                    parameters
                );
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, {
                    totalCount: 0,
                    list: []
                });
                return Promise.reject(error);
            }
        },

        // 导出锁仓记录
        async exportLockRecords(
            context: IActionContext<ILockState>
        ): Promise<string> {
            let state = context.state;
            return await lockService.exportLockRecords(state.recordParameters);
        },

        // 创建锁仓
        async crateLockProject(
            context: IActionContext<ILockState>,
            isCode: boolean = false
        ): Promise<boolean> {
            let state = context.state;
            return await lockService.crateLockProject(
                state.projectForm,
                isCode
            );
        },

        // 更新锁仓项目
        async updateLockProject(
            context: IActionContext<ILockState>,
            isCode: boolean = false
        ): Promise<boolean> {
            let state = context.state;
            return await lockService.updateLockProject(
                state.projectForm,
                isCode
            );
        },

        // 获取锁仓奖励信息
        async fetchLockAward(
            context: IActionContext<ILockState>
        ): Promise<void> {
            let { commit, state } = context;
            try {
                let awardForm = await lockService.fetchLockAward();
                awardForm.originPromotionRate = awardForm.promotionRate;
                if (!awardForm.dailySalesDto) {
                    awardForm.dailySalesDto = [];
                }
                commit(TYPES.SET_STATES, { awardForm });
            } catch (error) {
                commit(TYPES.SET_STATES, { awardForm: new AwardForm() });
                Prompt.error(error.message || error);
            }
        },

        // 更新锁仓奖励信息
        async updateLockAward(
            context: IActionContext<ILockState>,
            isCode: boolean = false
        ): Promise<boolean> {
            let state = context.state;
            return await lockService.updateLockAward(state.awardForm, isCode);
        },

        // 获取锁仓项目分页列表
        async fetchPageLockProjects(
            context: IActionContext<ILockState>
        ): Promise<void> {
            let { commit, state } = context,
                parameters = state.projectParameters;
            try {
                let result: PageResult<LockProjectModel> = await lockService.fetchPageLockProjects(
                    parameters
                );
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, {
                    totalCount: 0,
                    list: []
                });
                return Promise.reject(error);
            }
        }
    }
};
