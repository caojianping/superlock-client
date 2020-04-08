// 交易类型模型
export class TransactionTypeModel {
    public type!: number;
    public remark!: string;

    constructor(type: number, remark: string) {
        this.type = type;
        this.remark = remark;
    }
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

// 交易信息模型
export class TransactionInfoModel {
    public orderId!: string;
    public typeRemark!: string;
    public createTime!: string;
    public coin!: string;
    public amount!: number;
    public valuationCoin!: string;
    public valuationAmount!: number;
    public memo!: string;
    public statusRemark!: string;
    public status!: number;
    public capitalType!: string;
    public exchangeRate!: number;
    public balance!: number;
    public balanceCoin!: string;
}
