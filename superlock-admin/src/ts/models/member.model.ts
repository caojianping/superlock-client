import { ISelectOption } from '../interfaces';
import { PageResult } from './page.model';

export class BrokerChildPageResult<T> extends PageResult<T> {
    public uid!: string; // UID
    public totalPromote!: number; // 累计推广数量
}

export class BrokerModel {
    public uid!: string; // 关联uid
    public areaCode!: string; // 国家、地区区号
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
    public parent!: string; // 上级uid
    public disable!: boolean; // 是否禁用，true已禁用；false未禁用；
}

export class BrokerChildModel {
    public uid!: string; // 关联uid
    public mobile!: string; // 手机号
    public email!: string; // 邮箱
    public totalDegree!: string; // 总额度
    public totalLock!: string; // 个人锁仓总量
    public totalPromote!: string; // 累计推广数量
    public totalReward!: string; // 累计收益
    public acceptReward!: string; // 累计到账
}

export class RateModel {
    public uid!: number; // 关联uid
    public type!: string; // 用户类型
    public projectId!: string; // 项目ID
    public projectName!: string; // 项目名称
    public rateType!: string; // 利率类型
    public rate!: string; // 利率值
}

export class BrokerFormModel {
    public uid?: string; // 关联uid
    public areaCode!: string; // 地区码
    public mobile!: string; // 手机号
    public email!: string; // 邮箱
    public totalDegree!: number; // 代理额度
    public password!: string; // 初始密码
}

export class RateFormModel {
    public uid!: string;
    public type!: string;
    public rate!: number;
}

export class QuotaFormModel {
    public uid!: string;
    public amount!: number;
}

// 迁移模型
export class MigrationModel {
    public uid!: string; // UID
    public area!: string; // 区号
    public mobile!: string; // 手机号
    public email!: string; // 邮箱
    public fromOperatorName!: string; // 来源平台
    public fromOperatorId!: string; // 来源平台ID
    public toOperatorName!: string; // 迁移平台
    public toOperatorId!: string; // 迁移平台ID
    public createTime!: string; // 迁移时间
    public dcAmount!: string; // 迁移时总锁仓价值DC
    public memo!: string; // 备注
}

// 迁移信息模型
export class MigrationInfoModel {
    public uid!: string;
    public operatorId!: string;
    public operatorName!: string;
    public operatorList!: Array<ISelectOption>;
}

// 迁移表单模型
export class MigrationFormModel {
    public uid!: string;
    public operatorId!: string;
    public memo!: string;
}
