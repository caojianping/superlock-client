export class UserModel {
    public id!: string; // 用户id
    public name!: string; // 用户名
    public uKey!: string; // UKEY编号
    public roleId!: string; // 角色编号
    public roleName!: string; // 角色名称
    public comGa!: number; // 问号标识
}

export class UserFormModel {
    public name!: string; // 用户名
    public password?: string; // 初始密码
    public uKey!: string; // UEKY编号
    public roleId!: number; // 用户角色
}

export class PasswordFormModel {
    public name!: string; // 用户名
    public oldPwd?: string; // 原密码
    public newPwd!: string; // 新密码
    public confirmPwd!: string; // 确认新密码
}

export class GoogleFormModel {}
