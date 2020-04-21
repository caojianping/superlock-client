// 安全中心表单模型
export class SecurityFormModel {
    public oldPassword?: string; // 旧密码
    public newPassword!: string; // 新密码
    public confirmPassword!: string; // 确认新密码

    public verifyMode!: string; // 验证方式
    public code?: string; // 验证码
}

// 邮箱表单模型
export class EmailFormModel {
    public emailAddress!: string; // 邮箱地址
    public emailCode!: string; // 邮箱验证码
}
