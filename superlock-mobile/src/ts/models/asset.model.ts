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
