import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, defaultAreaCode, AreaCodes, CaxiosType, IAreaCode } from '@/ts/config';
import { Caxios, md5, Token } from '@/ts/common';
import { LoginFormModel } from '@/ts/models';

export class LoginService {
    // 验证登录表单
    public static validateLoginForm(loginForm: LoginFormModel, isPassword: boolean = false): ValidationResult {
        if (!loginForm) return { status: false, data: { loginForm: '参数不可以为空' } };

        let key = 'login',
            { areaCode, mobile, password } = loginForm,
            validator = new Validator();
        if (areaCode === defaultAreaCode.id) {
            validator.addRule(key, { name: 'mobile', value: mobile }, { required: true, mobile: true }, { required: '手机号不可以为空' });
        } else {
            validator.addRule(key, { name: 'mobile', value: mobile }, { required: true, pureDigit: true }, { required: '手机号不可以为空' });
        }
        if (isPassword) {
            validator.addRule(key, { name: 'password', value: password }, { required: true }, { required: '密码不可以为空' });
        }
        return validator.execute(key);
    }

    // 登录
    public async login(loginForm: LoginFormModel, isCode: boolean = false): Promise<any> {
        let result: ValidationResult = LoginService.validateLoginForm(loginForm, true);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { areaCode, mobile, password } = loginForm,
            filterAreaCode = AreaCodes.filter((item: IAreaCode) => item.id === areaCode)[0];
        if (!filterAreaCode) return Promise.reject('未找到对应的国家、地区区号');

        Token.setName(mobile);
        return await Caxios.post<any>(
            {
                url: Urls.login.login,
                data: {
                    areaCode: '+' + filterAreaCode.code,
                    name: mobile,
                    password: md5(password)
                }
            },
            CaxiosType.FullLoading,
            isCode,
            true
        );
    }

    // 获取短信验证码
    public async fetchSmsCode(loginForm: LoginFormModel): Promise<boolean> {
        let result: ValidationResult = LoginService.validateLoginForm(loginForm, true);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { areaCode, mobile } = loginForm,
            url = Urls.login.smsCode,
            parameters = Utils.buildParameters({ areaCode, mobile });
        await Caxios.get<any>({ url: `${url}?${parameters}` }, CaxiosType.FullLoading);
        return true;
    }

    // 退出
    public async logout(): Promise<boolean> {
        await Caxios.post<any>({ url: Urls.login.logout }, CaxiosType.FullLoadingToken);
        return true;
    }
}
