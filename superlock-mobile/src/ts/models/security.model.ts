// 安全中心表单模型
export class SecurityFormModel {
    public oldPassword?: string; // 旧密码
    public newPassword!: string; // 新密码
    public confirmPassword!: string; // 确认新密码
    public smsCode?: string; // 短信验证码
}

// 邮箱表单模型
export class EmailFormModel {
    public emailAddress!: string; // 邮箱地址
    public emailCode!: string; // 邮箱验证码
}
