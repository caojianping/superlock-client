// 财务模块分页参数（四个子页面查询条件均一样）
export interface IFinancePageParameters {
    serial: string; // 订单号
    uid: string; // uid
    beginDate: string; // 派息开始时间
    endDate: string; // 派息结束时间
}

// 财务-》利息实体类模型
export class FinanceInterestModel {
    public fundSerial!: number; // 资金流水号
    public serial!: string; //订单号
    public uid!: string; // uid
    public value!: string; // 锁仓价值
    public amount!: string; // 利息金额
    public rate!: string; // 汇率
    public interest!: string; // 到账利息
    public date!: string; // 到息时间
    public status!: string; // 状态：20已到账；其他未到账。
    public auditStatus!: string; // 审核状态：1待审核；3已审核；5已驳回。
}

// 财务-》直推实体类模型
export class FinanceDirectModel {
    public fundSerial!: number; // 资金流水号
    public serial!: string; //关联订单号
    public uid!: string; // 关联uid
    public value!: string; // 锁仓价值
    public proportion!: string; // 直推返奖比例
    public amount!: string; // 直推奖励金额
    public rate!: string; // 汇率
    public interest!: string; // 到账奖励
    public date!: string; // 派奖时间
}

// 财务-》推广实体类模型
export class FinancePromoteModel {
    public fundSerial!: number; // 资金流水号
    public serial!: string; //关联订单号
    public uid!: string; // 关联uid
    public lockValue!: string; // 锁仓价值
    public popularValue!: string; // 推广奖励价值
    public rate!: string; // 汇率
    public amount!: string; // 到账BCB数量
    public date!: string; // 派奖时间
    public status!: string; // 状态：20已到账；其他未到账。
    public auditStatus!: string; // 审核状态：1待审核；3已审核；5已驳回。
}

// 财务-》日销实体类模型
export class FinanceSaleModel {
    public fundSerial!: number; // 资金流水号
    public serial!: string; //关联订单号
    public uid!: string; // 关联uid
    public lockValue!: string; // 日销锁仓量
    public salesRewardValue!: string; // 日销奖励
    public rate!: string; // 汇率
    public amount!: string; // 到账BCB数量
    public date!: string; // 派奖时间
    public status!: string; // 状态：20已到账；其他未到账。
    public sales!: string; // 补充字段：达标范围
    public salesRate!: string; // 补充字段：返奖利率
}
