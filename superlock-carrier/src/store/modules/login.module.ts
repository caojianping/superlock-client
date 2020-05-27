import TYPES from '@/store/types';
import { ILoginState, IActionContext } from '@/store/interfaces';
import { Token } from '@/ts/common';
import { TokenInfo, LoginFormModel } from '@/ts/models';
import { LoginService } from '@/ts/services';

const loginState: ILoginState = {
    loginForm: new LoginFormModel(),
    code: ''
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
            state.code = '';
        }
    },
    actions: {
        // 获取短信验证码
        async fetchSmsCode(context: IActionContext<ILoginState>, payload: { areaCode: string; mobile: string }): Promise<boolean> {
            return await loginService.fetchSmsCode(payload.areaCode, payload.mobile);
        },

        // 获取邮箱验证码
        async fetchEmailCode(context: IActionContext<ILoginState>, email: string): Promise<boolean> {
            return await loginService.fetchEmailCode(email, context.state.loginForm.password || '');
        },

        // 校验用户信息
        async check(context: IActionContext<ILoginState>, isCode: boolean = false): Promise<boolean> {
            return await loginService.check(context.state.loginForm, isCode);
        },

        // 登录
        async login(context: IActionContext<ILoginState>, isCode: boolean = false): Promise<boolean> {
            let { commit, state } = context,
                loginForm = state.loginForm,
                result = await loginService.login(loginForm, isCode);
            if (!result) return false;

            let { token, name } = result;
            if (!token || !name) return false;

            let tokenInfo = new TokenInfo(token, name, '', '', loginForm.email || '');
            Token.setTokenInfo(tokenInfo);
            commit(TYPES.SET_STATES, { tokenInfo }, { root: true });
            return true;
        },

        // 注销
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
