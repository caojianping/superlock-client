import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios, md5, Token } from '@/ts/common';
import { LoginFormModel } from '@/ts/models';

export class LoginService {
    // 登录
    public async login(loginForm: LoginFormModel, isCode: boolean = false): Promise<string> {
        if (!loginForm) return Promise.reject('参数不可以为空');

        let key = 'login',
            { username, password } = loginForm,
            validator = new Validator();
        validator.addRule(key, { name: 'username', value: username }, { required: true }, { required: '用户名称不可以为空' });
        validator.addRule(key, { name: 'password', value: password }, { required: true }, { required: '密码不可以为空' });

        let validateResult: ValidationResult = validator.execute(key);
        if (!validateResult.status) return Promise.reject(Utils.getFirstValue(validateResult.data));

        Token.setName(username);
        let result = await Caxios.post<any>(
            {
                url: Urls.login.login,
                data: {
                    name: username,
                    password: md5(password)
                }
            },
            CaxiosType.FullLoading,
            isCode,
            true
        );
        return result ? result.token : '';
    }

    // 退出
    public async logout(): Promise<boolean> {
        await Caxios.post<any>({ url: Urls.login.logout }, CaxiosType.FullLoadingToken);
        return true;
    }
}
