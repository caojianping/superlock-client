// axios类型
export const enum CaxiosType {
    Default = 1, // 默认
    FullLoading = 2, // 全屏加载
    PageLoading = 3, // 分页加载
    FullLoadingToken = 4, // 全屏加载、token
    PageLoadingToken = 5, // 分页加载、token
    Token = 6 // token
}

// 响应码
export const enum ResponseCode {
    Success = 0, // 请求成功
    SecondVerify = 10, // 二次验证
    GoogleAuth = 20, // 谷歌认证
    TokenExpired = 30 // token过期
}

// 操作类型
export const enum OperationType {
    Add = 1, // 添加
    Edit = 2 // 编辑
}

// 审查类型（审核、驳回操作）
export const enum ReviewType {
    Withdraw = 0, // 提现
    Interest = 1, // 利息支出
    Promote = 2, // 推广奖励
    Loan = 3, // 贷款订单
    Rebate = 4 // 返点订单
}

// 审查状态
export const enum ReviewStatus {
    Audit = 3, // 审核
    Reject = 5 // 驳回
}

// 免审类型
export const enum FreeTrialType {
    Withdraw = 1, // 提现免审
    Interest = 2, // 利息支出免审
    Promotion = 3, // 推广奖励免审
    LockAmount = 4 // 最小锁仓数量
}

// 运营商表单类型
export const enum CarrierFormType {
    CarrierForm = 1,
    CarrierPasswordForm = 2,
    CarrierMobileForm = 3,
    CarrierRebateForm = 4,
    CarrierEmailForm = 5 // 新增邮箱表单
}
