import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { OperationType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { ISelectOption } from '@/ts/interfaces';
import { UserFormModel, UserModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const systemModule = namespace('system');

@Component({
    name: 'UserModal',
    components: { SecondVerify }
})
export default class UserModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly operationType!: OperationType; // 操作类型
    @Prop() readonly user!: UserModel; // 用户数据

    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;

    @systemModule.State('roleOptions') roleOptions!: Array<ISelectOption>;
    @systemModule.State('userForm') userForm!: UserFormModel;
    @systemModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @systemModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @systemModule.Action('fetchRoles') fetchRoles!: () => any;
    @systemModule.Action('addUser') addUser!: (isCode?: boolean) => any;
    @systemModule.Action('updateUser') updateUser!: (isCode?: boolean) => any;

    isShow: boolean = this.value; // 是否显示模态框
    title: string = ''; // 标题

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let userForm = Utils.duplicate(this.userForm);
        userForm[key] = value;
        this.setStates({ userForm });
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交用户表单
    async submit(isCode?: boolean) {
        console.log('submitUser isCode,userForm:', isCode, this.userForm);
        try {
            let operationType = this.operationType,
                msg = `用户${['添加', '更新'][operationType - 1]}`,
                result = operationType === OperationType.Add ? await this.addUser(isCode) : await this.updateUser(isCode);
            if (!result) Prompt.error(`${msg}失败`);
            else {
                Prompt.success(`${msg}成功`);
                this.$emit('close', false);
                this.$emit('submit');
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            let userForm = new UserFormModel(),
                operationType = this.operationType;
            this.title = ['添加用户', '用户资料修改'][operationType - 1];
            if (operationType === OperationType.Add) {
                userForm.password = '';
            } else if (operationType === OperationType.Edit) {
                let user = this.user;
                if (user) {
                    userForm.name = user.name;
                    userForm.password = undefined; // 修改用户时，密码必须为undefined
                    userForm.uKey = user.uKey;
                    userForm.roleId = Number(user.roleId);
                }
            }
            this.setStates({ userForm });
            this.fetchRoles();
        }
    }
}
