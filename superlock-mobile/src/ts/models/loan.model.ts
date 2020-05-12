// 贷款基础信息模型
export class LoanBaseInfoModel {
    public loanProportion!: number; // 贷款比例
    public loanRate!: number; // 利息利率
}

// 可贷款锁仓模型
export class LoanableLockModel {
    public orderId!: string; // 锁仓订单号
    public endDate!: string; // 锁仓到期时间
    public lockValue!: number; // 锁仓价值,
    public lockValueCoin!: string; // 锁仓价值币种
    public minLoanAmount!: number; // 最小贷款金额
    public minLoanAmountCoin!: string; // 最小贷款金额币种
    public maxLoanAmount!: number; // 最大贷款金额
    public maxLoanAmountCoin!: string; // 最大贷款金额币种
    public maxLoanDays!: number; // 最长贷款天数
    public loanFlag!: number; // 是否可质押标志； 1:可质押 2:锁仓金额太小 3:锁仓即将到期
}

// 可贷款额度模型
export class LoanableQuotaModel {
    public quota!: number; // 额度
    public coin!: string; // 币种
    public valuation!: number; // 计价额度
    public valuationCoin!: string; // 计价额度币种
}

// 贷款模型
export class LoanModel {
    public orderId!: string; // 贷款订单号
    public lockOrderId!: string; // 质押锁仓订单号
    public mortgageValuationAmount!: any; // 抵押计价金额
    public mortgageValuationCoin!: string; // 抵押计价币种
    public loanValuationAmount!: any; // 贷款价值
    public loanValuationCoin!: number; // 贷款价值币种
    public rate!: number; // 贷款年利率
    public applyTime!: string; // 申请时间
    public lendTime!: string; // 放款时间
    public lendExchangeRate!: number; // 放款汇率
    public fromCoin!: string; // from币种
    public toCoin!: string; // to币种
    public lendAmount!: number; // 放款币种数量
    public lendAmountCoin!: string; // 放款币种BCB
    public estimatedRepayDate!: string; // 预计还款日期
    public totalInterest!: number; // 利息总计
    public totalInterestCoin!: string; // 利息总计币种
    public shouldReturnValue!: number; // 应还本息价值
    public shouldReturnValueCoin!: string; // 应还本息价值币种DC
    public repaymentTime!: string; // 还款时间
    public repaymentExchangeRate!: number; // 还款汇率
    public actualRepayment!: number; // 实际还款价值
    public actualRepaymentCoin!: string; // 实际还款价值币种
    public status!: number; // 状态；0：审核中；10：审核失败；20：贷款中；30：爆仓；31：还款中；40：贷款已还清；50：已逾期
    public remark!: string; // 状态描述：审核中；审核失败；贷款中；爆仓；还款中；贷款已还清；已逾期；
    public lendDate!: string; // 放款日期
    public lendDays!: number; // 累计贷款天数
    public shouldReturn!: number; // 应还本息BCB
    public shouldReturnCoin!: string; // 应还本息币种BCB
    public balance!: number; // 当前账户余额
}

// 贷款利息模型
export class LoanInterestModel {
    public date!: string; // 日期
    public amount!: number; // 利息
    public coin!: string; // 币种
}

// 贷款申请表单模型
export class ApplyFormModel {
    public lockOrderId!: string; // 锁仓订单号
    public loanDays!: number; // 贷款时长，单位天
    public amount!: number; // 贷款金额，单位DC
    public fundPasswd!: string; // 资金密码

    public maxDuration!: number; // 校验字段： 最大贷款时长
    public maxAmount!: number; // 校验字段：最大贷款金额
}

// 贷款申请结果模型
export class ApplyResultModel {}

// 贷款偿还表单模型
export class RepayFormModel {
    public loansSerial!: string; // 贷款订单号
    public fundPasswd!: string; // 资金密码
}

// 贷款偿还结果模型
export class RepayResultModel {}
