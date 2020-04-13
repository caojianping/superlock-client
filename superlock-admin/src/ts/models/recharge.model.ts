export interface IRechargeRecordPageParameters {
    uid: string; // uid
    hash: string; // 哈希
    coinCode: string; // 币种
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

export class RechargeRecordModel {
    public serial!: string; // 订单号
    public uid!: string; // uid
    public hash!: string; // 交易哈希
    public address!: string; // 充值地址
    public date!: string; // 充值时间
    public coinCode!: string; // 充值币种
    public amount!: string; // 充值数量
    public rate!: string; // 用户汇率
    public rechargeCoinCode!: string; // 入账币种
    public rechargeAmount!: string; // 入账数量

    // 新增字段
    public lockRate!: string; // 锁仓汇率
    public profit!: string; // 手续费
    public commissionRate!: string; // 手续费比例
}

export class RechargePoundageModel {
    public tokenType!: string; // 交易币种
    public type!: string; // 交易类型
    public feeToken!: string; // 手续币种
    public chargeRate!: number; // 手续费比例
    public code?: string; // 验证码：谷歌验证码gacode，短信验证码smsCode，邮箱验证码emailCode等
}
