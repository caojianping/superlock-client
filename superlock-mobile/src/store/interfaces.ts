import { Commit } from 'vuex';
import { RegisterStatus } from '@/ts/config';
import {
    TokenInfo,
    UserFormModel,
    UserInfoModel,
    UserLockQuotaModel,
    LockPromoteRateModel,
    ChildModel,
    DefaultRateFormModel,
    DefaultRateStatsModel,
    ProjectStatsModel,
    ProjectModel,
    AssetStatsModel,
    EarningsStatsModel,
    PromoteRewardStatsModel,
    PromoteRewardPushModel,
    PromoteRewardLockModel,
    PromoteRewardUnlockModel,
    PromoteRewardSaleModel,
    LockFormModel,
    LockModel,
    RechargeCoinModel,
    RechargeModel,
    WithdrawQuotaModel,
    WithdrawFormModel,
    WithdrawModel,
    WithdrawAddressModel,
    SecurityFormModel,
    TransactionModel,
    TransactionTypeModel
} from '@/ts/models';

export interface IActionContext<T> {
    commit: Commit;
    state: T;
    rootState: IRootState;
}

export interface IRootState {
    tokenInfo: TokenInfo;
    units: Array<string>;
    rateTypes: Array<string>;
}

export interface IUserState {
    userForm: UserFormModel; // 用户表单
    registerStatus: RegisterStatus; // 注册状态

    userInfo: UserInfoModel; // 用户信息
    userLockQuota?: UserLockQuotaModel | null; // 用户锁仓额度
}

export interface IChildState {
    lockPromoteRates: Array<LockPromoteRateModel>; // 锁仓、推广利率列表

    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
    childs?: Array<ChildModel>; // 下级列表
    child: ChildModel; // 下级

    defaultRateStats?: DefaultRateStatsModel | null; // 默认利率统计
    defaultRateForms: Array<DefaultRateFormModel>; // 默认利率表单列表
}

export interface IProjectState {
    projectStats?: ProjectStatsModel | null; // 项目统计
    assetStats?: AssetStatsModel | null; // 资产统计
    earningsStats?: EarningsStatsModel | null; // 收益统计
    rewardStats?: PromoteRewardStatsModel | null; // 推广奖励统计模型

    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
    rewards?: Array<
        | PromoteRewardPushModel
        | PromoteRewardLockModel
        | PromoteRewardUnlockModel
        | PromoteRewardSaleModel
    >; // 推广奖励列表
}

export interface ITransactionState {
    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
    transactions?: Array<TransactionModel>; // 交易列表
    transaction: TransactionModel; // 交易信息

    transactionTypes: Array<TransactionTypeModel>; // 交易类型列表
    transactionType?: TransactionTypeModel; // 交易类型
}

export interface ILockState {
    lockProject: ProjectModel; // 锁仓项目
    lockForm: LockFormModel; // 锁仓表单
    locks?: Array<LockModel>;
}

export interface IRechargeState {
    rechargeCoins: Array<RechargeCoinModel>; // 充值币种列表
    rechargeCoin: string; // 充值币种
    rechargeAddress: string; // 充值地址

    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
    recharges?: Array<RechargeModel>; // 充值列表
    recharge: RechargeModel; // 充值信息
}

export interface IWithdrawState {
    withdrawQuota: WithdrawQuotaModel; // 提现额度
    withdrawForm: WithdrawFormModel; // 提现表单

    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
    withdraws?: Array<WithdrawModel>; // 提现列表
    withdraw: WithdrawModel; // 提现信息

    withdrawAddresses: Array<WithdrawAddressModel>; // 提现地址列表
    selectedWithdrawAddress?: WithdrawAddressModel; // 已选择的提现地址
}

export interface ISecurityState {
    securityForm: SecurityFormModel; // 安全中心表单
}
