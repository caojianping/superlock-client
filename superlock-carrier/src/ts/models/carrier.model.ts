// 运营商表单模型
export class CarrierFormModel {
    public carrierId?: number; // 运营商编号
    public carrierName!: string; // 运营商名称
    public loginPwd!: string; // 登录密码
    public areaCode!: string; // 国家和地区区号
    public mobile!: string; // 手机号
    public rebateRatio!: number; // 返点比例
    public billingCycle!: number; // 结算时间
    public unit!: string; // 周、月
}

// 运营商模型
export class CarrierModel {
    public carrierId!: number; // 运营商编号
    public carrierName!: string; // 运营商名称
    public areaCode!: string; // 国家和地区区号
    public mobileNumber!: string; // 手机号
    public totalLock!: string; // 锁仓总量(DC)
    public rebateRatio!: number; // 返点比例(%)
    public billingCycle!: number; // 结算时间
    public unit!: string; // 周、月
    public totalRebate!: string; // 返点总额(DC)
    public dcBalance!: string; // 账户余额(DC)
    public bcbBalance!: string; // 账户余额(BCB)
    public createTime!: string; // 创建时间
}

class BaseOrderModel {
    public serial!: string; // 订单号
    public carrierId!: string; // 运营商ID
    public carrierName!: string; // 运营商名称
}

// 返点订单模型
export class RebateOrderModel extends BaseOrderModel {
    public billingCycle!: string; // 结算周期
    public lockAmount!: string; // 新增锁仓(DC)
    public rebateRatio!: string; // 返点比例(%)
    public rebateValue!: string; // 返点价值(DC)
    public status!: string; // 状态
    public createTime!: string; // 创建时间
    public endTime!: string; // 完结时间
}

// 闪兑订单模型
export class FlashOrderModel extends BaseOrderModel {
    public coinCode!: string; // 原币种
    public amount!: string; // 原币种数量
    public flashCoinCode!: string; // 目标币种
    public flashAmount!: string; // 到账币种数量
    public rate!: string; // 汇率
    public status!: string; // 状态
    public createTime!: string; // 创建时间
    public endTime!: string; // 完结时间
}

// 提现订单模型
export class WithdrawOrderModel extends BaseOrderModel {
    public coinCode!: string; // 提现币种
    public amount!: string; // 提现数量
    public address!: string; // 到账地址
    public status!: string; // 状态：0未提现；10提现中；20提现成功；30提现失败。
    public auditStatus!: string; // 审核状态：1待审核；3已审核；5已驳回。
    public createTime!: string; // 创建时间
    public finishDate!: string; // 结束时间
}
