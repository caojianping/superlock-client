// 提现分页参数
export interface IWithdrawRecordPageParameters {
    uid: string; // uid
    serial: string; // 订单号
    status: string; // 状态
    createBeginTime: string;
    createEndTime: string;
    finishBeginTime: string;
    finishEndTime: string;
}

// 提现实体类模型
export class WithdrawRecordModel {
    public serial!: string; // 订单号
    public uid!: string; // uid
    public address!: string; // 提现到账地址
    public coinCode!: string; // 提现币种
    public amount!: string; // 提现数量
    public createDate!: string; // 创建时间
    public finishDate!: string; // 完结时间
    public status!: string; // 状态：0未提现；10提现中；20提现成功；30提现失败。
    public auditStatus!: string; // 审核状态：1待审核；3已审核；5已驳回。
}

// 转账分页参数
export interface IWithdrawTransferPageParameters {
    serial: string; //订单号
    from: string; // 转账UID
    to: string; // 到账UID
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 转账实体类模型
export class WithdrawTransferModel {
    public serial!: string; // 订单号
    public fromId!: string; // 转账uid
    public toId!: string; // 到账uid
    public coin!: string; // 转账币种
    public amount!: string; // 转账数量
    public date!: string; // 创建时间
    public status!: string; // 状态
}
