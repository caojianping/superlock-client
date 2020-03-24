import { Cookie } from 'jts-cookie';
import { CONSTANTS } from '@/ts/config';
import { TokenInfo } from '@/ts/models';

export class Token {
    // 设置tokenInfo
    public static setTokenInfo(tokenInfo: TokenInfo) {
        Cookie.setItem<TokenInfo>(
            CONSTANTS.TOKEN_INFO,
            tokenInfo,
            tokenInfo.pttl * 1000
        );
    }

    // 获取tokenInfo
    public static getTokenInfo(): TokenInfo {
        return (
            Cookie.getItem<TokenInfo>(CONSTANTS.TOKEN_INFO) || new TokenInfo()
        );
    }

    // 移除tokenInfo
    public static removeTokenInfo(): boolean {
        return Cookie.removeItem(CONSTANTS.TOKEN_INFO);
    }
}
