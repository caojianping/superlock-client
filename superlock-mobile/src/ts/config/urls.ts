const baseUrl = process.env.VUE_APP_BASE_URL;

export const Urls = {
    common: {
        smsCode: `${baseUrl}/vfcode` // 获取短信验证码接口
    },
    user: {
        register: `${baseUrl}/register`, // 用户注册接口
        login: `${baseUrl}/login`, // 用户登录接口
        retrieval: `${baseUrl}/retrieval`, // 用户找回密码接口
        lockQuota: `${baseUrl}/user/lockQuota`, // 获取用户锁仓额度接口
        info: `${baseUrl}/user/userInfo`, // 获取用户信息接口
        setNickname: `${baseUrl}/user/setNickName` // 设置用户昵称接口
    },
    project: {
        stats: `${baseUrl}/project/projectList` // 获取项目统计接口
    },
    asset: {
        assetStats: `${baseUrl}/project/capitalLedger`, // 获取资产统计接口
        earningsStats: `${baseUrl}/project/yesterdayEarnings` // 获取收益统计接口
    },
    lock: {
        list: `${baseUrl}/project/lockOrderList` // 获取锁仓列表接口
    },
    recharge: {
        coins: `${baseUrl}/project/rechargeCoinList`, // 获取充值币种列表接口
        address: `${baseUrl}/project/rechargeAddresses`, // 获取充值地址接口
        page: `${baseUrl}/project/rechargeRecord` // 获取充值列表接口
    },
    withdraw: {
        execute: `${baseUrl}/project/withdrawCoin`, // 执行提现接口
        page: `${baseUrl}/project/withdrawRecord`, // 获取提现列表接口
        address: {
            list: `${baseUrl}/project/withdrawAddresses`, // 获取提现地址列表接口
            add: `${baseUrl}/project/addWithdrawAddress` // 添加提现地址接口
        }
    },
    test: {
        info: `${baseUrl}/mainData` // 测试接口
    }
};
