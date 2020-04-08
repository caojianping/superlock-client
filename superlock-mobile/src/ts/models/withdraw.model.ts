// 提现表单模型
export class WithdrawFormModel {
    public address!: string; // 提现地址
    public amount!: number; // 提现金额
    public fundPasswd!: string; // 资金密码
    public remark!: string; // 提现备注

    public maxAmount!: number; // 附加属性：最大提现金额
}

// 提现地址模型
export class WithdrawAddressModel {
    public nickName!: string; // 昵称
    public address!: string; // 地址
}

// 提现模型
export class WithdrawModel {
    public orderId!: string; // 订单号
    public txhash!: string; // 交易hash
    public toAddress!: string; // 提现地址
    public coin!: string; // 提现币种
    public amount!: number; // 提现金额
    public status!: number; // 状态
    public statusRemark!: string; // 状态描述
    public capitalType!: string; // 资金类型；支付；收入
    public balance!: number; // 当前可用余额
    public balanceCoin!: string; // 可用余额币种
    public createTime!: string; // 创建时间
    public memo!: string; // 备注
}
