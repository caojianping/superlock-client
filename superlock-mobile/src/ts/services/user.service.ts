import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType, defaultAreaCode, UserFormType } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import { UserFormModel, UserInfoModel, UserLockQuotaModel } from '@/ts/models';

import Locales from '@/locales';
const i18n = Locales.buildLocale();

export class UserService {
    //  校验用户表单
    public static validateUserForm(userForm: UserFormModel, type: UserFormType = UserFormType.Login): ValidationResult {
        if (!userForm) return { status: false, data: { userForm: i18n.tc('VALIDATES.PARAMETER_NOT_NULL') } };

        let key = 'userForm',
            { invitationCode, areaCode, mobile, password, confirmPassword, verifyMode, code } = userForm,
            validator = new Validator();
        validator.addRule(key, { name: 'areaCode', value: areaCode }, { required: true }, { required: i18n.tc('VALIDATES.COUNTRY_AREA_NOT_NULL') });
        if (areaCode === defaultAreaCode.code) {
            validator.addRule(
                key,
                { name: 'mobile', value: mobile },
                { required: true, mobile: true },
                {
                    required: i18n.tc('VALIDATES.MOBILE_NOT_NULL'),
                    mobile: i18n.tc('VALIDATES.MOBILE_FORMAT_WRONG')
                }
            );
        } else {
            validator.addRule(
                key,
                { name: 'mobile', value: mobile },
                { required: true, pureDigit: true },
                {
                    required: i18n.tc('VALIDATES.MOBILE_NOT_NULL'),
                    pureDigit: i18n.tc('VALIDATES.MOBILE_FORMAT_WRONG')
                }
            );
        }

        if (type === UserFormType.Login) {
            // 登录表单
            validator.addRule(
                key,
                { name: 'password', value: password },
                { required: true, password: true },
                {
                    required: i18n.tc('VALIDATES.LOGIN_PASSWORD_NOT_NULL'),
                    password: i18n.tc('VALIDATES.PASSWORD_FORMAT_PROMPT')
                }
            );
        } else if (type === UserFormType.Register) {
            // 注册表单
            validator.addRule(
                key,
                { name: 'invitationCode', value: invitationCode },
                { required: true },
                { required: i18n.tc('VALIDATES.INVITE_CODE_NOT_NULL') }
            );
            validator.addRule(
                key,
                { name: 'password', value: password },
                { required: true, password: true },
                {
                    required: i18n.tc('VALIDATES.LOGIN_PASSWORD_NOT_NULL'),
                    password: i18n.tc('VALIDATES.PASSWORD_FORMAT_PROMPT')
                }
            );
        } else if (type === UserFormType.ForgetMobile) {
            // 忘记密码表单（包含区号、手机号）
        } else if (type === UserFormType.ForgetSmsCode) {
            // 忘记密码表单（包含区号、手机号、验证码）
        } else if (type === UserFormType.Forget) {
            // 忘记密码表单
            validator.addRule(
                key,
                { name: 'password', value: password },
                { required: true, password: true },
                {
                    required: i18n.tc('VALIDATES.LOGIN_PASSWORD_NOT_NULL'),
                    password: i18n.tc('VALIDATES.PASSWORD_FORMAT_PROMPT')
                }
            );
            validator.addRule(
                key,
                { name: 'confirmPassword', value: confirmPassword },
                { equal: password },
                { equal: i18n.tc('VALIDATES.DIFFERENT_PASSWORD') }
            );
        }

        if (verifyMode && verifyMode !== '000') {
            validator.addRule(key, { name: 'code', value: code }, { required: true }, { required: i18n.tc('VALIDATES.CODE_NOT_NULL') });
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
        if (!nickname) return Promise.reject(i18n.tc('VALIDATES.NICKNAME_NOT_NULL'));
        await Caxios.post<any>({ url: `${Urls.user.setNickname}?nickName=${nickname}` }, CaxiosType.LoadingToken);
        return true;
    }
}
