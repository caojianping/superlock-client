import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType, defaultAreaCode } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import { UserForm, TokenInfo } from '@/ts/models';

export class UserService {
    //  校验用户表单
    public static validateUserForm(
        userForm: UserForm,
        isRegister: boolean = false
    ): ValidationResult {
        if (!userForm)
            return { status: false, data: { userForm: '参数不可以为空' } };

        const key = 'userForm';
        let { invitationCode, areaCode, mobile, password, smsCode } = userForm,
            validator = new Validator();
        if (isRegister) {
            validator.addRule(
                key,
                { name: 'invitationCode', value: invitationCode },
                { required: true },
                { required: '邀请码不可以为空' }
            );
        }
        validator.addRule(
            key,
            { name: 'areaCode', value: areaCode },
            { required: true },
            { required: '国家/地区区号不可以为空' }
        );
        if (areaCode === defaultAreaCode.code) {
            validator.addRule(
                key,
                { name: 'mobile', value: mobile },
                { required: true, mobile: true },
                { required: '手机号不可以为空' }
            );
        } else {
            validator.addRule(
                key,
                { name: 'mobile', value: mobile },
                { required: true },
                { required: '手机号不可以为空' }
            );
        }
        validator.addRule(
            key,
            { name: 'password', value: password },
            { required: true, password: true },
            { required: '登录密码不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'smsCode', value: smsCode },
            { required: true },
            { required: '短信验证码不可以为空' }
        );
        return validator.execute(key);
    }

    // 获取短信验证码
    public async fetchSmsCode(
        areaCode: string,
        mobile: string
    ): Promise<boolean> {
        const key = 'smsCode';
        let validator = new Validator();
        validator.addRule(
            key,
            { name: 'areaCode', value: areaCode },
            { required: true },
            { required: '国家/地区区号不可以为空' }
        );
        if (areaCode === defaultAreaCode.code) {
            validator.addRule(
                key,
                { name: 'mobile', value: mobile },
                { required: true, mobile: true },
                { required: '手机号不可以为空' }
            );
        } else {
            validator.addRule(
                key,
                { name: 'mobile', value: mobile },
                { required: true },
                { required: '手机号不可以为空' }
            );
        }

        let result: ValidationResult = validator.execute(key);
        if (!result.status)
            return Promise.reject(Utils.getFirstValue(result.data));

        await Caxios.post<string | null>(
            {
                url: Urls.user.smsCode,
                data: { account: [areaCode, mobile].join(',') }
            },
            CaxiosType.Default
        );
        return true;
    }

    // 登录
    public async login(userForm: UserForm): Promise<TokenInfo | null> {
        let result: ValidationResult = UserService.validateUserForm(userForm);
        if (!result.status)
            return Promise.reject(Utils.getFirstValue(result.data));

        let { areaCode, mobile, password, smsCode } = userForm,
            parameters = Utils.buildParameters({
                account: [areaCode, mobile].join(','),
                accountKind: 1,
                passwd: md5(password),
                vfcode: smsCode
            });
        return await Caxios.post<TokenInfo | null>(
            { url: `${Urls.user.login}?${parameters}` },
            CaxiosType.Loading
        );
    }

    // 注册
    public async register(userForm: UserForm): Promise<boolean> {
        let result: ValidationResult = UserService.validateUserForm(
            userForm,
            true
        );
        if (!result.status)
            return Promise.reject(Utils.getFirstValue(result.data));

        let { invitationCode, areaCode, mobile, password, smsCode } = userForm,
            parameters = Utils.buildParameters({
                invitationCode: invitationCode,
                account: [areaCode, mobile].join(','),
                accountKind: 1,
                passwd: md5(password),
                vfcode: smsCode
            });
        await Caxios.post<any>(
            { url: `${Urls.user.register}?${parameters}` },
            CaxiosType.Loading
        );
        return true;
    }

    // 找回密码
    public async retrieval(userForm: UserForm): Promise<boolean> {
        let result: ValidationResult = UserService.validateUserForm(userForm);
        if (!result.status)
            return Promise.reject(Utils.getFirstValue(result.data));

        let { areaCode, mobile, password, smsCode } = userForm,
            parameters = Utils.buildParameters({
                account: [areaCode, mobile].join(','),
                accountKind: 1,
                newPasswd: md5(password),
                vfcode: smsCode
            });
        await Caxios.post<any>(
            { url: `${Urls.user.retrieval}?${parameters}` },
            CaxiosType.Loading
        );
        return true;
    }
}
