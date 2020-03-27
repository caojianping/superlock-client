// 充值币种
export class RechargeCoinModel {
    public name!: string; // 币种全名
    public symbol!: string; // 币种
    public icon!: string; // 币种图标
}

// 充值
export class RechargeModel {
    public orderId!: string; // 订单号；
    public payCoin!: string; // 充值币种，如USDT;
    public payAmount!: number; // 充值金额。
    public gotCoin!: string; // 获得币种，如BCB；
    public gotAmount!: number; // 获得的金额。
    public exchangeRate!: number; // 汇率。
    public memo!: string; // 备注；
    public statusRemark!: string; // 状态描述；
    public status!: number; // 状态；
    public capitalType!: string; // 资金状态；支出；收入；
    public createTime!: string; // 创建时间。
    public txhash!: string; // 交易hash。
    public balance!: number; // 当前可用余额；
    public balanceCoin!: string; // 可用余额币种；
}
