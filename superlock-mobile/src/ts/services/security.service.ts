import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import { SecurityFormModel } from '@/ts/models';

export class SecurityService {
    // 校验安全中心表单
    public static validateSecurityForm(
        securityForm: SecurityFormModel
    ): ValidationResult {
        if (!securityForm)
            return {
                status: false,
                data: { userForm: '安全中心表单参数不可以为空' }
            };

        const key = 'withdrawForm';
        let { oldPassword, newPassword, confirmPassword } = securityForm,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'oldPassword', value: oldPassword },
            { required: true },
            { required: '旧密码不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'newPassword', value: newPassword },
            { required: true },
            { required: '新密码不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'confirmPassword', value: confirmPassword },
            { equal: newPassword },
            { equal: '两次密码输入不一致' }
        );
        return validator.execute(key);
    }

    // 修改登录密码
    public async modifyLoginPassword(
        securityForm: SecurityFormModel
    ): Promise<boolean> {
        let result: ValidationResult = SecurityService.validateSecurityForm(
            securityForm
        );
        if (!result.status)
            return Promise.reject(Utils.getFirstValue(result.data));

        let { oldPassword, newPassword } = securityForm,
            paramters = Utils.buildParameters({
                oldPasswd: md5(oldPassword),
                newPasswd: md5(newPassword)
            });
        await Caxios.get<any>(
            { url: `${Urls.security.modifyLoginPassword}?${paramters}` },
            CaxiosType.Token
        );
        return true;
    }

    // 修改资金密码
    public async modifyFundPassword(
        securityForm: SecurityFormModel
    ): Promise<boolean> {
        let result: ValidationResult = SecurityService.validateSecurityForm(
            securityForm
        );
        if (!result.status)
            return Promise.reject(Utils.getFirstValue(result.data));

        let { oldPassword, newPassword } = securityForm,
            paramters = Utils.buildParameters({
                oldPasswd: md5(oldPassword),
                newPasswd: md5(newPassword)
            });
        await Caxios.get<any>(
            { url: `${Urls.security.modifyFundPassword}?${paramters}` },
            CaxiosType.Token
        );
        return true;
    }
}
