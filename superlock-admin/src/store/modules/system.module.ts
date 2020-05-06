import TYPES from '@/store/types';
import { IActionContext, ISystemState } from '@/store/interfaces';
import { ISelectOption } from '@/ts/interfaces';
import { PageResult, UserModel, UserFormModel, PasswordFormModel, GoogleFormModel } from '@/ts/models';
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

    userForm: new UserFormModel(),
    passwordForm: new PasswordFormModel(),
    googleForm: new GoogleFormModel()
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

            state.userForm = new UserFormModel();
            state.passwordForm = new PasswordFormModel();
            state.googleForm = new GoogleFormModel();
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
            let { commit, state } = context;
            try {
                let result: PageResult<UserModel> = await systemService.fetchUsers(state.parameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        // 添加用户
        async addUser(context: IActionContext<ISystemState>, isCode: boolean = false): Promise<boolean> {
            return await systemService.addUser(context.state.userForm, isCode);
        },

        // 更新用户
        async updateUser(context: IActionContext<ISystemState>, isCode: boolean = false): Promise<boolean> {
            return await systemService.updateUser(context.state.userForm, isCode);
        },

        // 删除用户
        async deleteUser(
            context: IActionContext<ISystemState>,
            payload: {
                name: string;
                isCode?: boolean;
            }
        ): Promise<boolean> {
            return await systemService.deleteUser(payload.name, payload.isCode);
        },

        // 重置密码
        async resetPassword(context: IActionContext<ISystemState>, isCode: boolean = false): Promise<boolean> {
            return await systemService.resetPassword(context.state.passwordForm, isCode);
        },

        // 重置ga
        async resetGa(
            context: IActionContext<ISystemState>,
            payload: {
                name: string;
                isCode?: boolean;
            }
        ): Promise<boolean> {
            return await systemService.resetGa(payload.name, payload.isCode);
        },

        // 设置密码
        async setPassword(context: IActionContext<ISystemState>, isCode: boolean = false): Promise<boolean> {
            return await systemService.setPassword(context.state.passwordForm, isCode);
        },

        // 设置谷歌认证
        async setGoogle(context: IActionContext<ISystemState>): Promise<boolean> {
            return await systemService.setGoogle(context.state.googleForm);
        }
    }
};
