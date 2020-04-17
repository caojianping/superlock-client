const baseUrl = process.env.VUE_APP_BASE_URL;

export const Urls = {
    // 登录模块
    login: {
        login: `${baseUrl}/login`,
        smsCode: `${baseUrl}/login/sms`,
        logout: `${baseUrl}/login/logout`
    },
    // 首页模块
    home: {
        info: `${baseUrl}/mainData`,
        init: {
            info: `${baseUrl}/mainData/initialData`,
            set: `${baseUrl}/mainData/initialDataSet`
        }
    },
    // 锁仓模块
    lock: {
        order: {
            list: `${baseUrl}/lockPosition/list`,
            export: `${baseUrl}/lockPosition/export`
        },
        award: {
            info: `${baseUrl}/lockPosition/rewardInfo`,
            update: `${baseUrl}/lockPosition/rewardSet`
        },
        project: {
            list: `${baseUrl}/lockPosition/projects`,
            create: `${baseUrl}/lockPosition/createProject`,
            update: `${baseUrl}/lockPosition/updateProject`
        }
    },
    // 财务模块
    finance: {
        review: `${baseUrl}/finance/review`,
        // 利息支出页面
        interest: {
            list: `${baseUrl}/finance/interest`,
            export: `${baseUrl}/finance/interest/export`
        },
        // 直推奖励页面
        direct: {
            list: `${baseUrl}/finance/pushStraight`,
            export: `${baseUrl}/finance/pushStraight/export`
        },
        // 推广奖励页面
        promote: {
            list: `${baseUrl}/finance/popularize`,
            export: `${baseUrl}/finance/popularize/export`
        },
        // 日销奖励页面
        sale: {
            list: `${baseUrl}/finance/salesEarn`,
            export: `${baseUrl}/finance/salesEarn/export`
        }
    },
    // 用户中心模块
    member: {
        // 券商列表页面
        broker: {
            list: `${baseUrl}/broker/list`, // 券商分页列表
            childs: `${baseUrl}/broker/subordinate`, // 下级分页列表
            rates: `${baseUrl}/broker/rateList`, // 利率分页列表
            types: `${baseUrl}/broker/lockRate`, // 项目类型
            add: `${baseUrl}/broker/add`, // 添加券商
            setRate: `${baseUrl}/broker/rateSet`, // 设置利率
            addQuota: `${baseUrl}/broker/addAmount` // 添加额度
        }
    },
    // 运营商模块
    carrier: {
        cache: `${baseUrl}/carrier/cache`,
        list: {
            list: `${baseUrl}/carrier/list`,
            add: `${baseUrl}/carrier/add`,
            updatePassword: `${baseUrl}/carrier/updatePwd`,
            updateMobile: `${baseUrl}/carrier/updateMobile`,
            updateRebate: `${baseUrl}/carrier/updateRebate`
        },
        rebate: {
            list: `${baseUrl}/carrier/rebates`,
            export: `${baseUrl}/carrier/rebates/export`
        },
        flash: {
            list: `${baseUrl}/carrier/flash`,
            export: `${baseUrl}/carrier/flash/export`
        },
        withdraw: {
            list: `${baseUrl}/carrier/withdraw`,
            export: `${baseUrl}/carrier/withdraw/export`
        }
    },
    // 系统模块
    system: {
        setPassword: `${baseUrl}/login/updatePwd`
    }
};
