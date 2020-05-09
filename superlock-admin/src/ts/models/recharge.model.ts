// 充值模型
export class RechargeModel {
    public serial!: string; // 订单号
    public uid!: string; // UID
    public hash!: string; // 交易哈希
    public address!: string; // 充值地址
    public date!: string; // 充值时间
    public coinCode!: string; // 充值币种
    public amount!: string; // 充值数量
    public rate!: string; // 用户汇率
    public rechargeCoinCode!: string; // 入账币种
    public rechargeAmount!: string; // 入账数量
    public lockRate!: string; // 锁仓汇率
    public profit!: string; // 手续费
    public commissionRate!: string; // 手续费比例
    public status!: string; // 充值状态
}

// 充值手续费模型
export class RechargePoundageModel {
    public tokenType!: string; // 交易币种
    public type!: string; // 交易类型
    public feeToken!: string; // 手续币种
    public chargeRate!: number; // 手续费比例
}

// 充值地址模型
export class RechargeAddressModel {
    public uid!: string; // UID
    public mobile!: string; // 手机号
    public coinCode!: string; // 充值币种
    public address!: string; // 充值地址
}
