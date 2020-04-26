const baseUrl = process.env.VUE_APP_BASE_URL;

export const Urls = {
    // 谷歌验证模块 ok
    google: {
        key: `${baseUrl}/google/getGoogleKey`,
        bind: `${baseUrl}/google/bind`,
        unbind: `${baseUrl}/google/unbind`
    },
    // 登录模块 ok
    login: {
        login: `${baseUrl}/login`,
        logout: `${baseUrl}/login/logout`
    },
    // 首页模块 ok
    home: {
        info: `${baseUrl}/mainData`,
        init: {
            info: `${baseUrl}/mainData/initialData`,
            set: `${baseUrl}/mainData/initialDataSet`
        }
    },
    // 充值模块 ok
    recharge: {
        order: {
            list: `${baseUrl}/recharge/list`,
            export: `${baseUrl}/recharge/export`
        },
        poundage: {
            list: `${baseUrl}/recharge/fee`,
            add: `${baseUrl}/rechaarge/addFee`,
            update: `${baseUrl}/recharge/updateFee`
        },
        address: {
            list: `${baseUrl}/recharge/address/list`,
            export: `${baseUrl}/recharge/address/export`
        }
    },
    // 提现模块 ok
    withdraw: {
        order: {
            list: `${baseUrl}/withdraw/list`,
            export: `${baseUrl}/withdraw/export`
        },
        transfer: {
            list: `${baseUrl}/withdraw/transfer`,
            export: `${baseUrl}/withdraw/transfer/export`
        }
    },
    // 锁仓模块 ok
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
    // 财务模块 ok
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
    // 贷款模块 ok
    loan: {
        order: {
            list: '',
            export: ''
        },
        interest: {
            list: '',
            export: ''
        },
        setting: ''
    },
    // 资金模块 ok
    fund: {
        record: {
            list: `${baseUrl}/funding/list`,
            export: `${baseUrl}/funding/export`
        }
    },
    // 风控模块 ok
    risk: {
        audit: {
            info: `${baseUrl}/finance/smallTrialExemption`,
            set: `${baseUrl}/finance/smallTrialExemptionSet`
        }
    },
    // 用户中心模块 ok
    member: {
        broker: {
            list: `${baseUrl}/broker/list`, // 券商分页列表
            export: `${baseUrl}/broker/export`, // 券商导出
            rates: `${baseUrl}/broker/rateList`, // 利率分页列表
            types: `${baseUrl}/broker/lockRate`, // 项目类型
            add: `${baseUrl}/broker/add`, // 添加券商
            setRate: `${baseUrl}/broker/rateSet`, // 设置利率
            addQuota: `${baseUrl}/broker/addAmount` // 添加额度
        },
        child: {
            list: `${baseUrl}/broker/subordinate`,
            export: `${baseUrl}/broker/subordinate/export`
        }
    },
    // 运营商模块 ok
    carrier: {
        cache: `${baseUrl}/carrier/cache`,
        list: {
            list: `${baseUrl}/carrier/list`,
            export: `${baseUrl}/carrier/export`,
            add: `${baseUrl}/carrier/add`,
            updatePassword: `${baseUrl}/carrier/updatePwd`,
            updateMobile: `${baseUrl}/carrier/updateMobile`,
            updateRebate: `${baseUrl}/carrier/updateRebate`,
            updateEmail: `${baseUrl}/carrier/updateEmail`
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
    // 上分模块 ok
    point: {
        record: {
            list: `${baseUrl}/onPoints/list`,
            pointInfo: `${baseUrl}/onPoints/pointsInfo`,
            setPoint: `${baseUrl}/onPoints/addmoney`,
            transferInfo: `${baseUrl}/onPoints/transferInfo`,
            setTransfer: `${baseUrl}/onPoints/transfer`,
            export: `${baseUrl}/onPoints/export`
        },
        accounts: `${baseUrl}/account/list`
    },
    // 系统模块 ok
    system: {
        user: {
            roles: `${baseUrl}/role/list`,
            list: `${baseUrl}/user/list`,
            add: `${baseUrl}/user/add`,
            update: `${baseUrl}/user/update`,
            delete: `${baseUrl}/user/delete`,
            resetPassword: `${baseUrl}/user/updatePwd`,
            resetGa: `${baseUrl}/user/resetGa`
        },
        setPassword: `${baseUrl}/login/updatePwd`,
        setGoogle: ''
    },
    report: {
        recharge: {
            list: `${baseUrl}/report/recharge`,
            export: `${baseUrl}/report/recharge/export`
        },
        lock: {
            list: `${baseUrl}/report/lock`,
            export: `${baseUrl}/report/lock/export`
        },
        expend: {
            list: `${baseUrl}/report/expenditure`,
            export: `${baseUrl}/report/expenditure/export`
        },
        user: {
            list: `${baseUrl}/report/user`,
            export: `${baseUrl}/report/user/export`
        }
    }
};
