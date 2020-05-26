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

export const enum UserFormType {
    CheckPassword = 0, // 校验密码
    Login = 1, // 登录表单
    Register = 2, // 注册表单
    ForgetMobile = 3, // 忘记密码表单（只包含区号、手机号）
    ForgetSmsCode = 4, // 忘记密码表单（只包含区号、手机号、验证码）
    Forget = 5 // 忘记密码表单
}

// 注册状态
export const enum RegisterStatus {
    Default = 1, // 默认
    Success = 2, // 成功
    Failure = 3, // 失效
    Unopen = 4 // 未开放
}

// 忘记密码类型
export const enum ForgetType {
    LoginPassword = 1, // 登录密码
    FundPassword = 2 // 资金密码
}

// 推广奖励类型
export const enum PromoteRewardType {
    Push = 1, // 直推奖励
    Lock = 2, // 锁仓奖励
    Unlock = 3, // 解锁奖励
    Sale = 4 // 日销达标奖励
}

// 验证方式
export const enum VerifyType {
    EmailVerify = 1, // 邮箱验证
    SmsVerify = 2, // 短信验证
    GoogleVerify = 3 // 谷歌验证
}
