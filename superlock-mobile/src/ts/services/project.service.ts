import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import {
    ProjectStatsModel,
    AssetStatsModel,
    EarningsStatsModel,
    PromoteRewardStatsModel,
    PromoteRewardPushModel,
    PromoteRewardLockModel,
    PromoteRewardUnlockModel,
    PromoteRewardSaleModel
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
            { url: Urls.project.promoteReward.stats },
            CaxiosType.Token
        );
    }

    // 获取直推奖励分页列表
    public async fetchPromoteRewardPushs(
        pageNum: number,
        pageSize: number
    ): Promise<Array<PromoteRewardPushModel>> {
        let result = await Caxios.get<Array<PromoteRewardPushModel> | null>(
            {
                url: `${
                    Urls.project.promoteReward.pushPage
                }?${Utils.buildParameters({ pageNum, pageSize })}`
            },
            pageNum === 1 ? CaxiosType.LoadingToken : CaxiosType.Token
        );
        return result || [];
    }

    // 获取锁仓奖励分页列表
    public async fetchPromoteRewardLocks(
        pageNum: number,
        pageSize: number
    ): Promise<Array<PromoteRewardLockModel>> {
        let result = await Caxios.get<Array<PromoteRewardLockModel> | null>(
            {
                url: `${
                    Urls.project.promoteReward.lockPage
                }?${Utils.buildParameters({ pageNum, pageSize })}`
            },
            pageNum === 1 ? CaxiosType.LoadingToken : CaxiosType.Token
        );
        return result || [];
    }

    // 获取解锁奖励分页列表
    public async fetchPromoteRewardUnlocks(
        pageNum: number,
        pageSize: number
    ): Promise<Array<PromoteRewardUnlockModel>> {
        let result = await Caxios.get<Array<PromoteRewardUnlockModel> | null>(
            {
                url: `${
                    Urls.project.promoteReward.unlockPage
                }?${Utils.buildParameters({ pageNum, pageSize })}`
            },
            pageNum === 1 ? CaxiosType.LoadingToken : CaxiosType.Token
        );
        return result || [];
    }

    // 获取日销达标奖励分页列表
    public async fetchPromoteRewardSales(
        pageNum: number,
        pageSize: number
    ): Promise<Array<PromoteRewardSaleModel>> {
        let result = await Caxios.get<Array<PromoteRewardSaleModel> | null>(
            {
                url: `${
                    Urls.project.promoteReward.salePage
                }?${Utils.buildParameters({ pageNum, pageSize })}`
            },
            pageNum === 1 ? CaxiosType.LoadingToken : CaxiosType.Token
        );
        return result || [];
    }
}
