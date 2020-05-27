// 贷款模型
export class LoanModel {
    public loanSerial!: string; // 贷款订单号
    public uid!: string; // UID
    public lockSerial!: string; // 抵押锁仓订单号
    public lockAmount!: string; // 抵押锁仓价值(DC)
    public loanRate!: string; // 年利率
    public rate!: string; // 放贷汇率
    public loanAmount!: string; // 贷款价值(DC)
    public loanDate!: string; // 贷款时长(天)
    public applyTime!: string; // 申请时间
    public lendingTime!: string; // 放款时间
    public interest!: string; // 累计利息(DC)
    public totalAmount!: string; // 应还本息(DC)
    public repaymentRate!: string; // 还款汇率(DC:BCB)
    public repaymentAmount!: string; // 实际还款价值(BCB)
    public repaymentTime!: string; // 还款时间
    public status!: string; // 状态
    public auditStatus!: string; // 审核状态：1待审核；3已审核；5已驳回。
}

// 贷款利息模型
export class LoanInterestModel {
    public loanSerial!: string; // 订单
    public uid!: string; // UID
    public lockSerial!: string; // 抵押锁仓订单号
    public lockAmount!: string; // 抵押锁仓价值(DC)
    public loanRate!: string; // 贷款年利率(%)
    public loanAmount!: string; // 贷款价值(DC)
    public interest!: string; // 每日利息(DC)
    public createTime!: string; // 时间
    public memo!: string; // 备注
}

// 贷款信息模型
export class LoanInfoModel {
    public loanRate!: number; // 贷款年利率(%)
    public loanProportion!: number; // 最大贷款比例(%)
    public loanMinValue!: number; // 最小贷款价值(DC)
}
