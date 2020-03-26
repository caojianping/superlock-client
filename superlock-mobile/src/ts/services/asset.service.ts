import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { AssetStatsModel, EarningsStatsModel } from '@/ts/models';

export class AssetService {
    // 获取资产统计信息
    public async fetchAssetStats(): Promise<AssetStatsModel | null> {
        return await Caxios.get<AssetStatsModel | null>(
            { url: Urls.asset.assetStats },
            CaxiosType.Token
        );
    }

    // 获取收益统计信息
    public async fetchEarningsStats(): Promise<EarningsStatsModel | null> {
        return await Caxios.get<EarningsStatsModel | null>(
            { url: Urls.asset.earningsStats },
            CaxiosType.Token
        );
    }
}
