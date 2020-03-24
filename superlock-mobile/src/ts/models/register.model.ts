export class RegisterForm {
    public invitationCode!: string; // 邀请码
    public brandKey!: string; // 商户key
    public areaCode!: string; // 地区区号
    public mobile!: string; // 手机号
    public password!: string; // 密码
    public smsCode!: string; // 手机短信验证码

    public static createInstance(
        invitationCode: string,
        brandKey: string,
        areaCode: string
    ): RegisterForm {
        let registerForm = new RegisterForm();
        registerForm.invitationCode = invitationCode;
        registerForm.brandKey = brandKey;
        registerForm.areaCode = areaCode;
        return registerForm;
    }
}
