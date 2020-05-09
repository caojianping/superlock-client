const baseUrl = process.env.VUE_APP_BASE_URL;

export const Urls = {
    // 谷歌验证模块
    google: {
        key: `${baseUrl}/google/getGoogleKey`, // 获取谷歌key接口
        bind: `${baseUrl}/google/bind`, // 绑定谷歌接口
        unbind: `${baseUrl}/google/unbind` // 解绑谷歌接口
    },
    // 登录模块
    login: {
        login: `${baseUrl}/login`, // 登录接口
        logout: `${baseUrl}/login/logout` // 注销接口
    },
    // 首页模块
    home: {
        info: `${baseUrl}/mainData`, // 获取首页信息接口
        init: {
            info: `${baseUrl}/mainData/initialData`, // 获取初始化数据接口
            set: `${baseUrl}/mainData/initialDataSet` // 设置初始化数据接口
        },
        virtual: {
            info: `${baseUrl}/mainData/virtual`, // 获取虚拟数据接口
            set: `${baseUrl}/mainData/setVirtual` // 设置虚拟数据接口
        }
    },
    // 充值模块
    recharge: {
        order: {
            list: `${baseUrl}/recharge/list`, // 获取充值列表接口
            export: `${baseUrl}/recharge/export` // 导出充值列表接口
        },
        poundage: {
            list: `${baseUrl}/recharge/fee`, // 获取手续费列表接口
            add: `${baseUrl}/rechaarge/addFee`, // 添加手续费接口
            update: `${baseUrl}/recharge/updateFee` // 更新手续费接口
        },
        address: {
            list: `${baseUrl}/recharge/address`, // 获取充值地址列表接口
            export: `${baseUrl}/recharge/address/export` // 导出充值地址列表接口
        }
    },
    // 提现模块
    withdraw: {
        order: {
            list: `${baseUrl}/withdraw/list`, // 获取提现列表接口
            export: `${baseUrl}/withdraw/export` // 导出提现列表接口
        },
        transfer: {
            list: `${baseUrl}/withdraw/transfer`, // 获取转账列表接口
            export: `${baseUrl}/withdraw/transfer/export` // 导出转账列表接口
        }
    },
    // 锁仓模块
    lock: {
        order: {
            list: `${baseUrl}/lockPosition/list`, // 获取锁仓列表接口
            export: `${baseUrl}/lockPosition/export` // 导出锁仓列表接口
        },
        award: {
            info: `${baseUrl}/lockPosition/rewardInfo`, // 获取锁仓奖励信息接口
            update: `${baseUrl}/lockPosition/rewardSet` // 更新锁仓奖励信息接口
        },
        project: {
            list: `${baseUrl}/lockPosition/projects`, // 获取项目列表接口
            create: `${baseUrl}/lockPosition/createProject`, // 创建项目接口
            update: `${baseUrl}/lockPosition/updateProject` // 更新项目接口
        },
        cycles: `${baseUrl}/lockPosition/cycle` // 获取锁仓周期接口
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
    // 贷款模块
    loan: {
        order: {
            list: `${baseUrl}/loan/list`, // 获取贷款列表接口
            export: `${baseUrl}/loan/export` // 导出贷款列表接口
        },
        interest: {
            list: `${baseUrl}/loan/interest`, // 获取贷款利息列表接口
            export: `${baseUrl}/loan/interest/export` // 导出贷款利息列表接口
        },
        setting: {
            info: `${baseUrl}/loan/info`, // 获取贷款设置信息接口
            set: `${baseUrl}/loan/set` // 设置贷款信息
        }
    },
    // 资金模块
    fund: {
        record: {
            list: `${baseUrl}/funding/list`, // 获取资金列表接口
            export: `${baseUrl}/funding/export` // 导出资金列表接口
        }
    },
    // 风控模块
    risk: {
        audit: {
            info: `${baseUrl}/finance/smallTrialExemption`, // 获取风控审核信息接口
            set: `${baseUrl}/finance/smallTrialExemptionSet` // 设置风控审核信息接口
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
            addQuota: `${baseUrl}/broker/addAmount`, // 添加额度接口
            updateMobile: `${baseUrl}/broker/updateMobile`, // 更新手机号接口
            setDisable: `${baseUrl}/broker/fundOperation` // 解禁、禁用券商接口
        },
        child: {
            list: `${baseUrl}/broker/subordinate`, // 获取券商下级列表接口
            export: `${baseUrl}/broker/subordinate/export` // 导出券商下级列表接口
        },
        migration: {
            list: `${baseUrl}/broker/migrationList`, // 获取迁移列表接口
            export: `${baseUrl}/broker/migration/export`, // 导出迁移列表接口
            info: `${baseUrl}/broker/migration/info`, // 获取迁移信息接口
            exec: `${baseUrl}/broker/migration` // 执行迁移接口
        }
    },
    // 运营商模块
    carrier: {
        cache: `${baseUrl}/carrier/cache`, // 获取运营商缓存接口
        list: {
            list: `${baseUrl}/carrier/list`, // 获取运营商列表接口
            export: `${baseUrl}/carrier/export`, // 导出运营商列表接口
            add: `${baseUrl}/carrier/add`, // 添加运营商接口
            updatePassword: `${baseUrl}/carrier/updatePwd`, // 更新密码接口
            updateMobile: `${baseUrl}/carrier/updateMobile`, // 更新手机号接口
            updateRebate: `${baseUrl}/carrier/updateRebate`, // 更新返利接口
            updateEmail: `${baseUrl}/carrier/updateEmail` // 更新邮箱接口
        },
        rebate: {
            list: `${baseUrl}/carrier/rebates`, // 获取返利列表接口
            export: `${baseUrl}/carrier/rebates/export` // 导出返利列表接口
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
    // 数据报表模块
    report: {
        recharge: {
            list: `${baseUrl}/report/recharge`, // 获取充值报表列表接口
            export: `${baseUrl}/report/recharge/export` // 导出充值报表列表接口
        },
        lock: {
            list: `${baseUrl}/report/lock`, // 获取锁仓报表列表接口
            export: `${baseUrl}/report/lock/export` // 导出锁仓报表列表接口
        },
        expend: {
            list: `${baseUrl}/report/expenditure`, // 获取支出报表列表接口
            export: `${baseUrl}/report/expenditure/export` // 导出支出报表列表接口
        },
        user: {
            list: `${baseUrl}/report/user`, // 获取用户报表列表接口
            export: `${baseUrl}/report/user/export` // 导出用户报表列表接口
        }
    },
    // 上分模块
    point: {
        record: {
            list: `${baseUrl}/onPoints/list`, // 获取上分列表接口
            export: `${baseUrl}/onPoints/export`, // 导出上分列表接口
            pointInfo: `${baseUrl}/onPoints/pointsInfo`, // 获取上分信息接口
            setPoint: `${baseUrl}/onPoints/addmoney`, // 设置上分接口
            transferInfo: `${baseUrl}/onPoints/transferInfo`, // 获取转账信息接口
            setTransfer: `${baseUrl}/onPoints/transfer` // 设置转账接口
        },
        accounts: `${baseUrl}/account/list` // 获取系统账户列表接口
    },
    // 日志模块
    log: {
        user: {
            list: `${baseUrl}/log/user`, // 获取用户日志列表接口
            export: `${baseUrl}/log/user/export` // 导出用户日志列表接口
        },
        system: {
            list: `${baseUrl}/log/system`, // 获取系统日志列表接口
            export: `${baseUrl}/log/system/export` // 导出系统日志列表接口
        }
    },
    // 系统模块
    system: {
        user: {
            roles: `${baseUrl}/role/list`, // 获取权限列表接口
            list: `${baseUrl}/user/list`, // 获取用户列表接口
            add: `${baseUrl}/user/add`, // 添加用户接口
            update: `${baseUrl}/user/update`, // 更新用户接口
            delete: `${baseUrl}/user/delete`, // 删除用户接口
            resetPassword: `${baseUrl}/user/updatePwd`, // 重置密码接口
            resetGa: `${baseUrl}/user/resetGa`, // 重置GA接口
            setComGa: `${baseUrl}/user/setComGa` // 重置总号GA接口
        },
        setPassword: `${baseUrl}/login/updatePwd`, // 设置密码接口
        setGoogle: '' // 设置谷歌接口
    }
};
