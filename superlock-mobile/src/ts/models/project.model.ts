// 项目统计
export class ProjectStatsModel {
    public userLockProjectList!: Array<any>; // 用户锁仓项目列表
    public statistics!: {
        cumulativeUser: number; // 累计注册用户
        cumulativeValuation: number; // 累计锁仓价值
        valuationCoin: string; // 币种
    };
    public links!: Array<string>; // 首页轮播图链接
    public qualitySelectionLinks!: Array<string>; // 精品优选链接
    public exchangeHousesLink!: string; //换房链接
}

// 项目
export class ProjectModel {
    public length!: number; // 锁仓长度
    public unit!: number; // 单位
    public rate!: number; // 利率
    public memo!: string; // 备注
}
