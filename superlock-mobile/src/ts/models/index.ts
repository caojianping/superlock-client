export * from './user.model';
export * from './child.model';
export * from './project.model';
export * from './transaction.model';
export * from './lock.model';
export * from './recharge.model';
export * from './withdraw.model';
export * from './transfer.model';
export * from './security.model';

// 业务型错误
export class BusinessError<T> implements Error {
    public code: number; // 错误码
    public message: string; // 错误消息
    public data?: T; // 错误数据
    public name: string; // 错误名称

    constructor(code: number, message: string, data?: T, name?: string) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.name = name || '';
    }
}

// 响应结果
export class ResponseResult<T> {
    code: number;
    data: T;
    message: string;

    constructor(code: number, data: T, message: string) {
        this.code = code;
        this.data = data;
        this.message = message;
    }
}

// token信息
export class TokenInfo {
    public token!: string; // 登陆token
    public pttl!: number; // 超时时间

    public static createInstance(token: string, pttl: number) {
        let tokenInfo = new TokenInfo();
        tokenInfo.token = token;
        tokenInfo.pttl = pttl;
        return tokenInfo;
    }
}

// 验证结果
export class VerifyResult {
    public needVerify!: number; // 是否需要验证
    public verifyMode!: string; // 验证方式：100邮箱验证；010短信验证；001谷歌验证；
    public email?: string; // 邮箱，空时表示未绑定邮箱
}

// 可提现、可转账额度模型
export class QuotaModel {
    public amount!: number; // 可提现、可转账BCB额度
    public valuationAmount!: number; // 计价金额；
    public valuationCoin!: number; // 计价币种；如：DC
}

// 汇率模型
export class ExchangeRateModel {
    public rate!: number; // 汇率
    public fromCoin!: string; // 支付币种，如DC
    public toCoin!: string; // 获得币种，如BCB
    public date!: string; // 日期
}
