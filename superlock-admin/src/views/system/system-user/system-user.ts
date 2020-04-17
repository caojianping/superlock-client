import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { OperationType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { IPageParameters } from '@/ts/interfaces';
import { UserModel, UserFormModel, PasswordFormModel } from '@/ts/models';

import { Modal } from 'ant-design-vue';
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
    @State('isPageLoading') isPageLoading!: boolean;
    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;

    @systemModule.State('roleOptions') roleOptions!: Array<any>;
    @systemModule.State('parameters') parameters!: IPageParameters<null>;
    @systemModule.State('totalCount') totalCount!: number;
    @systemModule.State('list') list!: Array<UserModel>;
    @systemModule.State('userForm') userForm!: UserFormModel;
    @systemModule.State('passwordForm') passwordForm!: PasswordFormModel;
    @systemModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @systemModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @systemModule.Action('fetchRoles') fetchRoles!: () => any;
    @systemModule.Action('fetchUsers') fetchUsers!: () => any;
    @systemModule.Action('addUser') addUser!: (isCode: boolean) => any;
    @systemModule.Action('updateUser') updateUser!: (isCode: boolean) => any;
    @systemModule.Action('deleteUser') deleteUser!: (payload: any) => any;
    @systemModule.Action('resetPassword') resetPassword!: (isCode: boolean) => any;
    @systemModule.Action('resetGa') resetGa!: (payload: any) => any;

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

    // 私有函数：设置用户信息，添加或者更新
    async _setUser(userForm: UserFormModel, isCode: boolean) {
        try {
            this.setStates({ userForm });
            let operation = this.currentOperation,
                result = operation === OperationType.Add ? await this.addUser(isCode) : await this.updateUser(isCode);
            if (!result) Prompt.error(`用户${['添加', '更新'][operation - 1]}失败`);
            else await this.fetchUsers();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 私有函数：重置密码信息
    async _resetPassword(passwordForm: PasswordFormModel, isCode: boolean) {
        try {
            this.setStates({ passwordForm });
            let result = await this.resetPassword(isCode);
            if (!result) Prompt.error('密码修改失败');
            else {
                Prompt.success('密码修改成功');
                await this.fetchUsers();
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 私有函数：删除用户信息
    async _deleteUser(name: string, isCode: boolean = false) {
        try {
            let result = await this.deleteUser({ name, isCode });
            if (!result) Prompt.error('用户删除失败');
            else await this.fetchUsers();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 私有函数：重置ga信息
    async _resetGa(name: string, isCode: boolean = false) {
        try {
            let result = await this.resetGa({ name, isCode });
            if (!result) Prompt.error('GA重置失败');
            else {
                Prompt.success('GA重置成功');
                await this.fetchUsers();
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 打开用户模态框
    openUserModal(type: OperationType, user?: UserModel) {
        this.isUserShow = true;
        this.currentUser = user;
        this.currentOperation = type;
        this.currentType = OperationType.Add ? SecondVerifyType.Add : SecondVerifyType.Edit;
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
    async handleUserSubmit(userForm: UserFormModel) {
        this._setUser(userForm, false);
    }

    // 处理密码模态框submit事件
    async handlePasswordSubmit(passwordForm: PasswordFormModel) {
        await this._resetPassword(passwordForm, false);
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit() {
        let user = this.currentUser,
            type = this.currentType;
        if (type === SecondVerifyType.Add || type === SecondVerifyType.Edit) {
            await this._setUser(this.userForm, true);
        } else if (type === SecondVerifyType.Delete) {
            if (user) {
                await this._deleteUser(user.name, true);
            }
        } else if (type === SecondVerifyType.resetPassword) {
            await this._resetPassword(this.passwordForm, true);
        } else if (type === SecondVerifyType.resetGa) {
            if (user) {
                await this._resetGa(user.name, true);
            }
        }
    }

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

    // 获取数据，并发获取
    fetchData() {
        this.fetchRoles();
        this.fetchUsers();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchData();
    }
}
