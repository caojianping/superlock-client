// 项目统计模型
export class ProjectStatsModel {
    public userLockProjectList!: Array<ProjectModel>; // 用户锁仓项目列表
    public statistics!: {
        cumulativeUser: number; // 累计注册用户
        cumulativeValuation: number; // 累计锁仓价值
        valuationCoin: string; // 币种
    };
    public links!: Array<string>; // 首页轮播图链接
    public qualitySelectionLinks!: Array<string>; // 精品优选链接
    public exchangeHousesLink!: string; //换房链接
    public rateSetRemind!: boolean; // 利率设置提醒
}

// 项目模型
export class ProjectModel {
    public length!: number; // 锁仓长度
    public unit!: number; // 单位
    public rate!: number; // 利率
    public memo!: string; // 备注
}

// 资产统计模型
export class AssetStatsModel {
    public bcbTotalAmount!: number; // BCB总资产
    public dcTotalAmount!: number; // DC总资产
    public bcbHotAmount!: number; // BCB可用余额
    public dcHotAmount!: number; // DC可用余额
    public bcbLockAmount!: number; // BCB锁仓总额
    public dcLockAmount!: number; // DC锁仓总额
}

// 收益模型
export class EarningsModel {
    public type!: number; // 类型； 1：锁仓盈利 2：下级锁仓 3：直推奖励 4：推广解锁奖励 5：日销奖励
    public remark!: string; // 备注
    public income!: number; // 收入
    public coin!: string; // 币种
    public prefix!: number; // 前缀；1 :+ 0: -
}

// 收益统计模型
export class EarningsStatsModel {
    public yesterdayEarnings!: number; // 昨日收益
    public yesterdayEarningsCoin!: string; // 昨日收益币种；
    public totalAssets!: number; // 总资产；
    public totalAssetsCoin!: string; // 总资产币种
    public totalValuationAssets!: number; // 计价总资产
    public totalValuationAssetsCoin!: string; // 计价总资产币种
    public earnings!: Array<EarningsModel>; // 收益列表
}

// 推广奖励模块 =》 统计模型
export class PromoteRewardStatsModel {
    public lockReward!: number; //锁仓奖励
    public lockRewardCoin!: string; // 锁仓奖励币种
    public lockRewardValuation!: number; // 锁仓计价奖励
    public lockRewardValuationCoin!: string; //锁仓计价奖励币种
    public unlockReward!: any; // 推广解锁奖励
    public unlockRewardCoin!: string; // 推广解锁奖励币种
    public unlockRewardValuation!: any; // 推广解锁计价奖励
    public unlockRewardValuationCoin!: any; // 推广解锁计价币种
    public pushReward!: number; // 直推奖励
    public pushRewardCoin!: string; // 直推奖励币种
    public pushRewardValuation!: number; // 直推计价奖励
    public pushRewardValuationCoin!: string; // 直推计价奖励币种
    public allBalance!: number; // 奖励资金池
    public unlockBalance!: number; //已获取的
    public salesReward!: number; // 销量达标奖励
    public salesRewardCoin!: string; // 销量达标奖励币种
    public isBroker!: boolean; // 是不是券商；true:是券商；false:不是券商
}

// 推广奖励模块 =》 直推模型
export class PromoteRewardPushModel {
    public orderId!: string; // 直推奖励订单号
    public uid!: string; // 用户id
    public date!: string; // 日期
    public amount!: number; // 锁仓金额
    public reward!: number; // 直推奖励
    public coin!: string; // 锁仓金额和直推奖励币种
    public balance!: number; // 当前可用余额
    public balanceCoin!: string; // 可用余额币种
    public rewardValuation!: number; // 奖励价值
    public rewardValuationCoin!: string; // 奖励价值币种
}

// 推广奖励模块 =》 锁仓模型
export class PromoteRewardLockModel {
    public orderId!: string; // 锁仓订单号
    public date!: string; // 日期
    public amount!: number; // 锁仓总量
    public interest!: number; // 锁仓奖励
    public coin!: string; // 锁仓金额和锁仓奖励币种
    public balance!: number; // 当前可用余额
    public balanceCoin!: string; // 可用余额币种
    public interestValuation!: number; // 奖励价值
    public interestValuationCoin!: string; // 奖励价值币种
}

// 推广奖励模块 =》 解锁模型
export class PromoteRewardUnlockModel {
    public orderId!: string; // 锁仓订单号
    public date!: string; // 日期
    public amount!: number; // 锁仓总量
    public interest!: number; // 锁仓解锁奖励
    public coin!: string; // 锁仓金额和锁仓解锁奖励币种
    public balance!: number; // 当前可用余额
    public balanceCoin!: string; // 可用余额币种
    public interestValuation!: number; // 奖励价值
    public interestValuationCoin!: string; // 奖励价值币种
}

// 推广奖励模块 =》 日销达标模型
export class PromoteRewardSaleModel {
    public reward!: number; // 奖励
    public rewardCoin!: string; // 奖励币种
    public salesVolume!: number; // 达标触发数量
    public salesVolumeCoin!: string; // 达标触发数量币种
    public date!: string; // 时间
}
