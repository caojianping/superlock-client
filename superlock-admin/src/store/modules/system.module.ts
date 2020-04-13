import TYPES from '@/store/types';
import { IActionContext, ISystemState } from '@/store/interfaces';
import {
    ISelectOption,
    PageResult,
    UserModel,
    UserForm,
    PasswordForm,
    GoogleForm
} from '@/ts/models';
import { SystemService } from '@/ts/services';

const systemState: ISystemState = {
    roleOptions: [],

    parameters: {
        conditions: null,
        pageNum: 1,
        pageSize: 10
    },
    totalCount: 0,
    list: [],

    userForm: new UserForm(),
    passwordForm: new PasswordForm(),
    googleForm: new GoogleForm()
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
            state.roleOptions = [];

            state.parameters = {
                conditions: null,
                pageNum: 1,
                pageSize: 10
            };
            state.list = [];

            state.userForm = new UserForm();
            state.passwordForm = new PasswordForm();
            state.googleForm = new GoogleForm();
        }
    },
    actions: {
        // 获取角色列表
        async fetchRoles(context: IActionContext<ISystemState>): Promise<void> {
            let commit = context.commit;
            try {
                let roles: Array<ISelectOption> = await systemService.fetchRoles();
                commit(TYPES.SET_STATES, { roleOptions: roles });
            } catch (error) {
                commit(TYPES.SET_STATES, { roleOptions: [] });
            }
        },

        // 获取用户分页列表
        async fetchUsers(context: IActionContext<ISystemState>): Promise<void> {
            let { commit, state } = context,
                parameters = state.parameters;
            try {
                let result: PageResult<UserModel> = await systemService.fetchUsers(
                    parameters
                );
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, {
                    totalCount: 0,
                    list: []
                });
                return Promise.reject(error);
            }
        },

        // 添加用户
        async addUser(
            context: IActionContext<ISystemState>,
            isCode: boolean = false
        ): Promise<boolean> {
            let state = context.state;
            return await systemService.addUser(state.userForm, isCode);
        },

        // 更新用户
        async updateUser(
            context: IActionContext<ISystemState>,
            isCode: boolean = false
        ): Promise<boolean> {
            let state = context.state;
            return await systemService.updateUser(state.userForm, isCode);
        },

        // 删除用户
        async deleteUser(
            context: IActionContext<ISystemState>,
            payload: {
                name: string;
                isCode: boolean;
                code: string;
            }
        ): Promise<boolean> {
            let { name, isCode, code } = payload;
            return await systemService.deleteUser(name, isCode, code);
        },

        // 重置密码
        async resetPassword(
            context: IActionContext<ISystemState>,
            isCode: boolean = false
        ): Promise<boolean> {
            let state = context.state;
            return await systemService.resetPassword(
                state.passwordForm,
                isCode
            );
        },

        // 重置ga
        async resetGa(
            context: IActionContext<ISystemState>,
            payload: {
                name: string;
                isCode: boolean;
                code: string;
            }
        ): Promise<boolean> {
            let { name, isCode, code } = payload;
            return await systemService.resetGa(name, isCode, code);
        },

        // 设置密码
        async setPassword(
            context: IActionContext<ISystemState>,
            isCode: boolean = false
        ): Promise<boolean> {
            let state = context.state;
            return await systemService.setPassword(state.passwordForm, isCode);
        },

        // 设置谷歌认证
        async setGoogle(
            context: IActionContext<ISystemState>
        ): Promise<boolean> {
            let state = context.state;
            return await systemService.setGoogle(state.googleForm);
        }
    }
};
