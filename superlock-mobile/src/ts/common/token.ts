import { Cookie } from 'jts-cookie';
import { SessionStorage } from 'jts-storage';
import store from '@/store';
import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { TokenInfo } from '@/ts/models';

export class Token {
    // 设置tokenInfo
    public static setTokenInfo(tokenInfo: TokenInfo) {
        Cookie.setItem<TokenInfo>(CONSTANTS.TOKEN_INFO, tokenInfo, tokenInfo.pttl * 1000);
    }

    // 获取tokenInfo
    public static getTokenInfo(): TokenInfo {
        return Cookie.getItem<TokenInfo>(CONSTANTS.TOKEN_INFO) || new TokenInfo();
    }

    // 移除tokenInfo
    public static removeTokenInfo(): boolean {
        Cookie.removeItem(CONSTANTS.TOKEN_INFO);
        ['user/', 'child/', 'project/', 'transaction/', 'lock/', 'recharge/', 'withdraw/', 'transfer/', 'security/'].forEach((item: string) => {
            store.commit(item + TYPES.CLEAR_STATES);
        });
        return true;
    }

    // 补充一个来源缓存，暂时放在此类中
    public static setFundFrom(from: string) {
        SessionStorage.setItem<string>(CONSTANTS.FUND_FROM, from);
    }

    // 补充一个来源缓存，暂时放在此类中
    public static getFundFrom(): string {
        return SessionStorage.getItem<string>(CONSTANTS.FUND_FROM) || '';
    }

    // 补充一个来源缓存，暂时放在此类中
    public static removeFundFrom(): boolean {
        SessionStorage.removeItem(CONSTANTS.FUND_FROM);
        return true;
    }
}
