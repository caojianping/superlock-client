import TYPES from '@/store/types';
import { IActionContext, IHomeState } from '@/store/interfaces';
import { UserLockQuotaModel } from '@/ts/models';
import { UserService, ProjectService } from '@/ts/services';

const homeState: IHomeState = {
    userLockQuota: new UserLockQuotaModel(),
    projectStats: undefined
};

const userService = new UserService();
const projectService = new ProjectService();

export default {
    namespaced: true,
    state: homeState,
    mutations: {
        [TYPES.SET_STATES](state: IHomeState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IHomeState) {
            state.userLockQuota = new UserLockQuotaModel();
            state.projectStats = undefined;
        }
    },
    actions: {
        // 获取用户锁仓额度信息
        async fetchUserLockQuota(
            context: IActionContext<IHomeState>
        ): Promise<void> {
            let commit = context.commit;
            try {
                let userLockQuota = await userService.fetchUserLockQuota();
                commit(TYPES.SET_STATES, { userLockQuota });
            } catch (error) {
                commit(TYPES.SET_STATES, {
                    userLockQuota: new UserLockQuotaModel()
                });
            }
        },

        // 获取资产统计信息
        async fetchProjectStats(
            context: IActionContext<IHomeState>
        ): Promise<void> {
            let commit = context.commit;
            try {
                let projectStats = await projectService.fetchProjectStats();
                commit(TYPES.SET_STATES, { projectStats });
            } catch (error) {
                commit(TYPES.SET_STATES, { projectStats: undefined });
            }
        }
    }
};
