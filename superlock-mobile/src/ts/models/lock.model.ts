// 锁仓模型
export class LockModel {
    public orderId!: string; // 锁仓订单干编号；
    public exchangeRate!: number; //  汇率；
    public rate!: number; //  锁仓利率；
    public length!: number; //  周期，如180，365；
    public unit!: number; //  单位；1：天 2：月 3：年；
    public amount!: number; //  锁仓BCB金额；
    public coin!: string; //  锁仓币种；
    public valuationAmount!: number; //  计价金额；
    public valuationCoin!: string; // 计价币种，如DC；
    public startTime!: string; //  开始时间；
    public endTime!: string; //  到期时间；
    public remainingDays!: number; //  剩余天数；
    public interestTime!: string; //  起息日期；
    public status!: number; //  状态；0：订单创建；10：订单处理中； 20：计息中 ；30：锁仓到期；40：锁仓失败；
    public remark!: string; // 备注；
    public dcDailyIncome!: number; // 每日收益价值，币种固定为DC;
    public dcTotalIncome!: number; // 累计收益数量，币种固定为DC;
    public bcbTotalIncome!: number; // 累计收益价值，币种固定为BCB;
}

// 锁仓表单模型
export class LockFormModel {
    public length!: number; // 锁仓长度
    public unit!: number; // 单位
    public rate!: number; // 利率
    public coin!: string; // 币种
    public amount!: number; // 锁仓金额
    public fundPasswd!: string; // 资金密码

    public minAmount!: number; // 附加属性：最小锁仓金额
    public maxAmount!: number; // 附加属性：最大锁仓金额
}
