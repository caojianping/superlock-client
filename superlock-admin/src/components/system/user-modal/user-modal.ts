import Vue from 'vue';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';
import Validator, { ValidationResult } from 'jpts-validator';
import { OperationType } from '@/ts/config';
import { Utils, Prompt } from '@/ts/common';
import { UserForm, ISelectOption, UserModel } from '@/ts/models';

@Component({
    name: 'UserModal',
    components: {}
})
export default class UserModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly roleOptions!: Array<ISelectOption>; // 角色选项列表
    @Prop() readonly type!: OperationType; // 操作类型
    @Prop() readonly user?: UserModel; // 用户数据

    isShow: boolean = this.value; // 是否显示模态框
    title: string = ''; // 标题
    userForm: UserForm = new UserForm(); // 用户表单

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let userForm = Utils.duplicate(this.userForm);
        userForm[key] = value;
        this.userForm = userForm;
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交用户信息
    async submit() {
        const key = 'user';
        let type = this.type,
            id = this.user ? this.user.id : '',
            { name, password, uKey, roleId } = this.userForm,
            validator = new Validator();
        if (type === OperationType.Add) {
            validator.addRule(
                key,
                { name: 'password', value: password },
                { required: true, password: true },
                { required: '密码不可以为空' }
            );
        } else if (type === OperationType.Edit) {
            validator.addRule(
                key,
                { name: 'id', value: id },
                { required: true },
                { required: '用户编号不可以为空' }
            );
        }
        validator.addRule(
            key,
            { name: 'name', value: name },
            { required: true },
            { required: '用户名不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'uKey', value: uKey },
            { required: true },
            { required: 'uKey不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'roleId', value: roleId },
            { required: true },
            { required: '用户角色不可以为空' }
        );

        let result: ValidationResult = validator.execute(key);
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        this.$emit('close', false);
        this.$emit('submit', this.userForm);
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            let userForm = new UserForm(),
                type = this.type;
            userForm.code = undefined;
            this.title = ['添加用户', '用户资料修改'][type - 1];
            if (type === OperationType.Add) {
                userForm.password = '';
                this.userForm = userForm;
            } else if (type === OperationType.Edit) {
                let user = this.user;
                if (user) {
                    userForm.name = user.name;
                    userForm.password = undefined; // 修改用户时，密码必须为undefined
                    userForm.uKey = user.uKey;
                    userForm.roleId = Number(user.roleId);
                    this.userForm = userForm;
                }
            }
        }
    }
}
