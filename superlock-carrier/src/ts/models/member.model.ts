import { PageResult } from './page.model';

// 券商下级分页结果
export class BrokerChildPageResult<T> extends PageResult<T> {
    public uid!: string; // UID
    public subordinate!: number; // 下级数量
}

// 券商模型
export class BrokerModel {
    public uid!: string; // 关联UID
    public mobile!: string; // 手机号
    public email!: string; // 邮箱
    public userSource!: string; // 用户来源
    public amount!: string; // 可用BCB数量
    public totalDegree!: string; // 总额度
    public remainingCredit!: string; // 剩余额度
    public totalLockReward!: string; // 个人锁仓总量
    public lockReward!: string; // 个人锁仓收益
    public subRewardValue!: string; // 解锁奖励收益
    public createTime!: string; // 创建时间
    public parent!: string; // 上级UID
}

// 券商下级模型
export class BrokerChildModel {
    public uid!: string; // 关联UID
    public mobile!: string; // 手机号
    public email!: string; // 邮箱
    public totalDegree!: string; // 总额度
    public totalLock!: string; // 个人锁仓总量
    public totalPromote!: string; // 累计推广数量
    public totalReward!: string; // 累计收益
    public acceptReward!: string; // 累计到账
}

// 利率模型
export class RateModel {
    public uid!: number; // 关联UID
    public type!: string; // 用户类型
    public projectId!: string; // 项目ID
    public projectName!: string; // 项目名称
    public rateType!: string; // 利率类型
    public rate!: string; // 利率值
}

// 券商表单模型
export class BrokerFormModel {
    public areaCode!: string; // 地区码
    public mobile!: string; // 手机号
    public email!: string; // 邮箱
    public totalDegree!: number; // 代理额度
    public password!: string; // 初始密码
}

// 利率表单模型
export class RateFormModel {
    public uid!: string; // UID
    public type!: string; // 类型
    public rate!: number; // 利率
}

// 额度表单模型
export class QuotaFormModel {
    public uid!: string; // UID
    public amount!: number; // 额度
}
