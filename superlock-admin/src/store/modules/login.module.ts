import TYPES from '@/store/types';
import { ILoginState, IActionContext } from '@/store/interfaces';
import { Token } from '@/ts/common';
import { TokenInfo, LoginFormModel } from '@/ts/models';
import { LoginService } from '@/ts/services';

const loginState: ILoginState = {
    loginForm: new LoginFormModel()
};

const loginService = new LoginService();

export default {
    namespaced: true,
    state: loginState,
    mutations: {
        [TYPES.SET_STATES](state: ILoginState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: ILoginState) {
            state.loginForm = new LoginFormModel();
        }
    },
    actions: {
        // 校验用户信息
        async check(context: IActionContext<ILoginState>, isCode: boolean = false): Promise<boolean> {
            return await loginService.check(context.state.loginForm, isCode);
        },

        // 登录
        async login(context: IActionContext<ILoginState>, isCode: boolean = false): Promise<boolean> {
            let { commit, state } = context,
                loginForm = state.loginForm,
                token = await loginService.login(loginForm, isCode),
                tokenInfo = new TokenInfo(token, loginForm.username);
            Token.setTokenInfo(tokenInfo);
            commit(TYPES.SET_STATES, { tokenInfo }, { root: true });
            return true;
        },

        // 退出
        async logout(context: IActionContext<ILoginState>): Promise<boolean> {
            let commit = context.commit,
                result = await loginService.logout();
            if (result) {
                Token.removeTokenInfo();
                commit(TYPES.CLEAR_STATES, { root: true });
            }
            return result;
        }
    }
};
