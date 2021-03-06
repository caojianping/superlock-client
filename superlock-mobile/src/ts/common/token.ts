import { Cookie } from 'jts-cookie';
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
        Token.clearAllStates();
        return true;
    }

    // 清除所有的vuex状态
    public static clearAllStates() {
        ['', 'user/', 'project/', 'recharge/', 'withdraw/', 'transfer/', 'lock/', 'loan/', 'child/', 'transaction/', 'security/'].forEach(
            (item: string) => {
                store.commit(item + TYPES.CLEAR_STATES);
            }
        );
    }
}
