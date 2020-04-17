import { defaultAreaCode } from '../config';

export class LoginFormModel {
    public areaCode!: string; // 国家、地区区号
    public mobile!: string; // 手机号
    public password!: string; // 密码

    constructor() {
        this.areaCode = defaultAreaCode.id;
    }

    public static createInstance(areaCode: string, mobile: string, password?: string): LoginFormModel {
        let loginForm = new LoginFormModel();
        loginForm.areaCode = areaCode;
        loginForm.mobile = mobile;
        if (password) {
            loginForm.password = password;
        }
        return loginForm;
    }
}
