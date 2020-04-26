// 下拉列表选项
export interface ISelectOption {
    label: string; // 标签
    value: string | number; // 数值
}

// 分页参数
export interface IPageParameters<T> {
    conditions: T; // 分页查询条件
    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
}

// 充值页面参数
export interface IRechargePageParameters {
    serial: string; // 订单号
    uid: string; // uid
    hash: string; // 哈希
    coinCode: string; // 币种
    address: string; // 充值地址
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 提现分页参数
export interface IWithdrawPageParameters {
    uid: string; // uid
    serial: string; // 订单号
    status: string; // 状态
    address: string; // 到账地址
    createBeginTime: string;
    createEndTime: string;
    // finishBeginTime: string;
    // finishEndTime: string;
}

// 转账分页参数
export interface ITransferPageParameters {
    serial: string; //订单号
    from: string; // 转账UID
    to: string; // 到账UID
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 锁仓分页参数
export interface ILockPageParameters {
    uid: string; // UID
    serial: string; // 订单号
    status: string; // 订单状态，空代表全部，0创建，10锁仓资金操作中，20操作锁仓资金完成，锁仓中，30锁仓结束，解仓,40锁仓失败
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
    carrierName: string; // 补充字段：运营商名称
}

// 项目分页参数
export interface IProjectPageParameters {
    projectId: string;
}

// 财务分页参数
export interface IFinancePageParameters {
    serial: string; // 订单号
    uid: string; // uid
    beginDate: string; // 派息开始时间
    endDate: string; // 派息结束时间
}

export interface ILoanPageParameters {}

export interface ILoanInterestPageParameters {}

// 资金分页参数
export interface IFundPageParameters {
    orderId: string; // 订单号
    coinCode: string; // 币种
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
    orderType: string; // 订单类型
    accountName: string; // 账户名称
}

// 券商分页列表（代理）
export interface IBrokerPageParameters {
    type: string; // 类型：0券商列表；1代理列表；
    uid: string; // UID
    parent?: string; // 上级UID
    mobileNumber: string; // 手机号
    email: string; // 邮箱
    carrierName: string; // 补充字段：运营商名称
}

// 券商下级分页列表（代理）
export interface IBrokerChildPageParameters {
    uid: string; // UID
    subordinateUid: string; // 下级UID
    mobile: string; // 手机号
    email: string; // 邮箱
}

// 利率分页列表
export interface IRatePageParameters {
    type: string; // 类型：0券商列表；1代理列表；
    uid: string; // UID
}

// 上分分页参数
export interface IPointPageParameters {
    uid: string; // UID
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 运营商分页参数
export interface ICarrierPageParameters {
    carrierName: string; // 运营商名称
    mobile: string; // 手机号
    email: string; // 邮箱
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 返点订单分页参数
export interface IRebateOrderPageParameters {
    carrierName: string; // 运营商名称
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 闪兑订单分页参数
export interface IFlashOrderPageParameters {
    serial: string; // 订单号
    status: string; // 状态
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
    carrierName: string; // 运营商名称
}

// 提现订单分页参数
export interface IWithdrawOrderPageParameters {
    serial: string; // 订单号
    status: string; // 状态
    address: string; // 到账地址
    txHash: string; // 交易hash
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
    carrierName: string; // 运营商名称
}

export interface IRechargeReportPageParameters {
    coinCode: string; // 充值币种
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

export interface ILockReportPageParameters {
    length: string; // 锁仓期限值
    unit: string; // 锁仓期限单位
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

export interface IExpendReportPageParameters {
    length: string; // 锁仓期限值
    unit: string; // 锁仓期限单位
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

export interface IUserReportPageParameters {
    type: string; // 用户类型
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}
