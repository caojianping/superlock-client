import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType, defaultAreaCode } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import { UserFormModel, UserInfoModel, UserLockQuotaModel } from '@/ts/models';

export class UserService {
    //  校验用户表单
    public static validateUserForm(
        userForm: UserFormModel,
        isRegister: boolean = false
    ): ValidationResult {
        if (!userForm)
            return {
                status: false,
                data: { userForm: '用户表单参数不可以为空' }
            };

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

    // 登录
    public async login(userForm: UserFormModel): Promise<UserInfoModel | null> {
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
        return await Caxios.post<UserInfoModel | null>(
            { url: `${Urls.user.login}?${parameters}` },
            CaxiosType.Loading
        );
    }

    // 注册
    public async register(userForm: UserFormModel): Promise<boolean> {
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
    public async retrieval(userForm: UserFormModel): Promise<boolean> {
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

    // 获取用户锁仓额度信息
    public async fetchUserLockQuota(): Promise<UserLockQuotaModel | null> {
        return await Caxios.get<UserLockQuotaModel | null>(
            { url: Urls.user.lockQuota },
            CaxiosType.Token
        );
    }

    // 获取用户信息
    public async fetchUserInfo(): Promise<UserInfoModel> {
        let result = await Caxios.get<UserInfoModel | null>(
            { url: Urls.user.info },
            CaxiosType.Token
        );
        if (!result) return new UserInfoModel();
        return result as UserInfoModel;
    }

    // 设置昵称
    public async setNickname(nickname: string): Promise<boolean> {
        if (!nickname) return Promise.reject('昵称不可以为空');

        await Caxios.post<any>(
            { url: `${Urls.user.setNickname}?nickName=${nickname}` },
            CaxiosType.LoadingToken
        );
        return true;
    }
}
