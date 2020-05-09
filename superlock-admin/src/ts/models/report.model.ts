// 充值报表模型
export class RechargeReportModel {
    public date!: string; // 日期
    public coinCode!: string; // 充值币种
    public amount!: string; // 充值数量
    public gotCoin!: string; // 入账币种
    public gotAmount!: string; // 入账数量
}

//锁仓报表模型
export class LockReportModel {
    public date!: string; // 日期
    public length!: string; // 时间长度
    public unit!: string; // 时间单位
    public lockAmount!: string; // 锁仓数量
    public lockValue!: string; // 锁仓价值
}

// 支出报表模型
export class ExpendReportModel {
    public date!: string; // 日期
    public type!: string; // 支出类型
    public dcAmount!: string; // 支出价值(DC)
    public bcbAmount!: string; // 支出数量(BCB)
}

// 用户报表模型
export class UserReportModel {
    public date!: string; // 日期
    public type!: string; // 用户类型
    public count!: string; // 新增人数
}
