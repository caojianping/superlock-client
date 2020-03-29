import { Commit } from 'vuex';
import { RegisterStatus } from '@/ts/config';
import {
    TokenInfo,
    UserFormModel,
    UserInfoModel,
    UserLockQuotaModel,
    AssetStatsModel,
    EarningsStatsModel,
    LockModel,
    ProjectStatsModel,
    RechargeCoinModel,
    RechargeModel,
    WithdrawFormModel,
    WithdrawAddressModel,
    WithdrawModel,
    ProjectModel,
    LockFormModel
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
    userInfo: UserInfoModel;
    userForm: UserFormModel;
    registerStatus: RegisterStatus;
}

export interface IHomeState {
    userLockQuota: UserLockQuotaModel | null;
    projectStats: ProjectStatsModel | null;
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
    recharges: Array<RechargeModel>; // 充值列表
    recharge: RechargeModel; // 充值信息
}

export interface IWithdrawState {
    withdrawForm: WithdrawFormModel; // 提现表单

    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
    withdraws: Array<WithdrawModel>; // 提现列表
    withdraw: WithdrawModel; // 提现信息

    withdrawAddresses: Array<WithdrawAddressModel>; // 提现地址列表
    selectedWithdrawAddress?: WithdrawAddressModel; // 已选择的提现地址
}

export interface ILockState {
    lockProject: ProjectModel; // 锁仓项目
    lockForm: LockFormModel; // 锁仓表单
}
