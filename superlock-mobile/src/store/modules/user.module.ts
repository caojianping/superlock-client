import TYPES from '@/store/types';
import { IActionContext, IUserState } from '@/store/interfaces';
import { RegisterStatus, ForgetType } from '@/ts/config';
import { Token } from '@/ts/common';
import { TokenInfo, UserFormModel } from '@/ts/models';
import { UserService, SecurityService } from '@/ts/services';

const userState: IUserState = {
    userLockQuota: undefined,
    userInfo: undefined,

    forgetType: ForgetType.LoginPassword,
    registerStatus: RegisterStatus.Default,
    userForm: new UserFormModel()
};

const userService = new UserService();
const securityService = new SecurityService();

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
            state.userLockQuota = undefined;
            state.userInfo = undefined;

            state.forgetType = ForgetType.LoginPassword;
            state.registerStatus = RegisterStatus.Default;
            state.userForm = new UserFormModel();
        }
    },
    actions: {
        // 校验用户登录密码
        async checkPassword(context: IActionContext<IUserState>): Promise<boolean> {
            return await userService.checkPassword(context.state.userForm);
        },

        // 注册
        async register(context: IActionContext<IUserState>): Promise<boolean> {
            let { commit, state } = context,
                result = await userService.register(state.userForm);
            if (result) {
                commit(TYPES.SET_STATES, { registerStatus: RegisterStatus.Success });
            }
            return result;
        },

        // 登录
        async login(context: IActionContext<IUserState>, isLoading?: boolean): Promise<boolean> {
            let { commit, state } = context,
                userInfo = await userService.login(state.userForm, isLoading);
            if (userInfo === null) return false;
            else {
                Token.clearAllStates(); // 补充操作：清除所有状态，以免之前用户状态仍然存在
                let tokenInfo: TokenInfo = TokenInfo.createInstance(userInfo.token, userInfo.pttl);
                Token.setTokenInfo(tokenInfo);
                commit(TYPES.SET_STATES, { tokenInfo }, { root: true });
                return true;
            }
        },

        // 退出
        async logout(context: IActionContext<IUserState>): Promise<boolean> {
            let result = await userService.logout();
            if (result) {
                Token.removeTokenInfo();
            }
            return result;
        },

        // 忘记密码
        async forgetPassword(context: IActionContext<IUserState>): Promise<boolean> {
            let { userForm, forgetType } = context.state;
            return forgetType === ForgetType.LoginPassword
                ? await securityService.forgetLoginPassword(userForm)
                : await securityService.forgetFundPassword(userForm);
        },

        // 获取用户锁仓额度信息
        async fetchUserLockQuota(context: IActionContext<IUserState>): Promise<void> {
            let commit = context.commit;
            try {
                let userLockQuota = await userService.fetchUserLockQuota();
                commit(TYPES.SET_STATES, { userLockQuota });
            } catch (error) {
                commit(TYPES.SET_STATES, { userLockQuota: null });
            }
        },

        // 获取用户信息
        async fetchUserInfo(context: IActionContext<IUserState>, isLoading: boolean = false): Promise<void> {
            let commit = context.commit;
            try {
                let userInfo = await userService.fetchUserInfo(isLoading);
                commit(TYPES.SET_STATES, { userInfo });
            } catch (error) {
                commit(TYPES.SET_STATES, { userInfo: null });
            }
        },

        // 设置昵称
        async setNickname(context: IActionContext<IUserState>, nickname: string): Promise<boolean> {
            return await userService.setNickname(nickname);
        }
    }
};
