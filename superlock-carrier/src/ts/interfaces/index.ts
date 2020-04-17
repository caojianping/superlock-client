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

// 锁仓分页参数
export interface ILockPageParameters {
    uid: string; // UID
    serial: string; // 订单号
    status: string; // 订单状态，空代表全部，0创建，10锁仓资金操作中，20操作锁仓资金完成，锁仓中，30锁仓结束，解仓,40锁仓失败
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
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

// 会员分页列表
export interface IMemberPageParameters {
    type?: number; // 类型：0券商列表；1代理列表；
    uid: string; // UID
    mobileNumber: string; // 手机号
    parent: string; // 上级UID
}

// 返点订单分页参数
export interface IRebateOrderPageParameters {
    serial: string; // 订单号
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 闪兑订单分页参数
export interface IFlashOrderPageParameters {
    serial: string; // 订单号
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 提现订单分页参数
export interface IWithdrawOrderPageParameters {
    serial: string; // 订单号
    address: string; // 提现地址
    hash: string;// 交易hash
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}
