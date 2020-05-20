import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType, defaultAreaCode, UserFormType } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import { UserFormModel, UserInfoModel, UserLockQuotaModel } from '@/ts/models';

export class UserService {
    //  校验用户表单
    public static validateUserForm(userForm: UserFormModel, type: UserFormType = UserFormType.Login): ValidationResult {
        if (!userForm) return { status: false, data: { userForm: '用户表单参数不可以为空' } };

        let key = 'userForm',
            { invitationCode, areaCode, mobile, password, confirmPassword, verifyMode, code } = userForm,
            validator = new Validator();
        validator.addRule(key, { name: 'areaCode', value: areaCode }, { required: true }, { required: '国家/地区区号不可以为空' });
        if (areaCode === defaultAreaCode.code) {
            validator.addRule(key, { name: 'mobile', value: mobile }, { required: true, mobile: true }, { required: '手机号不可以为空' });
        } else {
            validator.addRule(
                key,
                { name: 'mobile', value: mobile },
                { required: true, pureDigit: true },
                { required: '手机号不可以为空', pureDigit: '手机号格式不正确' }
            );
        }

        if (type === UserFormType.Login) {
            // 登录表单
            validator.addRule(key, { name: 'password', value: password }, { required: true, password: true }, { required: '登录密码不可以为空' });
        } else if (type === UserFormType.Register) {
            // 注册表单
            validator.addRule(key, { name: 'invitationCode', value: invitationCode }, { required: true }, { required: '邀请码不可以为空' });
            validator.addRule(key, { name: 'password', value: password }, { required: true, password: true }, { required: '登录密码不可以为空' });
        } else if (type === UserFormType.ForgetMobile) {
            // 忘记密码表单（包含区号、手机号）
        } else if (type === UserFormType.ForgetSmsCode) {
            // 忘记密码表单（包含区号、手机号、验证码）
        } else if (type === UserFormType.Forget) {
            // 忘记密码表单
            validator.addRule(key, { name: 'password', value: password }, { required: true, password: true }, { required: '登录密码不可以为空' });
            validator.addRule(key, { name: 'confirmPassword', value: confirmPassword }, { equal: password }, { equal: '两次密码输入不一致' });
        }

        if (verifyMode && verifyMode !== '000') {
            validator.addRule(key, { name: 'code', value: code }, { required: true }, { required: '验证码不可以为空' });
        }
        return validator.execute(key);
    }

    // 注册
    public async register(userForm: UserFormModel): Promise<boolean> {
        let result: ValidationResult = UserService.validateUserForm(userForm, UserFormType.Register);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { invitationCode, areaCode, mobile, password, verifyMode, code } = userForm,
            parameters = Utils.buildParameters({
                invitationCode: invitationCode,
                account: [areaCode, mobile].join(','),
                accountKind: 1,
                passwd: md5(password),
                verifyMode: verifyMode || '',
                vfcode: code || ''
            });
        await Caxios.post<any>({ url: `${Urls.user.register}?${parameters}` }, CaxiosType.Loading);
        return true;
    }

    // 登录
    public async login(userForm: UserFormModel, isLoading: boolean = false): Promise<UserInfoModel | null> {
        let result: ValidationResult = UserService.validateUserForm(userForm, UserFormType.Login);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { areaCode, mobile, password, verifyMode, code } = userForm,
            parameters = Utils.buildParameters({
                account: [areaCode, mobile].join(','),
                accountKind: 1,
                passwd: md5(password),
                verifyMode: verifyMode || '',
                vfcode: code || ''
            });
        return await Caxios.post<UserInfoModel | null>(
            { url: `${Urls.user.login}?${parameters}` },
            isLoading ? CaxiosType.Loading : CaxiosType.Default
        );
    }

    // 退出
    public async logout(): Promise<boolean> {
        await Caxios.post<any>({ url: Urls.user.logout }, CaxiosType.LoadingToken);
        return true;
    }

    // 获取用户锁仓额度信息
    public async fetchUserLockQuota(): Promise<UserLockQuotaModel | null> {
        return await Caxios.get<UserLockQuotaModel | null>({ url: Urls.user.lockQuota }, CaxiosType.Token);
    }

    // 获取用户信息
    public async fetchUserInfo(isLoading: boolean = false): Promise<UserInfoModel | null> {
        return await Caxios.get<UserInfoModel | null>({ url: Urls.user.info }, isLoading ? CaxiosType.LoadingToken : CaxiosType.Token);
    }

    // 设置昵称
    public async setNickname(nickname: string): Promise<boolean> {
        if (!nickname) return Promise.reject('用户昵称不可以为空');
        await Caxios.post<any>({ url: `${Urls.user.setNickname}?nickName=${nickname}` }, CaxiosType.LoadingToken);
        return true;
    }
}
