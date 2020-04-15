export class LoginFormModel {
    public username!: string; // 用户名
    public password!: string; // 密码
    public code?: string; // 验证码：谷歌验证码gacode，短信验证码smsCode，邮箱验证码emailCode等
}
