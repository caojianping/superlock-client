import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import {
    ProjectStatsModel,
    AssetStatsModel,
    EarningsStatsModel,
    PromoteRewardStatsModel
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

    // 获取推广奖励统计信息
    public async fetchPromoteRewardStats(): Promise<PromoteRewardStatsModel | null> {
        return await Caxios.get<PromoteRewardStatsModel | null>(
            { url: Urls.project.promoteRewardStats },
            CaxiosType.Token
        );
    }
}
