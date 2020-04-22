import { defaultAreaCode } from '../config';

// export class LoginFormModel {
//     public areaCode!: string; // 国家、地区区号
//     public mobile!: string; // 手机号
//     public password!: string; // 密码

//     constructor() {
//         this.areaCode = defaultAreaCode.id;
//     }

//     public static createInstance(areaCode: string, mobile: string, password?: string): LoginFormModel {
//         let loginForm = new LoginFormModel();
//         loginForm.areaCode = areaCode;
//         loginForm.mobile = mobile;
//         if (password) {
//             loginForm.password = password;
//         }
//         return loginForm;
//     }
// }

export class LoginFormModel {
    public areaCode?: string; // 国家、地区区号
    public mobile?: string; // 手机号
    public email?: string; // 邮箱
    public password!: string; // 密码

    public static createMobileInstance(areaCode: string, mobile: string, password?: string): LoginFormModel {
        let loginForm = new LoginFormModel();
        loginForm.areaCode = areaCode;
        loginForm.mobile = mobile;
        if (password) {
            loginForm.password = password;
        }
        return loginForm;
    }

    public static createEmailInstance(email: string, password?: string): LoginFormModel {
        let loginForm = new LoginFormModel();
        loginForm.email = email;
        if (password) {
            loginForm.password = password;
        }
        return loginForm;
    }
}
