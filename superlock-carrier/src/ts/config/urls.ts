const baseUrl = process.env.VUE_APP_BASE_URL;

export const Urls = {
    // 登录模块
    login: {
        smsCode: `${baseUrl}/login/sms`, // 获取短信验证码接口
        emailCode: `${baseUrl}/login/email`, // 获取邮箱验证码接口
        check: `${baseUrl}/login/checkPwd`, // 校验用户信息接口
        login: `${baseUrl}/login`, // 登录接口
        logout: `${baseUrl}/login/logout` // 注销接口
    },
    // 首页模块
    home: {
        data: `${baseUrl}/mainData` // 获取首页数据接口
    },
    // 锁仓模块
    lock: {
        order: {
            list: `${baseUrl}/lockPosition/list`, // 获取锁仓列表接口
            export: `${baseUrl}/lockPosition/export` // 导出锁仓列表接口
        },
        awardInfo: `${baseUrl}/lockPosition/rewardInfo`, // 获取奖励信息接口
        projects: `${baseUrl}/lockPosition/projects` // 获取项目列表接口
    },
    // 财务模块
    finance: {
        review: `${baseUrl}/finance/review`, // 设置审核接口
        interest: {
            list: `${baseUrl}/finance/interest`, // 获取利息支出列表接口
            export: `${baseUrl}/finance/interest/export` // 导出利息支出列表接口
        },
        direct: {
            list: `${baseUrl}/finance/pushStraight`, // 获取直推奖励列表接口
            export: `${baseUrl}/finance/pushStraight/export` // 导出直推奖励列表接口
        },
        promote: {
            list: `${baseUrl}/finance/popularize`, // 获取推广奖励列表接口
            export: `${baseUrl}/finance/popularize/export` // 导出推广奖励列表接口
        },
        sale: {
            list: `${baseUrl}/finance/salesEarn`, // 获取日销奖励列表接口
            export: `${baseUrl}/finance/salesEarn/export` // 导出日销奖励列表接口
        }
    },
    // 用户中心模块
    member: {
        broker: {
            list: `${baseUrl}/broker/list`, // 获取券商列表接口
            export: `${baseUrl}/broker/export`, // 导出券商列表接口
            rates: `${baseUrl}/broker/rateList`, // 获取利率列表接口
            types: `${baseUrl}/broker/lockRate`, // 获取项目类型列表接口
            add: `${baseUrl}/broker/add`, // 添加券商接口
            setRate: `${baseUrl}/broker/rateSet`, // 设置利率接口
            addQuota: `${baseUrl}/broker/addAmount` // 添加额度接口
        },
        child: {
            list: `${baseUrl}/broker/subordinate`, // 获取券商下级列表接口
            export: `${baseUrl}/broker/subordinate/export` // 导出券商下级列表接口
        }
    },
    // 运营商模块
    carrier: {
        index: {
            info: `${baseUrl}/carrier/info`, // 获取运营信息接口
            rate: `${baseUrl}/carrier/rate`, // 获取运营利率接口
            presetExchange: `${baseUrl}/carrier/cash`, // 预兑换接口
            confirmExchange: `${baseUrl}/carrier/cashCommit`, // 确认兑换接口
            withdraw: `${baseUrl}/carrier/withdrawCoin` // 提现接口
        },
        rebate: {
            list: `${baseUrl}/carrier/rebates`, // 获取返利订单列表接口
            export: `${baseUrl}/carrier/rebates/export` // 导出返利订单列表接口
        },
        flash: {
            list: `${baseUrl}/carrier/flash`, // 获取闪兑订单接口
            export: `${baseUrl}/carrier/flash/export` // 导出闪兑订单接口
        },
        withdraw: {
            list: `${baseUrl}/carrier/withdraw`, // 获取提现订单接口
            export: `${baseUrl}/carrier/withdraw/export` // 导出提现订单接口
        }
    },
    // 系统模块
    system: {
        setPassword: `${baseUrl}/login/updatePwd` // 设置密码接口
    }
};
