import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { RechargeCoinModel, RechargeModel } from '@/ts/models';

export class RechargeService {
    // 获取充值币种列表
    public async fetchRechargeCoins(isLoading: boolean = false): Promise<Array<RechargeCoinModel>> {
        let result = await Caxios.get<Array<RechargeCoinModel> | null>(
            { url: Urls.recharge.coins },
            isLoading ? CaxiosType.LoadingToken : CaxiosType.Token
        );
        return result || [];
    }

    // 获取充值地址
    public async fetchRechargeAddress(coin: string): Promise<string> {
        if (!coin) return Promise.reject('充值币种不可以为空');

        let result = await Caxios.get<string | null>({ url: `${Urls.recharge.address}?coin=${coin}` }, CaxiosType.Token);
        return result || '';
    }

    // 获取充值列表
    public async fetchRecharges(pageNum: number = 1, pageSize: number = 10): Promise<Array<RechargeModel>> {
        let result = await Caxios.get<Array<RechargeModel> | null>(
            {
                url: `${Urls.recharge.list}?${Utils.buildParameters({
                    pageNum,
                    pageSize
                })}`
            },
            pageNum === 1 ? CaxiosType.LoadingToken : CaxiosType.Token
        );
        return result || [];
    }

    // 获取最小充值金额
    public async fetchMinAmount(coin: string): Promise<number> {
        let result = await Caxios.get<any>({ url: `${Urls.recharge.minAmount}?coin=${coin}` }, CaxiosType.Token);
        return Number(result);
    }
}
