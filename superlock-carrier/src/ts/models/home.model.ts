export class HomeDetailModel {
    public lockCount!: number; // 锁仓人数
    public lockTotalAmount!: number; // 锁仓总额
    public loanCount!: number; // 贷款人数
    public loanTotalAmount!: number; // 贷款总额
    public mortgageTotalAmount!: number; // 抵押总额
    public totalExpenditure!: number; // 累计支出
}

export class HomeModel {
    public today!: HomeDetailModel; // 今日数据
    public all!: HomeDetailModel; // 总计数据
    public registerAllCount?: string; // 累计注册用户
}

export class InitInfoFormModel {
    public initialTotalLock!: number; // 初始锁仓总额
    public initialRegisteredUser!: number; // 初始注册用户
}
