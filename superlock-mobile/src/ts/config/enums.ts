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
    SecondVerify = 10, // 二次验证
    GoogleAuth = 20, // 谷歌认证
    TokenExpired = 30 // token过期
}

// 注册状态
export const enum RegisterStatus {
    Default = 1, // 默认
    Success = 2, // 成功
    Failure = 3, // 失效
    Unopen = 4 // 未开放
}
