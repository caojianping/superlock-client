export interface IPointRecordPageParameters {
    uid: string;
    beginTime: string;
    endTime: string;
}

export class PointRecordModel {
    public date!: string; // 时间
    public toId!: string; // 收款ID
    public toAccountType!: string; // 收款类型
    public fromId!: string; // 转账ID
    public coin!: string; // 币种类型
    public amount!: string; // 数量
    public remark!: string; // 备注
}

export class PointAccountModel {
    public accountId!: string; // 账户ID
    public accountType!: string; // 账户类型
    public coin!: string; // 币种
    public canusedAmount!: string; // 可用余额
    public freezeAmount!: string; // 冻结余额
    public totalAmount!: string; // 累计注入数量
}

export class PointForm {
    public accountId!: number; // 上分账户ID
    public coin!: string; // 转账币种
    public value!: number; // 上分数量
    public memo!: string; // 备注
    public code?: string; // 验证码：谷歌验证码gacode，短信验证码smsCode，邮箱验证码emailCode等
}

export class TransferForm {
    public fromId!: number; // 上分账户id
    public coin!: string; // 币种
    public toId!: number; // 接受转账的系统账户id
    public value!: number; // 转账金额
    public memo!: string; // 备注
    public code?: string; // 验证码：谷歌验证码gacode，短信验证码smsCode，邮箱验证码emailCode等
}

export class PointInfo {
    public id!: number; // 账户ID
    public coin!: string; // 账户币种
    public canused_amount!: number; // 账户剩余数量
}

export class TransferInfo {
    public system_addmoney_account: Array<TransferPointAccount> = [];
    public receipt_account: Array<TransferReceiptAccount> = [];
}

export class TransferPointAccount {
    public id!: number; // 上分账户ID
    public coin!: string; // 币种
    public canused_amount!: number; // 可转余额
}

export class TransferReceiptAccount {
    public id!: number; // 收款账户ID
    public account!: string; // 收款账户类型
    public coin!: string; // 币种
}
