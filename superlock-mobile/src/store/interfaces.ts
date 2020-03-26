import { Commit } from 'vuex';
import { RegisterStatus } from '@/ts/config';
import {
    TokenInfo,
    UserForm,
    AssetStatsModel,
    EarningsStatsModel,
    LockModel,
    ProjectStatsModel,
    UserLockQuotaModel
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
