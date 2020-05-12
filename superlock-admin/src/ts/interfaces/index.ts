// 下拉列表选项接口
export interface ISelectOption {
    label: string; // 标签
    value: string | number; // 数值
}

// 分页参数接口
export interface IPageParameters<T> {
    conditions: T; // 分页查询条件
    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
}

// 充值分页参数接口
export interface IRechargePageParameters {
    serial: string; // 订单号
    uid: string; // UID
    hash: string; // 哈希
    coinCode: string; // 币种
    address: string; // 充值地址
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 充值地址分页参数接口
export interface IRechargeAddressPageParameters {
    uid: string; // UID
    coinCode: string; // 充值币种
    address: string; // 充值地址
    mobile: string; // 手机号
}

// 提现分页参数接口
export interface IWithdrawPageParameters {
    uid: string; // UID
    serial: string; // 订单号
    status: string; // 状态
    address: string; // 到账地址
    createBeginTime: string;
    createEndTime: string;
    // finishBeginTime: string;
    // finishEndTime: string;
}

// 转账分页参数接口
export interface ITransferPageParameters {
    serial: string; //订单号
    from: string; // 转账UID
    to: string; // 到账UID
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 锁仓分页参数接口
export interface ILockPageParameters {
    uid: string; // UID
    parentId: string; // 上级UID
    serial: string; // 订单号
    status: string; // 订单状态，空代表全部，0创建，10锁仓资金操作中，20操作锁仓资金完成，锁仓中，30锁仓结束，解仓,40锁仓失败
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
    carrierName: string; // 补充字段：运营商名称
}

// 项目分页参数接口
export interface IProjectPageParameters {
    projectId: string; // 项目编号
}

// 财务分页参数接口
export interface IFinancePageParameters {
    serial: string; // 订单号
    uid: string; // UID
    beginDate: string; // 派息开始时间
    endDate: string; // 派息结束时间
}

// 贷款分页参数接口
export interface ILoanPageParameters {
    loanSerial: string; // 贷款订单号
    lockSerial: string; // 锁仓订单号
    uid: string; // UID
    beginTime: string; // 申请开始时间
    endTime: string; // 申请结束时间
    status?: string; // 订单状态
    auditStatus?: string; // 审核状态
}

// 资金分页参数接口
export interface IFundPageParameters {
    orderId: string; // 订单号
    coinCode: string; // 币种
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
    orderType: string; // 订单类型
    accountName: string; // 账户名称
}

// 券商分页参数接口（代理）
export interface IBrokerPageParameters {
    type: string; // 类型：0券商列表；1代理列表；
    uid: string; // UID
    parent?: string; // 上级UID
    mobileNumber: string; // 手机号
    email: string; // 邮箱
    carrierName: string; // 补充字段：运营商名称
}

// 券商下级分页参数接口（代理）
export interface IBrokerChildPageParameters {
    uid: string; // UID
    subordinateUid: string; // 下级UID
    mobile: string; // 手机号
    email: string; // 邮箱
}

// 迁移分页参数接口
export interface IMigrationPageParameters {
    mobile: string; // 手机号
    email: string; // 邮箱
    brokerName: string; // 来源平台
    carrierName: string; // 迁移平台
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 利率分页参数接口
export interface IRatePageParameters {
    type: string; // 类型：0券商列表；1代理列表；
    uid: string; // UID
}

// 上分分页参数接口
export interface IPointPageParameters {
    uid: string; // UID
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 运营商分页参数接口
export interface ICarrierPageParameters {
    carrierName: string; // 运营商名称
    mobile: string; // 手机号
    email: string; // 邮箱
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 返点订单分页参数接口
export interface IRebateOrderPageParameters {
    carrierName: string; // 运营商名称
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 闪兑订单分页参数接口
export interface IFlashOrderPageParameters {
    serial: string; // 订单号
    status: string; // 状态
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
    carrierName: string; // 运营商名称
}

// 提现订单分页参数接口
export interface IWithdrawOrderPageParameters {
    serial: string; // 订单号
    status: string; // 状态
    address: string; // 到账地址
    txHash: string; // 交易hash
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
    carrierName: string; // 运营商名称
}

// 充值报表分页参数接口
export interface IRechargeReportPageParameters {
    coinCode: string; // 充值币种
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 锁仓报表分页参数接口
export interface ILockReportPageParameters {
    length: string; // 锁仓期限值
    unit: string; // 锁仓期限单位
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 支出报表分页参数接口
export interface IExpendReportPageParameters {
    type: string; // 支出类型
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 用户报表分页参数接口
export interface IUserReportPageParameters {
    type: string; // 用户类型
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 用户日志分页参数接口
export interface IUserLogPageParameters {
    uid: string; // UID
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 系统日志分页参数接口
export interface ISystemLogPageParameters {
    userName: string; // 用户名
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}
