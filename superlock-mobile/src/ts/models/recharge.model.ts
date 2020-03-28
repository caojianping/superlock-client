// 充值币种模型
export class RechargeCoinModel {
    public name!: string; // 币种全名
    public symbol!: string; // 币种
    public icon!: string; // 币种图标
}

// 充值模型
export class RechargeModel {
    public orderId!: string; // 订单号
    public txhash!: string; // 交易hash
    public payCoin!: string; // 充值币种
    public payAmount!: number; // 充值金额
    public exchangeRate!: number; // 充值汇率
    public gotCoin!: string; // 获得币种
    public gotAmount!: number; // 获得金额
    public status!: number; // 状态
    public statusRemark!: string; // 状态描述
    public capitalType!: string; // 资金状态；支出；收入
    public balance!: number; // 当前可用余额
    public balanceCoin!: string; // 可用余额币种
    public createTime!: string; // 创建时间
    public memo!: string; // 备注
}
