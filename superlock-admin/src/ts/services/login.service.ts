import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios, md5, Token } from '@/ts/common';
import { LoginFormModel } from '@/ts/models';

export class LoginService {
    // 验证登录表单
    public static validateLoginForm(loginForm: LoginFormModel): ValidationResult {
        if (!loginForm) return { status: false, data: { loginForm: '参数不可以为空' } };

        let key = 'login',
            { username, password } = loginForm,
            validator = new Validator();
        validator.addRule(key, { name: 'username', value: username }, { required: true }, { required: '用户名称不可以为空' });
        validator.addRule(key, { name: 'password', value: password }, { required: true }, { required: '密码不可以为空' });
        return validator.execute(key);
    }

    // 校验用户信息
    public async check(loginForm: LoginFormModel, isCode: boolean = false): Promise<boolean> {
        let validateResult: ValidationResult = LoginService.validateLoginForm(loginForm);
        if (!validateResult.status) return Promise.reject(Utils.getFirstValue(validateResult.data));

        let { username, password } = loginForm;
        Token.setName(username);
        await Caxios.post<any>(
            {
                url: Urls.login.check,
                data: { name: username, password: md5(password) }
            },
            CaxiosType.FullLoading,
            isCode,
            true
        );
        return true;
    }

    // 登录
    public async login(loginForm: LoginFormModel, isCode: boolean = false): Promise<string> {
        let validateResult: ValidationResult = LoginService.validateLoginForm(loginForm);
        if (!validateResult.status) return Promise.reject(Utils.getFirstValue(validateResult.data));

        let { username, password } = loginForm;
        Token.setName(username);
        let result = await Caxios.post<any>(
            {
                url: Urls.login.login,
                data: { name: username, password: md5(password) }
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
