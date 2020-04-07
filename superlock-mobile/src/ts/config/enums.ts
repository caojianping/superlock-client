// axios类型
export const enum CaxiosType {
    Default = 1, // 默认
    Loading = 2, // 加载
    Token = 3, // token
    LoadingToken = 4 // 加载、token
}

// 响应码
export const enum ResponseCode {
    Success = 0, // 请求成功
    TokenExpired = 999 // token过期
}

// 操作类型
export const enum OperationType {
    Add = 1, // 添加操作
    Edit = 2 // 编辑操作
}

// 注册状态
export const enum RegisterStatus {
    Default = 1, // 默认
    Success = 2, // 成功
    Failure = 3, // 失效
    Unopen = 4 // 未开放
}

// 提现来源
export const enum WithdrawSource {
    Mine = 1, // 我的页面
    Withdraw = 2 // 提现页面
}

// 推广奖励类型
export const enum PromoteRewardType {
    Push = 1, // 直推奖励
    Lock = 2, // 锁仓奖励
    Unlock = 3, // 解锁奖励
    Sale = 4 // 日销达标奖励
}
