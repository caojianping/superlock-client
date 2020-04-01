import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import {
    ProjectStatsModel,
    AssetStatsModel,
    EarningsStatsModel
} from '@/ts/models';

export class ProjectService {
    // 获取资产统计信息
    public async fetchProjectStats(): Promise<ProjectStatsModel | null> {
        return await Caxios.get<ProjectStatsModel | null>(
            { url: Urls.project.projectStats },
            CaxiosType.Token
        );
    }

    // 获取资产统计信息
    public async fetchAssetStats(): Promise<AssetStatsModel | null> {
        return await Caxios.get<AssetStatsModel | null>(
            { url: Urls.project.assetStats },
            CaxiosType.Token
        );
    }

    // 获取收益统计信息
    public async fetchEarningsStats(): Promise<EarningsStatsModel | null> {
        return await Caxios.get<EarningsStatsModel | null>(
            { url: Urls.project.earningsStats },
            CaxiosType.Token
        );
    }
}
