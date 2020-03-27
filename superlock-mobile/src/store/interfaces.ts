import { Commit } from 'vuex';
import { RegisterStatus } from '@/ts/config';
import {
    TokenInfo,
    UserForm,
    AssetStatsModel,
    EarningsStatsModel,
    LockModel,
    ProjectStatsModel,
    UserLockQuotaModel,
    UserInfo,
    RechargeCoinModel,
    RechargeModel
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
    userInfo: UserInfo;
    userForm: UserForm;
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
    coins: Array<RechargeCoinModel>; // 充值币种列表
    coin: string; // 充值币种
    address: string; // 充值地址

    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
    recharges: Array<RechargeModel>; // 充值列表
    recharge: RechargeModel; // 充值信息
}
