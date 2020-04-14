// 运营商模型
export class CarrierModel {
    public carrierId!: string; // 运营商ID
    public carrierName!: string; // 运营商名称
    public mobileNumber!: string; // 手机号
    public totalLock!: string; // 锁仓总量(DC)
    public rebateRatio!: string; // 返点比例(%)
    public billingCycle!: string; // 结算周期
    public totalRebate!: string; // 返点总额(DC)
    public dcBalance!: string; // 账户余额(DC)
    public bcbBalance!: string; // 账户余额(BCB)
    public createTime!: string; // 创建时间
}

// 返点订单分页参数
export interface IRebateOrderPageParameters {
    carrierId: string; // 运营商编号
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 返点订单模型
export class RebateOrderModel {
    public serial!: string; // 订单号
    public carrierId!: string; // 运营商ID
    public carrierName!: string; // 运营商名称
    public billingCycle!: string; // 结算周期
    public lockAmount!: string; // 新增锁仓(DC)
    public rebateRatio!: string; // 返点比例(%)
    public rebateValue!: string; // 返点价值(DC)
    public createTime!: string; // 创建时间
    public endTime!: string; // 完结时间
    public status!: string; // 状态
}

// 闪兑订单分页参数
export interface IFlashOrderPageParameters {
    serial: string; // 订单号
    carrierId: string; // 运营商编号
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
    status: string; // 状态
}

// 闪兑订单模型
export class FlashOrderModel {
    public serial!: string; // 订单号
    public carrierId!: string; // 运营商ID
    public carrierName!: string; // 运营商名称
    public coinCode!: string; // 原币种
    public amount!: string; // 原币种数量
    public flashCoinCode!: string; // 目标币种
    public flashAmount!: string; // 到账币种数量
    public rate!: string; // 汇率
    public createTime!: string; // 创建时间
    public endTime!: string; // 完结时间
    public status!: string; // 状态
}

// 提现订单分页参数
export interface IWithdrawOrderPageParameters {
    serial: string; // 订单号
    carrierId: string; // 运营商编号
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
    status: string; // 状态
    address: string; // 到账地址
}

// 提现订单模型
export class WithdrawOrderModel {
    public serial!: string; // 订单号
    public carrierId!: string; // 运营商ID
    public carrierName!: string; // 运营商名称
    public coinCode!: string; // 提现币种
    public amount!: string; // 提现数量
    public address!: string; // 到账地址
    public createTime!: string; // 创建时间
    public endTime!: string; // 完结时间
    public status!: string; // 状态
}
