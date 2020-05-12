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
    ResetGa = 2,
    SetComGa = 3
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
    @systemModule.Action('setComGa') setComGa!: (payload: any) => any;

    isDisable: boolean = false; // 补充变量：此变量是为了避免组件中的二次验证与页面的二次验证冲突
    isUserShow: boolean = false;
    isPasswordShow: boolean = false;

    verifyType: SecondVerifyType = SecondVerifyType.DeleteUser;
    operationType: OperationType = OperationType.Add;
    user: UserModel = new UserModel();

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
            title: '总号',
            dataIndex: '',
            key: 'comGa',
            scopedSlots: { customRender: 'comGa' }
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'operation',
            scopedSlots: { customRender: 'operation' }
        }
    ];

    // 打开模态框
    openModal(key: string, user?: UserModel, operationType?: OperationType) {
        this[key] = true;
        user !== undefined && (this.user = user);
        operationType !== undefined && (this.operationType = operationType);
        this.isDisable = true;
    }

    // 处理模态框close事件
    handleModalClose() {
        this.isDisable = false;
    }

    // 处理模态框submit事件
    handleModalSubmit() {
        this.isDisable = false;
        this.fetchUsers();
    }

    // 设置用户信息
    async _setUser(verifyType: SecondVerifyType, name: string, isCode?: boolean) {
        try {
            let msg = {
                    1: '用户删除',
                    2: 'GA重置',
                    3: '总号设置'
                }[verifyType],
                func = {
                    1: this.deleteUser,
                    2: this.resetGa,
                    3: this.setComGa
                }[verifyType],
                result = await func({ name, isCode });
            if (!result) Prompt.error(`${msg}失败`);
            else {
                Prompt.success(`${msg}成功`);
                await this.fetchUsers();
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 打开确认框
    openConfirm(verifyType: SecondVerifyType, user: UserModel) {
        let self = this,
            msg = {
                1: '删除该用户',
                2: '重置该用户GA',
                3: '将该用户设置为总号'
            }[verifyType];
        Modal.confirm(<any>{
            title: '系统提示',
            content: `确认是否${msg}？`,
            onOk() {
                self.user = user;
                self.verifyType = verifyType;
                self._setUser(verifyType, user.name, false);
            },
            onCancel() {}
        });
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit() {
        this._setUser(this.verifyType, this.user.name, true);
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
