import TYPES from '@/store/types';
import { IActionContext, IUserState } from '@/store/interfaces';
import { RegisterStatus } from '@/ts/config';
import { Token } from '@/ts/common';
import { UserForm } from '@/ts/models';
import { UserService } from '@/ts/services';

const userState: IUserState = {
    userForm: new UserForm(),
    registerStatus: RegisterStatus.Default
};

const userService = new UserService();

export default {
    namespaced: true,
    state: userState,
    mutations: {
        [TYPES.SET_STATES](state: IUserState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IUserState) {
            state.userForm = new UserForm();
        }
    },
    actions: {
        // 登录
        async login(context: IActionContext<IUserState>): Promise<boolean> {
            let { commit, state } = context,
                tokenInfo = await userService.login(state.userForm);
            if (tokenInfo === null) return false;
            else {
                Token.setTokenInfo(tokenInfo);
                commit(TYPES.SET_STATES, { tokenInfo }, { root: true });
                return true;
            }
        },

        // 注册
        async register(context: IActionContext<IUserState>): Promise<boolean> {
            let { commit, state } = context,
                result = await userService.register(state.userForm);
            if (result) {
                commit(TYPES.SET_STATES, {
                    registerStatus: RegisterStatus.Success
                });
            }
            return result;
        },

        // 找回密码
        async retrieval(context: IActionContext<IUserState>): Promise<boolean> {
            let state = context.state;
            return await userService.retrieval(state.userForm);
        }
    }
};
