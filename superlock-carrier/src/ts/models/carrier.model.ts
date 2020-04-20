// 运营商信息模型
export class CarrierInfoModel {
    public newLockCount!: number; // 新增锁仓量
    public totalLock!: number; // 累计锁仓量
    public totalRebateAmount!: number; // 平台累计返奖
    public dcBalance!: number; // DC账户余额
    public bcbBalance!: number; // BCB账户余额
}

// 闪兑表单模型
export class ExchangeFormModel {
    public amount!: number; // 兑换数量
    public maxAmount!: number; // 最大兑换数量
}

// 闪兑统计模型
export class ExchangeStatsModel {
    public serial!: string; // 订单号
    public dcAmount!: number; // DC数量
    public bcbAmount!: number; // BCB数量
    public rate!: number; // 汇率
}

// 提现表单模型
export class WithdrawFormModel {
    public carrierId!: number; // 运营商编号
    public value!: number; // 提现数量
    public toAddr!: string; // 提现地址
    public maxAmount!: number; // 最大提现数量
}

class BaseOrderModel {
    public serial!: string; // 订单号
}

// 返点订单模型
export class RebateOrderModel extends BaseOrderModel {
    public rebateTime!: string; // 返点时间
    public lockAmount!: string; // 新增锁仓(DC)
    public rebateRatio!: string; // 返点比例(%)
    public rebateValue!: string; // 返点数量(DC)
    public balance!: string; // 余额
    public memo!: string; // 备注
}

// 闪兑订单模型
export class FlashOrderModel extends BaseOrderModel {
    public coinCode!: string; // 兑换币种
    public amount!: string; // 兑换数量
    public flashCoinCode!: string; // 目标币种
    public flashAmount!: string; // 到账数量
    public rate!: string; // 汇率
    public createTime!: string; // 创建时间
    public endTime!: string; // 完结时间
    public status!: string; // 状态
}

// 提现订单模型
export class WithdrawOrderModel extends BaseOrderModel {
    public hash!: string; // 交易hash
    public coinCode!: string; // 提现币种
    public amount!: string; // 提现数量
    public address!: string; // 到账地址
    public createTime!: string; // 创建时间
    public finishDate!: string; // 结束时间
    public balance!: string; // 账户余额
    public status!: string; // 状态：0未提现；10提现中；20提现成功；30提现失败。
}
