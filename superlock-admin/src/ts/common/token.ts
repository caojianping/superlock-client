import { Cookie } from 'jts-cookie';
import { SessionStorage } from 'jts-storage';

import store from '@/store';
import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { TokenInfo } from '@/ts/models';

export class Token {
    // 设置tokenInfo
    public static setTokenInfo(tokenInfo: TokenInfo) {
        Cookie.setItem<TokenInfo>(CONSTANTS.TOKEN_INFO, tokenInfo, CONSTANTS.EXPIRES);
    }

    // 获取tokenInfo
    public static getTokenInfo(): TokenInfo {
        return Cookie.getItem<TokenInfo>(CONSTANTS.TOKEN_INFO) || new TokenInfo('', '');
    }

    // 移除tokenInfo
    public static removeTokenInfo(): boolean {
        Cookie.removeItem(CONSTANTS.TOKEN_INFO);
        [
            'login/',
            'google/',
            'home/',
            'recharge/',
            'withdraw/',
            'transfer/',
            'lock/',
            'finance/',
            'loan/',
            'fund/',
            'risk/',
            'member/',
            'carrier/',
            'point/',
            'system/'
        ].forEach((item: string) => {
            store.commit(item + TYPES.CLEAR_STATES);
        });
        return true;
    }


    // 设置gacode
    public static setCode(code: string) {
        SessionStorage.setItem<string>(CONSTANTS.HEADER_CODE, code);
    }

    // 获取gacode
    public static getCode(): string {
        return SessionStorage.getItem<string>(CONSTANTS.HEADER_CODE) || '';
    }

    // 移除gacode
    public static removeCode(): boolean {
        return SessionStorage.removeItem(CONSTANTS.HEADER_CODE);
    }


    
}
