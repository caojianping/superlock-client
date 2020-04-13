export interface IFundRecordPageParameters {
    orderId: string; // 订单号
    coinCode: string; // 币种
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
    orderType: string; // 订单类型
    accountName: string; // 账户名称
}

export class FundRecordModel {
    public orderId!: string; // 订单号
    public orderType!: string; // 订单类型
    public uid!: string; // uid
    public accountName!: string; // 账户名称
    public coinCode!: string; // 交易币种
    public value!: string; // 交易数量
    public operating!: string; // 操作
    public beforeMoney!: string; // 变动前币种数量
    public afterMoney!: string; // 变动后币种数量
    public memo!: string; // 备注
    public createTime!: string; // 时间
}
