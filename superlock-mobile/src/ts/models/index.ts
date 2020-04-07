export * from './user.model';
export * from './child.model';
export * from './project.model';
export * from './transaction.model';
export * from './lock.model';
export * from './recharge.model';
export * from './withdraw.model';
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
