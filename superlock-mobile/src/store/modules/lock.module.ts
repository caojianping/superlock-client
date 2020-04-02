import TYPES from '@/store/types';
import { IActionContext, ILockState } from '@/store/interfaces';
import { ProjectModel, LockFormModel } from '@/ts/models';
import { LockService } from '@/ts/services';

const lockState: ILockState = {
    lockProject: new ProjectModel(),
    lockForm: new LockFormModel(),
    locks: undefined
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
            state.lockProject = new ProjectModel();
            state.lockForm = new LockFormModel();
            state.locks = undefined;
        }
    },
    actions: {
        // 获取最小锁仓金额
        async fetchMinLockAmount(
            context: IActionContext<ILockState>
        ): Promise<number> {
            return await lockService.fetchMinLockAmount();
        },

        // 获取锁仓列表
        async fetchLocks(context: IActionContext<ILockState>): Promise<void> {
            let commit = context.commit;
            try {
                let locks = await lockService.fetchLocks();
                commit(TYPES.SET_STATES, { locks });
            } catch (error) {
                commit(TYPES.SET_STATES, { locks: [] });
            }
        },

        // 创建锁仓
        async createLock(
            context: IActionContext<ILockState>
        ): Promise<boolean> {
            let state = context.state;
            return await lockService.createLock(state.lockForm);
        }
    }
};
