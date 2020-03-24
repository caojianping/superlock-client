const baseUrl = process.env.VUE_APP_BASE_URL;

export const Urls = {
    common: {
        smsCode: `${baseUrl}/vfcode` // 短信验证码接口
    },
    user: {
        register: `${baseUrl}/register`, // 用户注册接口
        login: `${baseUrl}/login`, // 用户登录接口
        retrieval: `${baseUrl}/retrieval` // 用户找回密码接口
    }
};
