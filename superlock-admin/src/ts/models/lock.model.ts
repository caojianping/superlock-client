// 锁仓模型
export class LockModel {
    public serial!: string; // 订单号
    public uid!: string; // UID
    public userSource!: string; // 用户来源
    public amount!: string; // 锁仓数量
    public rate!: string; // 锁仓汇率
    public value!: string; // 锁仓价值
    public cycle!: string; // 锁仓周期
    public createDate!: string; // 创建时间
    public beginDate!: string; // 开始时间
    public endDate!: string; // 结束时间
    public status!: string; // 状态
}

// 项目模型
export class ProjectModel {
    public id!: number; // 项目ID
    public memo!: string; // 项目名称
    public length!: string; // 项目周期
    public quota!: string; // 项目总额度
    public rate!: string; // 锁仓利率
    public pushRate!: string; // 直推奖励利率
    public createTime!: string; // 项目创建时间
    public enable!: boolean; // 状态
}

// 项目表单模型
export class ProjectFormModel {
    public id?: number; // 项目编号
    public memo!: string; // 项目名称
    public length!: number; // 项目周期
    public quota!: number; // 项目总额度
    public rate!: number; // 锁仓利率
    public pushRate!: number; // 直推奖励利率
    public enable?: boolean; // 锁仓状态

    // 补充字段：项目总额度、锁仓利率不可以改小
    public originQuota?: number;
    public originRate?: number;
}

// 奖励表单模型
export class AwardFormModel {
    public promotionRate!: number; // 推广解锁利率
    public pushStraightRate!: number; // 直推利率
    public lockAmount!: number; // 最小锁仓数量
    public dailySalesDto: Array<AwardDailySaleModel> = []; // 日销奖励

    // 补充字段：推广解锁利率不可以改小
    public originPromotionRate?: number;
}

// 奖励日销模型
export class AwardDailySaleModel {
    public sales!: number; // 达标日销数量
    public rate!: number; // 达标返奖利率
}
