// 利率模型
export class RateModel {
    public type!: number; // 类型；1:锁仓利率 2:推广解锁利率 3:锁仓额度
    public length!: number; // 锁仓长度；type为1时不为空
    public unit!: number; // 锁仓长度单位；1：天 2：月 3：年； type为1时不为空
    public value!: number; // 用户当前值（下级可设置的最大值）
}

// 下级模型
export class ChildModel {
    public nickName!: string; // 下级名称
    public uid!: string; // 下级uid
    public enable!: boolean; // 是否激活；true:已激活，false:未激活
    public date!: string; // 激活日期
    public teamUsedQuota!: number; // 团队已用额度
    public rates!: Array<ChildRateModel>; // 利率列表
}

// 下级利率模型
export class ChildRateModel extends RateModel {
    public remark!: string; // 类型描述
    public suffix!: string; // 后缀单位；%，DC
    public childValue!: number; // 下级当前值
}

// 默认利率统计模型
export class DefaultRateStatsModel extends RateModel {
    public existDefault!: boolean;
    public defaultRateList!: Array<DefaultRateModel>;
}

// 默认利率模型
export class DefaultRateModel extends RateModel {
    public remark!: string;
    public suffix!: string;
}

// 默认利率表单模型
export class DefaultRateFormModel extends RateModel {
    public max!: number;
}
