// 下拉列表选项
export interface ISelectOption {
    label: string;
    value: string | number;
}

// 分页参数
export interface IPageParameters<T> {
    conditions: T; // 分页查询条件
    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
}

// 充值页面参数
export interface IRechargePageParameters {
    uid: string; // uid
    hash: string; // 哈希
    coinCode: string; // 币种
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 提现分页参数
export interface IWithdrawPageParameters {
    uid: string; // uid
    serial: string; // 订单号
    status: string; // 状态
    createBeginTime: string;
    createEndTime: string;
    finishBeginTime: string;
    finishEndTime: string;
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
    carrierId: string; // 补充字段：用户来源ID
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

// 会员分页列表
export interface IMemberPageParameters {
    type?: number; // 类型：0券商列表；1代理列表；
    uid: string; // UID
    mobileNumber: string; // 手机号
    operatorName: string; // 用户来源ID
    parent: string; // 上级UID
}

// 上分分页参数
export interface IPointPageParameters {
    uid: string;
    beginTime: string;
    endTime: string;
}

// 返点订单分页参数
export interface IRebateOrderPageParameters {
    carrierId: string; // 运营商编号
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 闪兑订单分页参数
export interface IFlashOrderPageParameters {
    serial: string; // 订单号
    carrierId: string; // 运营商编号
    status: string; // 状态
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 提现订单分页参数
export interface IWithdrawOrderPageParameters {
    serial: string; // 订单号
    carrierId: string; // 运营商编号
    status: string; // 状态
    address: string; // 到账地址
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}
