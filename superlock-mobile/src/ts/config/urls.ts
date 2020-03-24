const baseUrl = process.env.VUE_APP_BASE_URL;

export const Urls = {
    smsCode: `${baseUrl}/vfcode`, // 短信验证码接口
    register: `${baseUrl}/register` // 用户注册接口
};
