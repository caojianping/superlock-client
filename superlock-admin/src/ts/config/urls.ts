const baseUrl = process.env.VUE_APP_BASE_URL;

export const Urls = {
    // 谷歌验证模块
    google: {
        key: `${baseUrl}/google/getGoogleKey`,
        bind: `${baseUrl}/google/bind`,
        unbind: `${baseUrl}/google/unbind`
    },
    // 登录模块
    login: {
        login: `${baseUrl}/login`,
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
    // 充值模块
    recharge: {
        // 充值记录页面
        record: {
            page: `${baseUrl}/recharge/list`, // 充值分页接口
            export: `${baseUrl}/recharge/export` // 充值导出接口
        },
        // 手续费设置页面
        poundage: {
            list: `${baseUrl}/recharge/fee`,
            add: `${baseUrl}/rechaarge/addFee`,
            update: `${baseUrl}/recharge/updateFee`
        }
    },
    // 提现模块
    withdraw: {
        // 提现记录页面
        record: {
            page: `${baseUrl}/withdraw/list`, // 提现分页接口
            export: `${baseUrl}/withdraw/export` // 提现导出接口
        },
        // 转账记录页面
        transfer: {
            page: `${baseUrl}/withdraw/transfer`, // 转账分页接口
            export: `${baseUrl}/withdraw/transfer/export` // 转账导出接口
        }
    },
    // 锁仓模块
    lock: {
        // 锁仓记录页面
        record: {
            page: `${baseUrl}/lockPosition/list`,
            export: `${baseUrl}/lockPosition/export`
        },
        create: `${baseUrl}/lockPosition/createProject`, // 锁仓创建
        award: {
            info: `${baseUrl}/lockPosition/rewardInfo`,
            update: `${baseUrl}/lockPosition/rewardSet`
        },
        project: {
            page: `${baseUrl}/lockPosition/projects`,
            update: `${baseUrl}/lockPosition/updateProject`
        }
    },
    // 财务模块
    finance: {
        review: `${baseUrl}/finance/review`,
        // 利息支出页面
        interest: {
            page: `${baseUrl}/finance/interest`,
            export: `${baseUrl}/finance/interest/export`
        },
        // 直推奖励页面
        direct: {
            page: `${baseUrl}/finance/pushStraight`,
            export: `${baseUrl}/finance/pushStraight/export`
        },
        // 推广奖励页面
        promote: {
            page: `${baseUrl}/finance/popularize`,
            export: `${baseUrl}/finance/popularize/export`
        },
        // 日销奖励页面
        sale: {
            page: `${baseUrl}/finance/salesEarn`,
            export: `${baseUrl}/finance/salesEarn/export`
        }
    },
    // 贷款模块
    loan: {
        // 贷款记录页面
        record: {
            page: '',
            export: ''
        },
        // 贷款计息页面
        interest: {
            page: '',
            export: ''
        },
        setting: ''
    },
    // 资金模块
    fund: {
        record: {
            page: `${baseUrl}/funding/list`,
            export: `${baseUrl}/funding/export`
        }
    },
    // 风控模块
    risk: {
        audit: {
            info: `${baseUrl}/finance/smallTrialExemption`,
            set: `${baseUrl}/finance/smallTrialExemptionSet`
        }
    },
    // 用户中心模块
    member: {
        // 券商列表页面
        broker: {
            page: `${baseUrl}/broker/list`, // 券商分页列表
            childs: `${baseUrl}/broker/subordinate`, // 下级分页列表
            rates: `${baseUrl}/broker/rateList`, // 利率分页列表
            types: `${baseUrl}/broker/lockRate`, // 项目类型
            add: `${baseUrl}/broker/add`, // 添加券商
            setRate: `${baseUrl}/broker/rateSet`, // 设置利率
            addQuota: `${baseUrl}/broker/addAmount` // 添加额度
        }
    },
    // 上分模块
    point: {
        // 上分记录页面
        record: {
            page: `${baseUrl}/onPoints/list`,
            pointInfo: `${baseUrl}/onPoints/pointsInfo`,
            setPoint: `${baseUrl}/onPoints/addmoney`,
            transferInfo: `${baseUrl}/onPoints/transferInfo`,
            setTransfer: `${baseUrl}/onPoints/transfer`,
            export: `${baseUrl}/onPoints/export`
        },
        accounts: `${baseUrl}/account/list`
    },
    // 系统模块
    system: {
        user: {
            roles: `${baseUrl}/role/list`,
            page: `${baseUrl}/user/list`,
            add: `${baseUrl}/user/add`,
            update: `${baseUrl}/user/update`,
            delete: `${baseUrl}/user/delete`,
            resetPassword: `${baseUrl}/user/updatePwd`,
            resetGa: `${baseUrl}/user/resetGa`
        },
        setPassword: `${baseUrl}/login/updatePwd`,
        setGoogle: ''
    }
};
