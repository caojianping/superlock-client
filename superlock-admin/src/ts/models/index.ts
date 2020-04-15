import { ResponseCode } from '../config';

export * from './page.model';
export * from './login.model';
export * from './home.model';
export * from './recharge.model';
export * from './withdraw.model';
export * from './lock.model';
export * from './finance.model';
export * from './loan.model';
export * from './fund.model';
export * from './risk.model';
export * from './member.model';
export * from './point.model';
export * from './system.model';
export * from './carrier.model';

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
    code: ResponseCode | number;
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
    public token: string;
    public username: string;

    constructor(token: string, usrename: string) {
        this.token = token;
        this.username = usrename;
    }
}

// 二次验证结果
export class SecondVerifyResult {
    public type: string; // 验证类型
    public verifyMethod: string; // 验证方式

    constructor(type: string, verifyMethod: string) {
        this.type = type;
        this.verifyMethod = verifyMethod;
    }
}
