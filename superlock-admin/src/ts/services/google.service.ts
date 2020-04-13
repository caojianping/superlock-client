import Validator, { ValidationResult } from 'jpts-validator';
import { Urls, CaxiosType, CONSTANTS } from '@/ts/config';
import { Utils, Caxios, md5 } from '@/ts/common';
import { LoginForm } from '@/ts/models';

export class GoogleService {
    // 获取谷歌认证密钥
    public async fetchGoogleKey(loginForm: LoginForm): Promise<string> {
        if (!loginForm) return Promise.reject('参数不可以为空');

        const key = 'login';
        let { username } = loginForm,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'username', value: username },
            { required: true },
            { required: '用户名不可以为空' }
        );

        let result: ValidationResult = validator.execute(key);
        if (!result.status)
            return Promise.reject(Utils.getFirstValue(result.data));

        let gakey = await Caxios.get<string | null>(
            {
                headers: {
                    [CONSTANTS.HEADER_NAME]: username
                },
                url: Urls.google.key
            },
            CaxiosType.FullLoading
        );
        return gakey || '';
    }

    // 绑定谷歌认证
    public async bindGoogle(loginForm: LoginForm): Promise<string> {
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
        validator.addRule(
            key,
            { name: 'code', value: code },
            { required: true },
            { required: '验证码不可以为空' }
        );

        let validateResult: ValidationResult = validator.execute(key);
        if (!validateResult.status)
            return Promise.reject(Utils.getFirstValue(validateResult.data));

        let result = await Caxios.post<any>(
            {
                headers: {
                    [CONSTANTS.HEADER_NAME]: username,
                    [CONSTANTS.HEADER_CODE]: code
                },
                url: Urls.google.bind,
                data: {
                    name: username,
                    password: md5(password)
                }
            },
            CaxiosType.FullLoading
        );
        return result ? result.token : '';
    }

    // 解除谷歌认证
    public async unbindGoogle(gacode: string): Promise<boolean> {
        if (!gacode) return Promise.reject('谷歌验证码不可以为空');

        await Caxios.post<string | null>(
            {
                url: Urls.google.unbind,
                data: { gacode: gacode }
            },
            CaxiosType.FullLoadingToken
        );
        return true;
    }
}
