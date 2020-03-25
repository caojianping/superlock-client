import { Commit } from 'vuex';
import { RegisterStatus } from '@/ts/config';
import {
    TokenInfo,
    UserForm,
    AssetStatsModel,
    LockModel,
    EarningsStatsModel
} from '@/ts/models';

export interface IActionContext<T> {
    commit: Commit;
    state: T;
    rootState: IRootState;
}

export interface IRootState {
    tokenInfo: TokenInfo;
}

export interface IUserState {
    userForm: UserForm;
    registerStatus: RegisterStatus;
}

export interface IAssetState {
    assetStats: AssetStatsModel;
    earningsStats: EarningsStatsModel;
    locks: Array<LockModel>;
}
