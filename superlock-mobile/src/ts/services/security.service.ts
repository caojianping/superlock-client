import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType, UserFormType } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import { UserFormModel, SecurityFormModel, EmailFormModel } from '@/ts/models';
import { UserService } from './user.service';

import Locales from '@/locales';
const i18n = Locales.buildLocale();

export class SecurityService {
    // 校验安全中心表单
    public static validateSecurityForm(securityForm: SecurityFormModel, isSet: boolean = false): ValidationResult {
        if (!securityForm) return { status: false, data: { securityForm: i18n.tc('VALIDATES.PARAMETER_NOT_NULL') } };

        let key = 'securityForm',
            { oldPassword, newPassword, confirmPassword, verifyMode, code } = securityForm,
            validator = new Validator();
        if (!isSet) {
            validator.addRule(
                key,
                { name: 'oldPassword', value: oldPassword },
                { required: true, password: true },
                {
                    required: i18n.tc('VALIDATES.OLD_PASSWORD_NOT_NULL'),
                    password: i18n.tc('VALIDATES.PASSWORD_FORMAT_PROMPT')
                }
            );
        }
        validator.addRule(
            key,
            { name: 'newPassword', value: newPassword },
            { required: true, password: true },
            {
                required: i18n.tc('VALIDATES.NEW_PASSWORD_NOT_NULL'),
                password: i18n.tc('VALIDATES.PASSWORD_FORMAT_PROMPT')
            }
        );
        validator.addRule(
            key,
            { name: 'confirmPassword', value: confirmPassword },
            { equal: newPassword },
            { equal: i18n.tc('VALIDATES.DIFFERENT_PASSWORD') }
        );
        if (isSet) {
            if (verifyMode && verifyMode !== '000') {
                validator.addRule(key, { name: 'code', value: code }, { required: true }, { required: i18n.tc('VALIDATES.CODE_NOT_NULL') });
            }
        }
        return validator.execute(key);
    }

    // 校验邮箱表单
    public static validateEmailForm(emailForm: EmailFormModel): ValidationResult {
        if (!emailForm) return { status: false, data: { emailForm: i18n.tc('VALIDATES.PARAMETER_NOT_NULL') } };

        let key = 'emailForm',
            { emailAddress, emailCode } = emailForm,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'emailAddress', value: emailAddress },
            { required: true, email: true },
            {
                required: i18n.tc('VALIDATES.EMAIL_ADDRESS_NOT_NULL'),
                emailForm: i18n.tc('VALIDATES.EMAIL_ADDRESS_FORMAT_WRONG')
            }
        );
        validator.addRule(key, { name: 'emailCode', value: emailCode }, { required: true }, { required: i18n.tc('VALIDATES.EMAIL_CODE_NOT_NULL') });
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

        let { areaCode, mobile, password, verifyMode, code } = userForm,
            parameters = Utils.buildParameters({
                account: [areaCode, mobile].join(','),
                accountKind: 1,
                newPasswd: md5(password),
                verifyMode: verifyMode || '',
                vfcode: code || ''
            });
        await Caxios.post<any>({ url: `${Urls.security.loginPassword.forget}?${parameters}` }, CaxiosType.Loading);
        return true;
    }

    // 设置资金密码
    public async setFundPassword(securityForm: SecurityFormModel): Promise<boolean> {
        let result: ValidationResult = SecurityService.validateSecurityForm(securityForm, true);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { newPassword, verifyMode, code } = securityForm,
            paramters = Utils.buildParameters({
                passwd: md5(newPassword),
                verifyMode: verifyMode || '',
                vfcode: code || ''
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

        let { password, verifyMode, code } = userForm,
            parameters = Utils.buildParameters({
                newPasswd: md5(password),
                verifyMode: verifyMode || '',
                vfcode: code || ''
            });
        await Caxios.post<any>({ url: `${Urls.security.fundPassword.forget}?${parameters}` }, CaxiosType.LoadingToken);
        return true;
    }

    // 绑定邮箱
    public async bindEmail(emailForm: EmailFormModel): Promise<boolean> {
        let result: ValidationResult = SecurityService.validateEmailForm(emailForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { emailAddress, emailCode } = emailForm,
            parameters = Utils.buildParameters({ email: emailAddress, emailVcode: emailCode });
        await Caxios.post<any>({ url: `${Urls.security.bindEmail}?${parameters}` }, CaxiosType.LoadingToken);
        return true;
    }
}
