// 日志模型
export class LogModel {
    public source!: string; // 操作平台
    public createTime!: string; // 时间
}

// 用户日志模型
export class UserLogModel extends LogModel {
    public uid!: string; // 用户UID
    public ip!: string; // IP地址
    public operate!: string; // 操作
}

// 系统日志模型
export class SystemLogModel extends LogModel {
    public userName!: string; // 用户名
    public operating!: string; // 操作
}
