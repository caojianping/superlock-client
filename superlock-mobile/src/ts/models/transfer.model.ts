// 转账表单模型
export class TransferFormModel {
    public toUid!: string; // 转账人uid
    public quota!: number; // 转账额度
    public memo!: string; // 备注
    public fundPasswd!: string; // 资金密码

    public maxAmount!: number; // 附加属性：最大转账金额
}

// 转账模型
export class TransferModel {
    public orderId!: string; // 订单号
    public fromUid!: string; // 支付Uid
    public toUid!: string; // 目标Uid
    public coin!: string; // 币种
    public amount!: number; // 额度
    public prefix !: number;// 前缀符号：0:-;1:+;
    public createTime!: string; // 创建时间
    public memo!: string; // 备注
    public statusRemark!: string; // 状态描述
    public status!: number; // 状态
    public capitalType!: string; // 资金类型：支出；收入；
    public balance!: number; // 当前可用额度
    public balanceCoin!: string; // 可用额度币种
}

// 转账下级模型
export class TransferChildModel {
    public nickName!: string; // 用户昵称
    public nickNameRemark!: string; // 用户备注（上级给下级的备注）
    public tel!: string; // 手机号码
    public uid!: string; // 用户id
    public generalizationCode!: string; // 用户推广码
}
