// 密码表单模型
export class PasswordFormModel {
    public name!: string; // 用户名
    public oldPwd?: string; // 原密码
    public newPwd!: string; // 新密码
    public confirmPwd!: string; // 确认新密码
}
