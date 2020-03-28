import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { RechargeCoinModel, RechargeModel } from '@/ts/models';

export class RechargeService {
    // 获取充值币种列表
    public async fetchRechargeCoins(): Promise<Array<RechargeCoinModel>> {
        let result = await Caxios.get<Array<RechargeCoinModel> | null>(
            { url: Urls.recharge.coins },
            CaxiosType.Token
        );
        return result || [];
    }

    // 获取充值地址
    public async fetchRechargeAddress(coin: string): Promise<string> {
        if (!coin) return Promise.reject('充值币种不可以为空');

        let result = await Caxios.get<string | null>(
            { url: `${Urls.recharge.address}?coin=${coin}` },
            CaxiosType.Token
        );
        return result || '';
    }

    // 获取充值列表
    public async fetchRecharges(
        pageNum: number = 1,
        pageSize: number = 10
    ): Promise<Array<RechargeModel>> {
        // let result = await Caxios.get<Array<RechargeModel> | null>(
        //     {
        //         url: `${Urls.recharge.page}?${Utils.buildParameters({
        //             pageNum,
        //             pageSize
        //         })}`
        //     },
        //     CaxiosType.Token
        // );
        // return result || [];

        return [
            {
                orderId: 'ewrdsr24432',
                txhash: 'tsdfsfdsgafs',
                createTime: '2020-02-18 12:12:12',
                payCoin: 'DC',
                payAmount: 100,
                exchangeRate: 0.02,
                gotAmount: 5,
                gotCoin: 'BCB',
                memo: '',
                statusRemark: '成功',
                status: 1,
                capitalType: '支出',
                balance: 100,
                balanceCoin: 'BCB'
            },
            {
                orderId: 'ewrdsr24432',
                txhash: 'tsdfsfdsgafs',
                createTime: '2020-02-18 12:12:12',
                payCoin: 'DC',
                payAmount: 100,
                exchangeRate: 0.02,
                gotAmount: 5,
                gotCoin: 'BCB',
                memo: '',
                statusRemark: '成功',
                status: 1,
                capitalType: '支出',
                balance: 100,
                balanceCoin: 'BCB'
            }
        ];
    }
}
