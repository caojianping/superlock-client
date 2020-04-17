export class FinanceBaseModel {
    public fundSerial!: number; // 资金流水号
    public serial!: string; //订单号
    public uid!: string; // uid
    public amount!: string; // 利息金额
    public rate!: string; // 汇率
    public date!: string; // 时间
}

// 财务-》利息模型
export class FinanceInterestModel extends FinanceBaseModel {
    public value!: string; // 锁仓价值
    public interest!: string; // 到账利息
    public status!: string; // 状态：20已到账；其他未到账。
    public auditStatus!: string; // 审核状态：1待审核；3已审核；5已驳回。
}

// 财务-》直推模型
export class FinanceDirectModel extends FinanceBaseModel {
    public value!: string; // 锁仓价值
    public proportion!: string; // 直推返奖比例
    public interest!: string; // 到账奖励
}

// 财务-》推广模型
export class FinancePromoteModel extends FinanceBaseModel {
    public lockValue!: string; // 锁仓价值
    public popularValue!: string; // 推广奖励价值
    public status!: string; // 状态：20已到账；其他未到账。
    public auditStatus!: string; // 审核状态：1待审核；3已审核；5已驳回。
}

// 财务-》日销模型
export class FinanceSaleModel extends FinanceBaseModel {
    public lockValue!: string; // 日销锁仓量
    public salesRewardValue!: string; // 日销奖励
    public status!: string; // 状态：20已到账；其他未到账。
    public sales!: string; // 补充字段：达标范围
    public salesRate!: string; // 补充字段：返奖利率
}
