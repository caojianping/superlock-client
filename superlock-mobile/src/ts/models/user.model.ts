import { defaultAreaCode } from '../config';

// 用户表单
export class UserForm {
    public invitationCode?: string; // 邀请码
    public areaCode!: string; // 地区区号
    public mobile!: string; // 手机号
    public password!: string; // 密码(MD5加密)
    public smsCode!: string; // 短信验证码

    constructor() {
        this.invitationCode = '';
        this.areaCode = defaultAreaCode.code;
        this.mobile = '';
        this.password = '';
        this.smsCode = '';
    }

    public static createInstance(
        invitationCode: string,
        areaCode?: string
    ): UserForm {
        let userForm = new UserForm();
        userForm.invitationCode = invitationCode;
        if (areaCode) {
            userForm.areaCode = areaCode;
        }
        return userForm;
    }
}

// 用户信息
export class UserInfo {
    public token!: string; // 登陆token
    public userId!: string; // 用户uid
    public phone!: Map<string, string>; // 手机号信息
    public pttl!: number; // 超时时间
    public haveFundPasswd!: boolean; // 资金密码已设置标志，true已设置；false未设置；
    public nickName!: string; // 昵称
    public generalizationCode!: string; // 推广码
    public referralLink!: string; // 推广链接
}

// 用户锁仓额度
export class UserLockQuotaModel {
    public amount!: number;
    public coin!: string;
    public usedAmount!: number;
    public usedCoin!: string;
    public childCount!: number;
}
