import TYPES from '@/store/types';
import { IActionContext, ISystemState } from '@/store/interfaces';
import { PasswordFormModel } from '@/ts/models';
import { SystemService } from '@/ts/services';

const systemState: ISystemState = {
    passwordForm: new PasswordFormModel()
};

const systemService = new SystemService();

export default {
    namespaced: true,
    state: systemState,
    mutations: {
        [TYPES.SET_STATES](state: ISystemState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: ISystemState) {
            state.passwordForm = new PasswordFormModel();
        }
    },
    actions: {
        // 设置密码
        async setPassword(context: IActionContext<ISystemState>, isCode: boolean = false): Promise<boolean> {
            return await systemService.setPassword(context.state.passwordForm, isCode);
        }
    }
};
