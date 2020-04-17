import TYPES from '@/store/types';
import { ILoginState, IActionContext } from '@/store/interfaces';
import { Token } from '@/ts/common';
import { TokenInfo, LoginFormModel } from '@/ts/models';
import { LoginService } from '@/ts/services';

const loginState: ILoginState = {
    loginForm: new LoginFormModel(),
    smsCode: ''
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
            state.smsCode = '';
        }
    },
    actions: {
        // 登录
        async login(context: IActionContext<ILoginState>, isCode: boolean = false): Promise<boolean> {
            let { commit, state } = context,
                loginForm = state.loginForm,
                result = await loginService.login(loginForm, isCode);
            if (!result) return false;

            let { token, username } = result;
            if (!token || !username) return false;

            let { areaCode, mobile } = loginForm,
                tokenInfo = new TokenInfo(token, username, areaCode, mobile);
            Token.setTokenInfo(tokenInfo);
            commit(TYPES.SET_STATES, { tokenInfo }, { root: true });
            return true;
        },

        // 获取短信验证码
        async fetchSmsCode(context: IActionContext<ILoginState>): Promise<boolean> {
            return await loginService.fetchSmsCode(context.state.loginForm);
        },

        // 退出
        async logout(context: IActionContext<ILoginState>): Promise<boolean> {
            let result = await loginService.logout();
            if (result) {
                Token.removeTokenInfo();
                context.commit(TYPES.CLEAR_STATES, { root: true });
            }
            return result;
        }
    }
};
