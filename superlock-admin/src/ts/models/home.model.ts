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
    public rel_registerAllCount?: number; // 实际注册人数
    public rel_lockTotalAmount?: number; // 实际锁仓数量
    public rel_lockTotal_dc_Amount?: number; // 实际锁仓总价值
    public rel_lockTotal_bcb_Amount?: number; // 实际锁仓总量
}

export class InitModel {
    public initialTotalLock!: number; // 初始锁仓总额
    public initialRegisteredUser!: number; // 初始注册用户
}

export class VirtualSectionModel {
    public startTime!: string; // 开始时间
    public endTime!: string; // 结束时间
    public interval!: number; // 时间间隔
    public minValue!: number; // 最小值
    public maxValue!: number; // 最大值
}

export class VirtualModel {
    public initialAmount!: number; // 初始数据
    public virtualDtos!: Array<VirtualSectionModel>;
}
