import { Cookie } from 'jts-cookie';
import { SessionStorage } from 'jts-storage';

import store from '@/store';
import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { TokenInfo } from '@/ts/models';

export class Token {
    // 设置tokenInfo
    public static setTokenInfo(tokenInfo: TokenInfo) {
        Cookie.setItem<TokenInfo>(CONSTANTS.CACHE_TOKEN_INFO, tokenInfo, CONSTANTS.EXPIRES);
    }

    // 获取tokenInfo
    public static getTokenInfo(): TokenInfo {
        return Cookie.getItem<TokenInfo>(CONSTANTS.CACHE_TOKEN_INFO) || new TokenInfo('', '');
    }

    // 移除tokenInfo
    public static removeTokenInfo(): boolean {
        Cookie.removeItem(CONSTANTS.CACHE_TOKEN_INFO);
        SessionStorage.removeItem(CONSTANTS.CACHE_NAME);
        SessionStorage.removeItem(CONSTANTS.CACHE_CODE);
        [
            'login/',
            'google/',
            'home/',
            'recharge/',
            'withdraw/',
            'lock/',
            'finance/',
            'loan/',
            'fund/',
            'risk/',
            'member/',
            'carrier/',
            'report/',
            'point/',
            'log/',
            'system/'
        ].forEach((item: string) => {
            store.commit(item + TYPES.CLEAR_STATES);
        });
        return true;
    }

    // 设置name
    public static setName(name: string) {
        SessionStorage.setItem<string>(CONSTANTS.CACHE_NAME, encodeURI(name));
    }

    // 获取code
    public static getName(): string {
        return SessionStorage.getItem<string>(CONSTANTS.CACHE_NAME) || '';
    }

    // 移除code
    public static removeName(): boolean {
        return SessionStorage.removeItem(CONSTANTS.CACHE_NAME);
    }

    // 设置code
    public static setCode(code: string) {
        SessionStorage.setItem<string>(CONSTANTS.CACHE_CODE, code);
    }

    // 获取code
    public static getCode(): string {
        return SessionStorage.getItem<string>(CONSTANTS.CACHE_CODE) || '';
    }

    // 移除code
    public static removeCode(): boolean {
        return SessionStorage.removeItem(CONSTANTS.CACHE_CODE);
    }
}
