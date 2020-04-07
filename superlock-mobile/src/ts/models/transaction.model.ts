// 交易类型模型
export class TransactionTypeModel {
    public type!: number;
    public remark!: string;
}

// 交易模型
export class TransactionModel {
    public orderId!: string; // 交易记录ID
    public type!: number; // 业务类型
    public remark!: string; // 备注
    public amount!: number; // 金额
    public coin!: string; // 币种
    public symbol!: number; // 1:+;0:-;
    public voucher!: string; // 交易凭证；例如：订单号，交易hash等
    public createTime!: string; // 创建时间
    public balance!: number; // 当前可用余额
    public balanceCoin!: string; // 可用余额币种
}
