import TYPES from '@/store/types';
import { IActionContext, ILockState } from '@/store/interfaces';
import { LockFormModel, LockResultModel } from '@/ts/models';
import { LockService } from '@/ts/services';

const lockState: ILockState = {
    lockStatuses: new Map([
        [0, '订单已创建'],
        [10, '订单处理中'],
        [20, '锁仓计息中'],
        [30, '锁仓到期'],
        [40, '锁仓失败'],
        [50, '贷款质押中']
    ]),
    lockColors: new Map([
        [0, 'black'],
        [10, 'gray'],
        [20, 'green'],
        [30, 'red'],
        [40, 'pink'],
        [50, 'orange']
    ]),

    lockProject: undefined,
    lockForm: new LockFormModel(),
    lockResult: undefined,
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
            state.lockProject = undefined;
            state.lockForm = new LockFormModel();
            state.lockResult = undefined;
            state.locks = undefined;
        }
    },
    actions: {
        // 获取最小锁仓金额
        async fetchMinLockAmount(context: IActionContext<ILockState>): Promise<number> {
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
        async createLock(context: IActionContext<ILockState>): Promise<LockResultModel | null> {
            let state = context.state;
            return await lockService.createLock(state.lockForm);
        }
    }
};
