import Validator, { ValidationResult } from 'jpts-validator';
import { Urls, CaxiosType, CONSTANTS } from '@/ts/config';
import { Utils, Caxios, md5 } from '@/ts/common';
import { LoginForm } from '@/ts/models';

export class LoginService {
    // 登录
    public async login(
        loginForm: LoginForm,
        isCode: boolean = false
    ): Promise<string> {
        if (!loginForm) return Promise.reject('参数不可以为空');

        const key = 'login';
        let { username, password, code } = loginForm,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'username', value: username },
            { required: true },
            { required: '用户名不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'password', value: password },
            { required: true },
            { required: '密码不可以为空' }
        );
        if (isCode) {
            validator.addRule(
                key,
                { name: 'code', value: code },
                { required: true },
                { required: '验证码不可以为空' }
            );
        }

        let validateResult: ValidationResult = validator.execute(key);
        if (!validateResult.status)
            return Promise.reject(Utils.getFirstValue(validateResult.data));

        let result = await Caxios.post<any>(
            {
                headers: isCode
                    ? {
                          [CONSTANTS.HEADER_NAME]: username,
                          [CONSTANTS.HEADER_CODE]: code
                      }
                    : { [CONSTANTS.HEADER_NAME]: username },
                url: Urls.login.login,
                data: {
                    name: username,
                    password: md5(password)
                }
            },
            CaxiosType.FullLoading
        );
        return result ? result.token : '';
    }

    // 退出
    public async logout(): Promise<boolean> {
        await Caxios.post<any>(
            { url: Urls.login.logout },
            CaxiosType.FullLoadingToken
        );
        return true;
    }
}
