const baseUrl = process.env.VUE_APP_BASE_URL;

export const Urls = {
    common: {
        smsCode: `${baseUrl}/vfcode`, // 获取短信验证码接口
        quota: `${baseUrl}/project/withdrawableAmount`, // 取可提现额度接口
        todayRate: `${baseUrl}/project/exchangeRateToday` // 获取今日汇率接口
    },
    user: {
        register: `${baseUrl}/register`, // 用户注册接口
        login: `${baseUrl}/login`, // 用户登录接口
        retrieval: `${baseUrl}/retrieval`, // 用户找回密码接口
        logout: `${baseUrl}/user/signOut`, // 退出登录接口
        lockQuota: `${baseUrl}/user/lockQuota`, // 获取用户锁仓额度接口
        info: `${baseUrl}/user/userInfo`, // 获取用户信息接口
        setNickname: `${baseUrl}/user/setNickName` // 设置用户昵称接口
    },
    child: {
        lockPromoteRates: `${baseUrl}/project/lockRateAndPushReward`, // 获取锁仓利率和推广解锁利率接口
        page: `${baseUrl}/user/childList`, // 获取下级分页列表接口
        setRemark: `${baseUrl}/user/setNickNameRemark`, // 设置下级备注接口
        setRates: `${baseUrl}/user/setChildRate`, // 设置下级利率接口
        defaultRate: {
            // 默认利率
            stats: `${baseUrl}/user/existDefaultRate`, // 获取默认利率统计接口
            set: `${baseUrl}/user/defaultRateSet` // 设置默认利率接口
        }
    },
    project: {
        projectStats: `${baseUrl}/project/projectList`, // 获取项目统计接口
        assetStats: `${baseUrl}/project/capitalLedger`, // 获取资产统计接口
        earningsStats: `${baseUrl}/project/yesterdayEarnings`, // 获取收益统计接口
        promoteReward: {
            stats: `${baseUrl}/project/extensionReward`, // 获取推广奖励统计接口
            pushPage: `${baseUrl}/project/pushRewardList`, // 获取直推奖励分页列表接口
            lockPage: `${baseUrl}/project/lockRewardList`, // 获取锁仓奖励分页列表接口
            unlockPage: `${baseUrl}/project/unlockRewardList`, // 获取推广解锁奖励分页列表接口
            salePage: `${baseUrl}/project/salesRewardList` // 获取销量达标奖励分页列表接口
        }
    },
    transaction: {
        types: `${baseUrl}/project/transactionType`, // 获取交易类型列表接口
        page: `${baseUrl}/project/transactionRecode`, // 获取交易分页列表接口
        detail: `${baseUrl}/project/transactionDetail` // 获取交易详情接口
    },
    lock: {
        minAmount: `${baseUrl}/project/minLockAmount`, // 获取最小锁仓金额接口
        list: `${baseUrl}/project/lockOrderList`, // 获取锁仓列表接口
        create: `${baseUrl}/project/lockPosition` // 创建锁仓接口
    },
    recharge: {
        coins: `${baseUrl}/project/rechargeCoinList`, // 获取充值币种列表接口
        address: `${baseUrl}/project/rechargeAddresses`, // 获取充值地址接口
        list: `${baseUrl}/project/rechargeRecord` // 获取充值列表接口
    },
    withdraw: {
        execute: `${baseUrl}/project/withdrawCoin`, // 执行提现接口
        list: `${baseUrl}/project/withdrawRecord`, // 获取提现列表接口
        address: {
            list: `${baseUrl}/project/withdrawAddresses`, // 获取提现地址列表接口
            add: `${baseUrl}/project/addWithdrawAddress` // 添加提现地址接口
        }
    },
    transfer: {
        execute: `${baseUrl}/user/transfer`, // 执行转账接口
        list: `${baseUrl}/project/transferRecord`, // 获取转账列表接口
        childs: `${baseUrl}/user/childMailList` // 获取转账下级列表接口
    },
    security: {
        modifyLoginPassword: `${baseUrl}/user/resetPasswd`, // 修改登录密码接口
        fundPassword: {
            set: `${baseUrl}/user/setFundPasswd`, // 设置资金密码接口
            modify: `${baseUrl}/user/modifyFundPasswd` // 修改资金密码接口
        }
    }
};
