export interface ILockRecordPageParameters {
    uid: string; // UID
    serial: string; // 订单号
    status: string; // 订单状态，空代表全部，0创建，10锁仓资金操作中，20操作锁仓资金完成，锁仓中，30锁仓结束，解仓,40锁仓失败
    beginTime: string;
    endTime: string;
}

export class LockRecordModel {
    public serial!: string; // 订单号
    public uid!: string; // uid
    public amount!: string; // 锁仓数量
    public rate!: string; // 锁仓汇率
    public value!: string; // 锁仓价值
    public cycle!: string; // 锁仓周期
    public createDate!: string; // 创建时间
    public beginDate!: string; // 开始时间
    public endDate!: string; // 结束时间
    public status!: string; // 状态
}

export interface ILockProjectPageParameters {
    projectId: string;
}

export class LockProjectModel {
    public id!: number; // 项目ID
    public memo!: string; // 项目名称
    public length!: string; // 项目周期
    public quota!: string; // 项目总额度
    public rate!: string; // 锁仓利率
    public createTime!: string; // 项目创建时间
    public enable!: boolean; // 状态
}

export class ProjectForm {
    public id?: number; // 项目编号
    public memo!: string; // 项目名称
    public length!: number; // 项目周期
    public quota!: number; // 项目总额度
    public rate!: number; // 锁仓利率
    public enable?: boolean; // 锁仓状态
    public code?: string; // 验证码：谷歌验证码gacode，短信验证码smsCode，邮箱验证码emailCode等

    // 补充字段：项目总额度、锁仓利率不可以改小
    public originQuota?: number;
    public originRate?: number;
}

export class AwardForm {
    public promotionRate!: number; // 推广解锁利率
    public pushStraightRate!: number; // 直推利率
    public lockAmount!: number; // 最小锁仓数量
    public dailySalesDto: Array<AwardDailySale> = []; // 日销奖励
    public code?: string; // 验证码：谷歌验证码gacode，短信验证码smsCode，邮箱验证码emailCode等

    // 补充字段：推广解锁利率不可以改小
    public originPromotionRate?: number;
}

export class AwardDailySale {
    public sales!: number; // 达标日销数量
    public rate!: number; // 达标返奖利率
}
