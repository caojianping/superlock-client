import { Commit } from 'vuex';
import { RegisterStatus } from '@/ts/config';
import {
    TokenInfo,
    UserFormModel,
    UserInfoModel,
    UserLockQuotaModel,
    ProjectStatsModel,
    ProjectModel,
    AssetStatsModel,
    EarningsStatsModel,
    LockFormModel,
    LockModel,
    RechargeCoinModel,
    RechargeModel,
    WithdrawQuotaModel,
    WithdrawFormModel,
    WithdrawModel,
    WithdrawAddressModel,
    SecurityFormModel
} from '@/ts/models';

export interface IActionContext<T> {
    commit: Commit;
    state: T;
    rootState: IRootState;
}

export interface IRootState {
    tokenInfo: TokenInfo;
    lockUnits: Array<string>;
    lockStatuses: Map<number, string>;
}

export interface IUserState {
    userInfo: UserInfoModel; // 用户信息
    userForm: UserFormModel; // 用户表单
    registerStatus: RegisterStatus; // 注册状态
}

export interface IHomeState {
    userLockQuota: UserLockQuotaModel; // 用户锁仓额度
    projectStats?: ProjectStatsModel; // 项目统计
}

export interface IAssetState {
    assetStats: AssetStatsModel | null;
    earningsStats: EarningsStatsModel | null;
    locks: Array<LockModel> | null;
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

export interface ILockState {
    lockProject: ProjectModel; // 锁仓项目
    lockForm: LockFormModel; // 锁仓表单
}

export interface ISecurityState {
    securityForm: SecurityFormModel; // 安全中心表单
}
