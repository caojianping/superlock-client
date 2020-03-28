// 提现表单模型
export class WithdrawFormModel {
    public address!: string; // 提现地址
    public amount!: number; // 提现金额
    public fundPasswd!: string; // 资金密码
    public remark!: string; // 提现备注
}

// 提现地址模型
export class WithdrawAddressModel {
    public nickName!: string; // 昵称
    public address!: string; // 地址
}

// 提现模型
export class WithdrawModel {
    public orderId!: any; // 订单号
    public txhash!: any; // 交易hash
    public toAddress!: any; // 提现地址
    public coin!: any; // 提现币种
    public amount!: any; // 提现金额
    public status!: any; // 状态
    public statusRemark!: any; // 状态描述
    public capitalType!: string; // 资金类型；支付；收入
    public balance!: any; // 当前可用余额
    public balanceCoin!: any; // 可用余额币种
    public createTime!: any; // 创建时间
    public memo!: any; // 备注
}
