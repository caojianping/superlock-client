import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { CaxiosType, Urls } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import { ISelectOption, IPageParameters } from '@/ts/interfaces';
import { UserFormModel, PageResult, UserModel, GoogleFormModel, PasswordFormModel } from '@/ts/models';

export class SystemService {
    // 验证用户表单
    public static validateUserForm(userForm: UserFormModel): ValidationResult {
        if (!userForm) return { status: false, data: { userForm: '参数不可以为空' } };

        let key = 'user',
            { name, password, uKey, roleId } = userForm,
            validator = new Validator();
        validator.addRule(key, { name: 'name', value: name }, { required: true }, { required: '用户名不可以为空' });
        if (password !== undefined) {
            validator.addRule(key, { name: 'password', value: password }, { required: true, password: true }, { required: '密码不可以为空' });
        }
        validator.addRule(key, { name: 'uKey', value: uKey }, { required: true }, { required: 'uKey不可以为空' });
        validator.addRule(key, { name: 'roleId', value: roleId }, { required: true }, { required: '用户角色不可以为空' });
        return validator.execute(key);
    }

    // 验证密码表单
    public static validatePasswordForm(passwordForm: PasswordFormModel): ValidationResult {
        if (!passwordForm) return { status: false, data: { userForm: '参数不可以为空' } };

        let key = 'password',
            { name, oldPwd, newPwd, confirmPwd } = passwordForm,
            validator = new Validator();
        validator.addRule(key, { name: 'name', value: name }, { required: true }, { required: '用户名不可以为空' });
        if (oldPwd !== undefined) {
            validator.addRule(key, { name: 'oldPwd', value: oldPwd }, { required: true }, { required: '原密码不可以为空' });
        }
        validator.addRule(key, { name: 'newPwd', value: newPwd }, { required: true, password: true }, { required: '新密码不可以为空' });
        validator.addRule(key, { name: 'confirmPwd', value: confirmPwd }, { equal: newPwd }, { equal: '两次密码输入不一致' });
        return validator.execute(key);
    }

    // 验证用户名
    public static validateName(name: string): ValidationResult {
        let key = 'name',
            validator = new Validator();
        validator.addRule(key, { name: 'name', value: name }, { required: true }, { required: '用户名不可以为空' });
        return validator.execute(key);
    }

    // 获取角色列表
    public async fetchRoles(): Promise<Array<ISelectOption>> {
        let roles = await Caxios.get<Array<any> | null>({ url: Urls.system.user.roles }, CaxiosType.FullLoadingToken);
        return Utils.arraySort(roles || [], 'id', true).map((item: any) => ({
            label: item.name,
            value: item.id
        }));
    }

    // 获取用户列表
    public async fetchUsers(parameters: IPageParameters<null>): Promise<PageResult<UserModel>> {
        let url = Urls.system.user.list,
            result = await Caxios.get<PageResult<UserModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters)}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<UserModel>(0, []);
        return result as PageResult<UserModel>;
    }

    // 添加用户
    public async addUser(userForm: UserFormModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = SystemService.validateUserForm(userForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { name, password, uKey, roleId } = userForm;
        await Caxios.post<any>(
            {
                url: Urls.system.user.add,
                data: {
                    name,
                    password: md5(password || ''),
                    uKey,
                    roleId
                }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }

    // 更新用户
    public async updateUser(userForm: UserFormModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = SystemService.validateUserForm(userForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { name, uKey, roleId } = userForm;
        await Caxios.post<any>(
            {
                url: Urls.system.user.update,
                data: { name, uKey, roleId }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }

    // 删除用户
    public async deleteUser(name: string, isCode: boolean = false) {
        let result: ValidationResult = SystemService.validateName(name);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        await Caxios.post<any>(
            {
                url: Urls.system.user.delete,
                data: { name: name }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }

    // 重置密码
    public async resetPassword(passwordForm: PasswordFormModel, isCode: boolean = false) {
        let result: ValidationResult = SystemService.validatePasswordForm(passwordForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { name, newPwd } = passwordForm;
        await Caxios.post<any>(
            {
                url: Urls.system.user.resetPassword,
                data: {
                    name: name,
                    password: md5(newPwd)
                }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }

    // 重置ga
    public async resetGa(name: string, isCode: boolean = false) {
        let result: ValidationResult = SystemService.validateName(name);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        await Caxios.post<any>(
            {
                url: Urls.system.user.resetGa,
                data: { name: name }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }

    // 设置总号
    public async setComGa(name: string, isCode: boolean = false) {
        let result: ValidationResult = SystemService.validateName(name);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        await Caxios.post<any>(
            {
                url: Urls.system.user.setComGa,
                data: { name: name }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }

    // 设置密码
    public async setPassword(passwordForm: PasswordFormModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = SystemService.validatePasswordForm(passwordForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { name, oldPwd, newPwd } = passwordForm;
        await Caxios.post<any>(
            {
                url: Urls.system.setPassword,
                data: {
                    name,
                    password: md5(newPwd),
                    oldPassWord: md5(oldPwd || '')
                }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }

    // 设置谷歌认证
    public async setGoogle(googleForm: GoogleFormModel): Promise<boolean> {
        if (!googleForm) return Promise.reject('参数不可以为空');

        await Caxios.post<any>(
            {
                url: Urls.system.setGoogle,
                data: googleForm
            },
            CaxiosType.FullLoadingToken
        );
        return true;
    }
}
