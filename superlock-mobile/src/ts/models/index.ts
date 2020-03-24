export * from './user.model';

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
