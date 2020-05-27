import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { CaxiosType, Urls } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import { PasswordFormModel } from '@/ts/models';

export class SystemService {
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

    // 设置密码
    public async setPassword(passwordForm: PasswordFormModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = SystemService.validatePasswordForm(passwordForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { name, oldPwd, newPwd } = passwordForm;
        await Caxios.post<any>(
            {
                url: Urls.system.setPassword,
                data: { name, password: md5(newPwd), oldPassWord: md5(oldPwd || '') }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }
}
