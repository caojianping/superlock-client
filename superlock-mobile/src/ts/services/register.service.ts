import Validator, { ValidationResult } from 'jpts-validator';
import { Urls, CaxiosType, defaultAreaCode } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import Utils from '@/ts/utils';
import { RegisterForm } from '@/ts/models';

export class RegisterService {
    // 获取短信验证码
    public async fetchSmsCode(registerForm: RegisterForm): Promise<boolean> {
        if (!registerForm) return Promise.reject('参数不可以为空');

        const key = 'smsCode';
        let { areaCode, mobile } = registerForm,
            validator = new Validator();
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
                url: Urls.smsCode,
                data: { account: [areaCode, mobile].join(',') }
            },
            CaxiosType.Default
        );
        return true;
    }

    // 注册用户
    public async register(registerForm: RegisterForm): Promise<boolean> {
        if (!registerForm) return Promise.reject('参数不可以为空');

        const key = 'register';
        let {
                invitationCode,
                brandKey,
                areaCode,
                mobile,
                password,
                smsCode
            } = registerForm,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'invitationCode', value: invitationCode },
            { required: true },
            { required: '邀请码不可以为空' }
        );
        // validator.addRule(
        //     key,
        //     { name: 'brandKey', value: brandKey },
        //     { required: true },
        //     { required: '商户key不可以为空' }
        // );
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

        let result: ValidationResult = validator.execute(key);
        if (!result.status)
            return Promise.reject(Utils.getFirstValue(result.data));

        let params = Utils.buildParameters({
            account: [areaCode, mobile].join(','),
            accountKind: 1,
            invitationCode: invitationCode,
            // brandKey: brandKey,
            passwd: md5(password),
            vfcode: smsCode
        });
        await Caxios.post<any>(
            { url: `${Urls.register}?${params}` },
            CaxiosType.Loading
        );
        return true;
    }
}
