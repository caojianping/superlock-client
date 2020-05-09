// 提现模型
export class WithdrawModel {
    public serial!: string; // 订单号
    public uid!: string; // UID
    public address!: string; // 提现到账地址
    public coinCode!: string; // 提现币种
    public amount!: string; // 提现数量
    public createDate!: string; // 创建时间
    public finishDate!: string; // 完结时间
    public status!: string; // 状态：0未提现；10提现中；20提现成功；30提现失败。
    public auditStatus!: string; // 审核状态：1待审核；3已审核；5已驳回。
}

// 转账模型
export class TransferModel {
    public serial!: string; // 订单号
    public fromId!: string; // 转账UID
    public toId!: string; // 到账uUID
    public coin!: string; // 转账币种
    public amount!: string; // 转账数量
    public date!: string; // 创建时间
    public status!: string; // 状态
}
