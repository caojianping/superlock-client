import { defaultAreaCode } from '../config';

// 用户表单模型
export class UserFormModel {
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
    ): UserFormModel {
        let userForm = new UserFormModel();
        userForm.invitationCode = invitationCode;
        if (areaCode) {
            userForm.areaCode = areaCode;
        }
        return userForm;
    }
}

// 用户信息模型
export class UserInfoModel {
    public token!: string; // 登陆token
    public userId!: string; // 用户uid
    public phone!: Map<string, string>; // 手机号信息
    public pttl!: number; // 超时时间
    public haveFundPasswd!: boolean; // 资金密码已设置标志，true已设置；false未设置；
    public nickName!: string; // 昵称
    public generalizationCode!: string; // 推广码
    public referralLink!: string; // 推广链接
}

// 用户锁仓额度模型
export class UserLockQuotaModel {
    public amount!: number; // 可用锁仓额度
    public coin!: string; // 可用锁仓额度币种；默认DC
    public valuationAmount!: number; // 可用锁仓额度计价金额
    public valuationCoin!: string; // 可用锁仓额度计价币种：BCB
    public usedAmount!: number; // 已用锁仓额度；
    public usedCoin!: string; // 已用额度币种；
    public childCount!: number; // 下级数量；
}
