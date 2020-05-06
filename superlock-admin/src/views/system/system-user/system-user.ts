import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { OperationType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { IPageParameters } from '@/ts/interfaces';
import { UserModel } from '@/ts/models';

import { Modal } from 'ant-design-vue';
import SecondVerify from '@/components/common/second-verify';
import UserModal from '@/components/system/user-modal';
import PasswordModal from '@/components/system/password-modal';

const systemModule = namespace('system');

const enum SecondVerifyType {
    DeleteUser = 1,
    resetGa = 2
}

@Component({
    name: 'SystemUser',
    components: { SecondVerify, UserModal, PasswordModal }
})
export default class SystemUser extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;

    @systemModule.State('parameters') parameters!: IPageParameters<null>;
    @systemModule.State('totalCount') totalCount!: number;
    @systemModule.State('list') list!: Array<UserModel>;
    @systemModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @systemModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @systemModule.Action('fetchUsers') fetchUsers!: () => any;
    @systemModule.Action('deleteUser') deleteUser!: (payload: any) => any;
    @systemModule.Action('resetGa') resetGa!: (payload: any) => any;

    isUserShow: boolean = false;
    isPasswordShow: boolean = false;

    verifyType: SecondVerifyType = SecondVerifyType.DeleteUser;
    operationType: OperationType = OperationType.Add;
    user?: UserModel;

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

    // 打开用户模态框
    openUserModal(operationType: OperationType, user?: UserModel) {
        this.isUserShow = true;
        this.user = user;
        this.operationType = operationType;
    }

    // 打开密码模态框
    openPasswordModal(user: UserModel) {
        this.isPasswordShow = true;
        this.user = user;
    }

    // 处理模态框submit事件
    handleModalSubmit() {
        this.fetchUsers();
    }

    // 私有函数：删除用户信息
    async _deleteUser(name: string, isCode?: boolean) {
        try {
            let result = await this.deleteUser({ name, isCode });
            if (!result) Prompt.error('用户删除失败');
            else await this.fetchUsers();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 私有函数：重置ga信息
    async _resetGa(name: string, isCode?: boolean) {
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

    // 打开删除确认框
    openDeleteConfirm(user: UserModel) {
        let self = this;
        Modal.confirm(<any>{
            title: '系统提示',
            content: '确认是否删除该用户？',
            onOk() {
                self.user = user;
                self.verifyType = SecondVerifyType.DeleteUser;
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
                self.user = user;
                self.verifyType = SecondVerifyType.resetGa;
                self._resetGa(user.name, false);
            },
            onCancel() {}
        });
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit() {
        let user = this.user;
        if (!user) return;

        let name = user.name,
            verifyType = this.verifyType;
        if (verifyType === SecondVerifyType.DeleteUser) {
            await this._deleteUser(name, true);
        } else if (verifyType === SecondVerifyType.resetGa) {
            await this._resetGa(name, true);
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

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchUsers();
    }
}
