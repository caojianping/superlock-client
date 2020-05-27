// 资金模型
export class FundModel {
    public orderId!: string; // 订单号
    public orderType!: string; // 订单类型
    public uid!: string; // UID
    public accountName!: string; // 账户名称
    public coinCode!: string; // 交易币种
    public value!: string; // 交易数量
    public operating!: string; // 操作
    public beforeMoney!: string; // 变动前币种数量
    public afterMoney!: string; // 变动后币种数量
    public memo!: string; // 备注
    public createTime!: string; // 时间
}
