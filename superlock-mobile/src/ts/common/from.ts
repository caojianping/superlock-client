import { SessionStorage } from 'jts-storage';
import { CONSTANTS } from '@/ts/config';

export class From {
    // 设置充值页面来源
    public static setRechargeFrom(from: string) {
        SessionStorage.setItem<string>(CONSTANTS.RECHARGE_FROM, from);
    }

    // 获取充值页面来源
    public static getRechargeFrom(): string {
        return SessionStorage.getItem<string>(CONSTANTS.RECHARGE_FROM) || '';
    }

    // 移除充值页面来源
    public static removeRechargeFrom(): boolean {
        SessionStorage.removeItem(CONSTANTS.RECHARGE_FROM);
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
