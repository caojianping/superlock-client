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
        ['user/', 'child/', 'project/', 'transaction/', 'lock/', 'recharge/', 'withdraw/', 'transfer/', 'security/', 'loan/'].forEach(
            (item: string) => {
                store.commit(item + TYPES.CLEAR_STATES);
            }
        );
        return true;
    }

    // 设置资金页面来源
    public static setFundFrom(from: string) {
        SessionStorage.setItem<string>(CONSTANTS.FUND_FROM, from);
    }

    // 获取资金页面来源
    public static getFundFrom(): string {
        return SessionStorage.getItem<string>(CONSTANTS.FUND_FROM) || '';
    }

    // 移除资金页面来源
    public static removeFundFrom(): boolean {
        SessionStorage.removeItem(CONSTANTS.FUND_FROM);
        return true;
    }

    // 设置贷款页面来源
    public static setLoanFrom(from: string) {
        SessionStorage.setItem<string>(CONSTANTS.LOAN_FROM, from);
    }

    // 获取贷款页面来源
    public static getLoanFrom(): string {
        return SessionStorage.getItem<string>(CONSTANTS.LOAN_FROM) || '';
    }

    // 移除贷款页面来源
    public static removeLoanFrom(): boolean {
        SessionStorage.removeItem(CONSTANTS.LOAN_FROM);
        return true;
    }
}
