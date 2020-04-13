import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType, UserFormType } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import { UserFormModel, SecurityFormModel } from '@/ts/models';
import { UserService } from './user.service';

export class SecurityService {
    // 校验安全中心表单
    public static validateSecurityForm(securityForm: SecurityFormModel, isSet: boolean = false): ValidationResult {
        if (!securityForm)
            return {
                status: false,
                data: { userForm: '安全中心表单参数不可以为空' }
            };

        const key = 'withdrawForm';
        let { oldPassword, newPassword, confirmPassword, smsCode } = securityForm,
            validator = new Validator();
        if (!isSet) {
            validator.addRule(key, { name: 'oldPassword', value: oldPassword }, { required: true, password: true }, { required: '旧密码不可以为空' });
        }
        validator.addRule(key, { name: 'newPassword', value: newPassword }, { required: true, password: true }, { required: '新密码不可以为空' });
        validator.addRule(key, { name: 'confirmPassword', value: confirmPassword }, { equal: newPassword }, { equal: '两次密码输入不一致' });
        if (isSet) {
            validator.addRule(key, { name: 'smsCode', value: smsCode }, { required: true }, { required: '短信验证码不可以为空' });
        }
        return validator.execute(key);
    }

    // 修改登录密码
    public async modifyLoginPassword(securityForm: SecurityFormModel): Promise<boolean> {
        let result: ValidationResult = SecurityService.validateSecurityForm(securityForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { oldPassword, newPassword } = securityForm,
            paramters = Utils.buildParameters({
                oldPasswd: md5(oldPassword || ''),
                newPasswd: md5(newPassword)
            });
        await Caxios.post<any>({ url: `${Urls.security.loginPassword.modify}?${paramters}` }, CaxiosType.Token);
        return true;
    }

    // 忘记登录密码
    public async forgetLoginPassword(userForm: UserFormModel): Promise<boolean> {
        let result: ValidationResult = UserService.validateUserForm(userForm, UserFormType.Forget);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { areaCode, mobile, password, smsCode } = userForm,
            parameters = Utils.buildParameters({
                account: [areaCode, mobile].join(','),
                accountKind: 1,
                newPasswd: md5(password),
                vfcode: smsCode
            });
        await Caxios.post<any>({ url: `${Urls.security.loginPassword.forget}?${parameters}` }, CaxiosType.Loading);
        return true;
    }

    // 设置资金密码
    public async setFundPassword(securityForm: SecurityFormModel): Promise<boolean> {
        let result: ValidationResult = SecurityService.validateSecurityForm(securityForm, true);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { newPassword, smsCode } = securityForm,
            paramters = Utils.buildParameters({
                passwd: md5(newPassword),
                vfcode: smsCode
            });
        await Caxios.post<any>({ url: `${Urls.security.fundPassword.set}?${paramters}` }, CaxiosType.Token);
        return true;
    }

    // 修改资金密码
    public async modifyFundPassword(securityForm: SecurityFormModel): Promise<boolean> {
        let result: ValidationResult = SecurityService.validateSecurityForm(securityForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { oldPassword, newPassword } = securityForm,
            paramters = Utils.buildParameters({
                oldPasswd: md5(oldPassword || ''),
                newPasswd: md5(newPassword)
            });
        await Caxios.post<any>({ url: `${Urls.security.fundPassword.modify}?${paramters}` }, CaxiosType.Token);
        return true;
    }

    // 忘记资金密码
    public async forgetFundPassword(userForm: UserFormModel): Promise<boolean> {
        let result: ValidationResult = UserService.validateUserForm(userForm, UserFormType.Forget);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { areaCode, mobile, password, smsCode } = userForm,
            parameters = Utils.buildParameters({
                newPasswd: md5(password),
                vfcode: smsCode
            });
        await Caxios.post<any>({ url: `${Urls.security.fundPassword.forget}?${parameters}` }, CaxiosType.LoadingToken);
        return true;
    }
}
