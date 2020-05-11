import { ResponseCode } from '../config';

export * from './page.model';
export * from './login.model';
export * from './home.model';
export * from './lock.model';
export * from './finance.model';
export * from './member.model';
export * from './carrier.model';
export * from './system.model';

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
    code: ResponseCode | number; // code码
    data: T; // 数据
    message: string; // 消息

    constructor(code: number, data: T, message: string) {
        this.code = code;
        this.data = data;
        this.message = message;
    }
}

// token信息
export class TokenInfo {
    public token: string; // token
    public username: string; // 用户名
    public areaCode: string; // 补充字段：国家、地区区号
    public mobile: string; // 补充字段：手机号
    public email: string; // 补充字段：邮箱

    constructor(token: string, usrename: string, areaCode: string, mobile: string, email: string) {
        this.token = token;
        this.username = usrename;
        this.areaCode = areaCode;
        this.mobile = mobile;
        this.email = email;
    }

    public static createInstance(): TokenInfo {
        return new TokenInfo('', '', '', '', '');
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
