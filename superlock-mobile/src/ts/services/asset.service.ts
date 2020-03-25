import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { AssetStatsModel, EarningsStatsModel } from '@/ts/models';

export class AssetService {
    // 获取资产统计信息
    public async fetchAssetStats(): Promise<AssetStatsModel> {
        let result = await Caxios.get<AssetStatsModel | null>(
            { url: Urls.asset.assetStats },
            CaxiosType.Token
        );
        if (!result) return new AssetStatsModel();
        else return result as AssetStatsModel;
    }

    // 获取收益统计信息
    public async fetchEarningsStats(): Promise<EarningsStatsModel> {
        let result = await Caxios.get<EarningsStatsModel | null>(
            { url: Urls.asset.earningsStats },
            CaxiosType.Token
        );
        if (!result) return new EarningsStatsModel();
        else return result as EarningsStatsModel;
    }
}
