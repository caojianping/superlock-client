import { Commit } from 'vuex';
import { RegisterStatus } from '@/ts/config';
import {
    TokenInfo,
    QuotaModel,
    UserFormModel,
    UserInfoModel,
    UserLockQuotaModel,
    LockPromoteRateModel,
    ChildModel,
    DefaultRateFormModel,
    DefaultRateStatsModel,
    ExchangeRateModel,
    ProjectStatsModel,
    ProjectModel,
    AssetStatsModel,
    EarningsStatsModel,
    PromoteRewardStatsModel,
    PromoteRewardPushModel,
    PromoteRewardLockModel,
    PromoteRewardUnlockModel,
    PromoteRewardSaleModel,
    TransactionTypeModel,
    TransactionInfoModel,
    TransactionModel,
    LockFormModel,
    LockModel,
    RechargeCoinModel,
    RechargeModel,
    WithdrawFormModel,
    WithdrawAddressModel,
    WithdrawModel,
    TransferFormModel,
    TransferChildModel,
    TransferModel,
    SecurityFormModel,
    LockResultModel
} from '@/ts/models';

export interface IActionContext<T> {
    commit: Commit;
    state: T;
    rootState: IRootState;
}

export interface IRootState {
    tokenInfo: TokenInfo; // token信息
    quota?: QuotaModel | null; // 可提现、可转账额度
    exchangeRate?: ExchangeRateModel | null; // 汇率

    unitTypes: Array<string>; // 单位类型
    rateTypes: Array<string>; // 利率类型
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
    child?: ChildModel | null; // 下级

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
    rewards?: Array<PromoteRewardPushModel | PromoteRewardLockModel | PromoteRewardUnlockModel | PromoteRewardSaleModel>; // 推广奖励列表
}

export interface ITransactionState {
    transactionTypes: Array<TransactionTypeModel>; // 交易类型列表
    transactionType: TransactionTypeModel; // 交易类型

    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
    transactions?: Array<TransactionModel>; // 交易列表

    type: number;
    orderId: string;
    transaction?: TransactionInfoModel | RechargeModel | WithdrawModel | TransferModel | null;
}

export interface ILockState {
    lockProject?: ProjectModel | null; // 锁仓项目
    lockForm: LockFormModel; // 锁仓表单
    lockResult?: LockResultModel | null; // 锁仓结果
    locks?: Array<LockModel>;
}

export interface IRechargeState {
    rechargeCoins?: Array<RechargeCoinModel>; // 充值币种列表
    rechargeCoin: string; // 充值币种
    rechargeAddress: string; // 充值地址

    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
    recharges?: Array<RechargeModel>; // 充值列表
    recharge?: RechargeModel | null; // 充值信息
}

export interface IWithdrawState {
    withdrawForm: WithdrawFormModel; // 提现表单

    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
    withdraws?: Array<WithdrawModel>; // 提现列表
    withdraw?: WithdrawModel | null; // 提现信息

    withdrawAddresses?: Array<WithdrawAddressModel>; // 提现地址列表
    selectedWithdrawAddress?: WithdrawAddressModel; // 已选择的提现地址
}

export interface ITransferState {
    transferForm: TransferFormModel; // 提现表单

    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
    transfers?: Array<TransferModel>; // 转账列表
    transfer?: TransferModel | null; // 转账信息

    transferChilds?: Array<TransferChildModel>; // 转账下级列表
    selectedTransferChild?: TransferChildModel; // 已选择的转账下级
}

export interface ISecurityState {
    securityForm: SecurityFormModel; // 安全中心表单
}
