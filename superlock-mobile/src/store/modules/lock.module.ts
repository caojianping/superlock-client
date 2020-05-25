import TYPES from '@/store/types';
import { IActionContext, ILockState } from '@/store/interfaces';
import { LockFormModel, LockResultModel, LockInterestModel } from '@/ts/models';
import { LockService } from '@/ts/services';

import Locales from '@/locales';
const i18n = Locales.buildLocale();

const lockState: ILockState = {
    lockStatuses: new Map([
        [0, i18n.tc('ARRAY.LOCK_STATUSES.0')],
        [10, i18n.tc('ARRAY.LOCK_STATUSES.1')],
        [20, i18n.tc('ARRAY.LOCK_STATUSES.2')],
        [21, i18n.tc('ARRAY.LOCK_STATUSES.3')],
        [30, i18n.tc('ARRAY.LOCK_STATUSES.4')],
        [40, i18n.tc('ARRAY.LOCK_STATUSES.5')],
        [50, i18n.tc('ARRAY.LOCK_STATUSES.6')]
    ]),
    lockColors: new Map([
        [0, 'gray'],
        [10, 'green'],
        [20, 'green'],
        [21, 'gray'],
        [30, 'red'],
        [40, 'gray'],
        [50, 'orange']
    ]),

    lockProject: undefined,
    lockForm: new LockFormModel(),

    pageNum: 1,
    pageSize: 15,
    lockInterests: undefined,
    locks: undefined,

    id: '',
    lock: undefined,
    lockResult: undefined
};

const lockService = new LockService();

var isPending = false;

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

            state.pageNum = 1;
            state.pageSize = 15;
            state.lockInterests = undefined;
            state.locks = undefined;

            state.lock = undefined;
            state.lockResult = undefined;
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
        },

        // 获取锁仓利息列表
        async fetchLockInterests(context: IActionContext<ILockState>): Promise<Array<LockInterestModel> | undefined> {
            if (isPending) return undefined;

            isPending = true;
            let { commit, state } = context;
            try {
                let { id, pageNum, pageSize, lockInterests } = state,
                    data = await lockService.fetchLockInterests(id, pageNum, pageSize);
                if (pageNum === 1) {
                    commit(TYPES.SET_STATES, {
                        pageNum: pageNum + 1,
                        lockInterests: data
                    });
                } else {
                    commit(TYPES.SET_STATES, {
                        pageNum: pageNum + 1,
                        lockInterests: (lockInterests || []).concat(data)
                    });
                }
                isPending = false;
                return data;
            } catch (error) {
                commit(TYPES.SET_STATES, { lockInterests: [] });
                isPending = false;
                return [];
            }
        }
    }
};
