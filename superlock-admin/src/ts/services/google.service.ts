import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios, md5, Token } from '@/ts/common';
import { LoginFormModel } from '@/ts/models';

export class GoogleService {
    // 获取谷歌认证密钥
    public async fetchGoogleKey(loginForm: LoginFormModel): Promise<string> {
        if (!loginForm) return Promise.reject('参数不可以为空');

        let key = 'googleKey',
            { username } = loginForm,
            validator = new Validator();
        validator.addRule(key, { name: 'username', value: username }, { required: true }, { required: '用户名不可以为空' });

        let result: ValidationResult = validator.execute(key);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        Token.setName(username);
        let gakey = await Caxios.get<string | null>({ url: Urls.google.key }, CaxiosType.FullLoading, false, true);
        return gakey || '';
    }

    // 绑定谷歌认证
    public async bindGoogle(loginForm: LoginFormModel): Promise<string> {
        if (!loginForm) return Promise.reject('参数不可以为空');

        let key = 'bindGoogle',
            { username, password } = loginForm,
            validator = new Validator();
        validator.addRule(key, { name: 'username', value: username }, { required: true }, { required: '用户名不可以为空' });
        validator.addRule(key, { name: 'password', value: password }, { required: true }, { required: '密码不可以为空' });

        let validateResult: ValidationResult = validator.execute(key);
        if (!validateResult.status) return Promise.reject(Utils.getFirstValue(validateResult.data));

        Token.setName(username);
        let result = await Caxios.post<any>(
            {
                url: Urls.google.bind,
                data: {
                    name: username,
                    password: md5(password)
                }
            },
            CaxiosType.FullLoading,
            true,
            true
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
