import { Commit } from 'vuex';
import { RegisterStatus, ForgetType } from '@/ts/config';
import {
    TokenInfo,
    VerifyResult,
    UsableQuotaModel,
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
    RechargeModel,
    RechargeCoinModel,
    WithdrawFormModel,
    WithdrawAddressModel,
    WithdrawModel,
    TransferFormModel,
    TransferChildModel,
    TransferModel,
    LockFormModel,
    LockModel,
    LockInterestModel,
    LockResultModel,
    LoanBaseInfoModel,
    LoanableLockModel,
    LoanableQuotaModel,
    LoanInterestModel,
    LoanModel,
    LoanApplyFormModel,
    LoanRepayFormModel,
    TransactionTypeModel,
    TransactionInfoModel,
    TransactionModel,
    EmailFormModel,
    SecurityFormModel
} from '@/ts/models';

export interface IActionContext<T> {
    commit: Commit;
    state: T;
    rootState: IRootState;
}

// 根状态接口
export interface IRootState {
    tokenInfo: TokenInfo; // token信息
    verifyResult?: VerifyResult | null; // 验证结果
    usableQuota?: UsableQuotaModel | null; // 可用额度（提现、转账）
    exchangeRate?: ExchangeRateModel | null; // 兑换汇率

    unitTypes: Array<string>; // 单位类型
    rateTypes: Array<string>; // 利率类型
    dataStatuses: Map<string, string>; // 状态
    fundTypes: Map<string, string>; // 资金类型
}

// 用户状态接口
export interface IUserState {
    userLockQuota?: UserLockQuotaModel | null; // 用户锁仓额度
    userInfo?: UserInfoModel | null; // 用户信息

    forgetType: ForgetType; //忘记密码类型
    registerStatus: RegisterStatus; // 注册状态
    userForm: UserFormModel; // 用户表单
}

// 下级状态接口
export interface IChildState {
    lockPromoteRates: Array<LockPromoteRateModel>; // 锁仓、推广利率列表

    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
    childs?: Array<ChildModel>; // 下级列表
    child?: ChildModel | null; // 下级数据

    defaultRateStats?: DefaultRateStatsModel | null; // 默认利率统计
    defaultRateForms: Array<DefaultRateFormModel>; // 默认利率表单列表
}

// 项目状态接口
export interface IProjectState {
    projectStats?: ProjectStatsModel | null; // 项目统计
    assetStats?: AssetStatsModel | null; // 资产统计
    earningsStats?: EarningsStatsModel | null; // 收益统计
    rewardStats?: PromoteRewardStatsModel | null; // 推广奖励统计模型

    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
    rewards?: Array<PromoteRewardPushModel | PromoteRewardLockModel | PromoteRewardUnlockModel | PromoteRewardSaleModel>; // 推广奖励列表
}

// 交易状态接口
export interface ITransactionState {
    transactionTypes: Array<TransactionTypeModel>; // 交易类型列表
    transactionType: TransactionTypeModel; // 交易类型

    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
    transactions?: Array<TransactionModel>; // 交易列表

    type: number; // 交易类型
    orderId: string; // 交易订单号
    transaction?: TransactionInfoModel | RechargeModel | WithdrawModel | TransferModel | null; // 交易数据
}

// 锁仓状态接口
export interface ILockState {
    lockStatuses: Map<number, string>; // 锁仓状态
    lockColors: Map<number, string>; // 锁仓颜色

    lockProject?: ProjectModel | null; // 锁仓项目
    lockForm: LockFormModel; // 锁仓表单

    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
    lockInterests?: Array<LockInterestModel>; // 锁仓利息列表
    locks?: Array<LockModel>; // 锁仓列表

    id: string; // 锁仓编号
    lock?: LockModel | null; // 锁仓数据
    lockResult?: LockResultModel | null; // 锁仓结果
}

// 贷款状态接口
export interface ILoanState {
    loanFlags: Map<number, string>; // 贷款标志
    loanStatuses: Map<number, string>; // 贷款状态
    loanColors: Map<number, string>; // 贷款颜色

    loanBaseInfo?: LoanBaseInfoModel | null; // 贷款基础信息
    loanableQuota?: LoanableQuotaModel | null; // 可贷款额度

    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
    loans?: Array<LoanModel>; // 贷款列表
    loanInterests?: Array<LoanInterestModel>; // 贷款利息列表
    loanableLocks?: Array<LoanableLockModel>; // 可贷款锁仓列表
    loanableLock?: LoanableLockModel | null; // 可贷款锁仓数据

    id: string; // 贷款编号
    loan?: LoanModel | null; // 贷款数据

    applyForm: LoanApplyFormModel; // 贷款申请表单
    repayForm: LoanRepayFormModel; // 贷款偿还表单
}

// 充值状态接口
export interface IRechargeState {
    rechargeCoins?: Array<RechargeCoinModel>; // 充值币种列表
    rechargeCoin: string; // 充值币种
    rechargeAddress: string; // 充值地址
    minAmount: number; // 最小充值金额

    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
    recharges?: Array<RechargeModel>; // 充值列表
    recharge?: RechargeModel | null; // 充值数据
}

// 提现状态接口
export interface IWithdrawState {
    withdrawForm: WithdrawFormModel; // 提现表单

    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
    withdraws?: Array<WithdrawModel>; // 提现列表
    withdraw?: WithdrawModel | null; // 提现数据

    withdrawAddresses?: Array<WithdrawAddressModel>; // 提现地址列表
    selectedWithdrawAddress?: WithdrawAddressModel; // 已选择的提现地址
}

// 转账状态接口
export interface ITransferState {
    transferForm: TransferFormModel; // 提现表单

    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
    transfers?: Array<TransferModel>; // 转账列表
    transfer?: TransferModel | null; // 转账数据

    transferChilds?: Array<TransferChildModel>; // 转账下级列表
    selectedTransferChild?: TransferChildModel; // 已选择的转账下级
}

// 安全状态接口
export interface ISecurityState {
    securityForm: SecurityFormModel; // 安全中心表单
    emailForm: EmailFormModel; // 邮箱表单
}
