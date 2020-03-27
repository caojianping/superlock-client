const baseUrl = process.env.VUE_APP_BASE_URL;

export const Urls = {
    common: {
        smsCode: `${baseUrl}/vfcode` // 短信验证码接口
    },
    user: {
        register: `${baseUrl}/register`, // 用户注册接口
        login: `${baseUrl}/login`, // 用户登录接口
        retrieval: `${baseUrl}/retrieval`, // 用户找回密码接口
        lockQuota: `${baseUrl}/user/lockQuota`, // 用户锁仓额度接口
        info: `${baseUrl}/user/userInfo` // 用户信息接口
    },
    project: {
        stats: `${baseUrl}/project/projectList` // 项目统计、列表接口
    },
    asset: {
        assetStats: `${baseUrl}/project/capitalLedger`, // 资产统计接口
        earningsStats: `${baseUrl}/project/yesterdayEarnings` // 收益统计接口
    },
    lock: {
        list: `${baseUrl}/project/lockOrderList` // 锁仓列表接口
    },
    recharge: {
        coins: `${baseUrl}/project/rechargeCoinList`, // 获取币种类型
        address: `${baseUrl}/project/rechargeAddresses`, // 充值地址接口
        record: `${baseUrl}/project/rechargeRecord` // 充值记录接口
    },
    withdraw: {
        operate: `${baseUrl}/project/withdrawCoin`, // 提现操作接口
        record: `${baseUrl}/project/withdrawRecord`, // 提现记录接口
        address: {
            list: `${baseUrl}/project/withdrawAddresses`, // 提现地址列表接口
            add: `${baseUrl}/project/addWithdrawAddress` // 添加提现地址接口
        }
    },
    test: {
        info: `${baseUrl}/mainData` // 测试接口
    }
};
