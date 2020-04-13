import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { Modal } from 'ant-design-vue';
import TYPES from '@/store/types';
import { ResponseCode, OperationType } from '@/ts/config';
import { Prompt, Utils } from '@/ts/common';
import {
    IPageParameters,
    SecondVerifyResult,
    UserModel,
    UserForm,
    PasswordForm
} from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';
import UserModal from '@/components/system/user-modal';
import PasswordModal from '@/components/system/password-modal';

const systemModule = namespace('system');

const enum SecondVerifyType {
    Add = 1,
    Edit = 2,
    Delete = 3,
    resetPassword = 4,
    resetGa = 5
}

@Component({
    name: 'SystemUser',
    components: { SecondVerify, UserModal, PasswordModal }
})
export default class SystemUser extends Vue {
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('isPageLoading') isPageLoading!: boolean;

    @systemModule.State('roleOptions') roleOptions!: Array<any>;
    @systemModule.State('parameters') parameters!: IPageParameters<null>;
    @systemModule.State('totalCount') totalCount!: number;
    @systemModule.State('list') list!: Array<UserModel>;

    @systemModule.State('userForm') userForm!: UserForm;
    @systemModule.State('passwordForm') passwordForm!: PasswordForm;

    @systemModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @systemModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @systemModule.Action('fetchRoles') fetchRoles!: () => any;
    @systemModule.Action('fetchUsers') fetchUsers!: () => any;
    @systemModule.Action('addUser') addUser!: (isCode: boolean) => any;
    @systemModule.Action('updateUser') updateUser!: (isCode: boolean) => any;
    @systemModule.Action('deleteUser') deleteUser!: (payload: any) => any;
    @systemModule.Action('resetPassword') resetPassword!: (
        isCode: boolean
    ) => any;
    @systemModule.Action('resetGa') resetGa!: (payload: any) => any;

    isSecondVerifyShow: boolean = false; // 是否显示二次验证
    isUserShow: boolean = false; // 是否显示用户模态框
    isPasswordShow: boolean = false; // 是否显示密码模态框

    currentType: SecondVerifyType = SecondVerifyType.Add; // 当前二次验证类型
    currentOperation: OperationType = OperationType.Add; // 当前用户操作类型
    currentUser?: UserModel = new UserModel(); // 当前用户信息

    columns: Array<any> = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: '用户名',
            dataIndex: 'name'
        },
        {
            title: 'UKEY编号',
            dataIndex: 'uKey'
        },
        {
            title: '角色',
            dataIndex: 'roleName'
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'operation',
            scopedSlots: { customRender: 'operation' }
        }
    ];

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let parameters = Utils.duplicate(this.parameters);
        parameters.pageNum = page;
        parameters.pageSize = pageSize;
        this.setStates({ parameters });
        this.fetchUsers();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let parameters = Utils.duplicate(this.parameters);
        parameters.pageNum = 1;
        parameters.pageSize = pageSize;
        this.setStates({ parameters });
        this.fetchUsers();
    }

    // 私有函数：设置用户信息，添加或者更新
    async _setUser(userForm: UserForm, isCode: boolean) {
        try {
            this.setStates({ userForm });
            let operation = this.currentOperation,
                result =
                    operation === OperationType.Add
                        ? await this.addUser(isCode)
                        : await this.updateUser(isCode);
            if (!result)
                Prompt.error(`用户${['添加', '更新'][operation - 1]}失败`);
            else await this.fetchUsers();
        } catch (error) {
            let code = error.code;
            if (code === ResponseCode.SecondVerify) {
                let data = error.data as SecondVerifyResult;
                if (data.verifyMethod === '001') {
                    this.isSecondVerifyShow = true;
                }
            } else {
                Prompt.error(error.message || error);
            }
        }
    }

    // 私有函数：重置密码信息
    async _resetPassword(passwordForm: PasswordForm, isCode: boolean) {
        try {
            this.setStates({ passwordForm });
            let result = await this.resetPassword(isCode);
            if (!result) Prompt.error('密码修改失败');
            else {
                Prompt.success('密码修改成功');
                await this.fetchUsers();
            }
        } catch (error) {
            let code = error.code;
            if (code === ResponseCode.SecondVerify) {
                let data = error.data as SecondVerifyResult;
                if (data.verifyMethod === '001') {
                    this.isSecondVerifyShow = true;
                }
            } else {
                Prompt.error(error.message || error);
            }
        }
    }

    // 私有函数：删除用户信息
    async _deleteUser(name: string, isCode: boolean = false, code?: string) {
        try {
            let result = await this.deleteUser({ name, isCode, code });
            if (!result) Prompt.error('用户删除失败');
            else await this.fetchUsers();
        } catch (error) {
            let code = error.code;
            if (code === ResponseCode.SecondVerify) {
                let data = error.data as SecondVerifyResult;
                if (data.verifyMethod === '001') {
                    this.isSecondVerifyShow = true;
                }
            } else {
                Prompt.error(error.message || error);
            }
        }
    }

    // 私有函数：重置ga信息
    async _resetGa(name: string, isCode: boolean = false, code?: string) {
        try {
            let result = await this.resetGa({ name, isCode, code });
            if (!result) Prompt.error('GA重置失败');
            else {
                Prompt.success('GA重置成功');
                await this.fetchUsers();
            }
        } catch (error) {
            let code = error.code;
            if (code === ResponseCode.SecondVerify) {
                let data = error.data as SecondVerifyResult;
                if (data.verifyMethod === '001') {
                    this.isSecondVerifyShow = true;
                }
            } else {
                Prompt.error(error.message || error);
            }
        }
    }

    // 打开用户模态框
    openUserModal(type: OperationType, user?: UserModel) {
        this.isUserShow = true;
        this.currentUser = user;
        this.currentOperation = type;
        this.currentType = OperationType.Add
            ? SecondVerifyType.Add
            : SecondVerifyType.Edit;
    }

    // 打开密码模态框
    openPasswordModal(user: UserModel) {
        this.isPasswordShow = true;
        this.currentUser = user;
        this.currentType = SecondVerifyType.resetPassword;
    }

    // 打开删除确认框
    openDeleteConfirm(user: UserModel) {
        let self = this;
        Modal.confirm(<any>{
            title: '系统提示',
            content: '确认是否删除该用户？',
            onOk() {
                self.currentUser = user;
                self.currentType = SecondVerifyType.Delete;
                self._deleteUser(user.name, false);
            },
            onCancel() {}
        });
    }

    // 打开ga确认框
    openGaConfirm(user: UserModel) {
        let self = this;
        Modal.confirm(<any>{
            title: '系统提示',
            content: '确认是否重置该用户GA？',
            onOk() {
                self.currentUser = user;
                self.currentType = SecondVerifyType.resetGa;
                self._resetGa(user.name, false);
            },
            onCancel() {}
        });
    }

    // 处理用户模态框submit事件
    async handleUserSubmit(userForm: UserForm) {
        this._setUser(userForm, false);
    }

    // 处理密码模态框submit事件
    async handlePasswordSubmit(passwordForm: PasswordForm) {
        await this._resetPassword(passwordForm, false);
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit(code: string) {
        let user = this.currentUser,
            type = this.currentType;
        if (type === SecondVerifyType.Add || type === SecondVerifyType.Edit) {
            let userForm = Utils.duplicate(this.userForm);
            userForm.code = code;
            await this._setUser(userForm, true);
        } else if (type === SecondVerifyType.Delete) {
            if (user) {
                await this._deleteUser(user.name, true, code);
            }
        } else if (type === SecondVerifyType.resetPassword) {
            let passwordForm = Utils.duplicate(this.passwordForm);
            passwordForm.code = code;
            await this._resetPassword(passwordForm, true);
        } else if (type === SecondVerifyType.resetGa) {
            if (user) {
                await this._resetGa(user.name, true, code);
            }
        }
    }

    // 获取数据
    async fetchData() {
        await this.fetchRoles();
        await this.fetchUsers();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchData();
    }
}
