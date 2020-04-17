import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { IPageParameters, ILockPageParameters, IProjectPageParameters } from '@/ts/interfaces';
import { PageResult, LockModel, ProjectModel, AwardFormModel } from '@/ts/models';

export class LockService {
    // 构建奖励表单数据，利率需要进行%转换
    private _buildAwardForm(award: any): AwardFormModel {
        if (!award) return new AwardFormModel();

        award['promotionRate'] = Utils.digitPercent(award.promotionRate);
        award['pushStraightRate'] = Utils.digitPercent(award.pushStraightRate);
        if (!Utils.isNullOrUndefined(award.lockAmount)) {
            award['lockAmount'] = Number(award.lockAmount);
        }

        let dailySalesDto = award.dailySalesDto || [];
        if (dailySalesDto.length > 0) {
            dailySalesDto.forEach((dailySale: any) => {
                if (!Utils.isNullOrUndefined(dailySale.sales)) {
                    dailySale['sales'] = Number(dailySale.sales);
                }
                dailySale['rate'] = Utils.digitPercent(dailySale.rate);
            });
        }
        return award;
    }

    // 获取锁仓列表
    public async fetchLocks(parameters: IPageParameters<ILockPageParameters>): Promise<PageResult<LockModel>> {
        let url = Urls.lock.order.list,
            result = await Caxios.get<PageResult<LockModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<LockModel>(0, []);
        return result as PageResult<LockModel>;
    }

    // 导出锁仓列表
    public async exportLocks(parameters: IPageParameters<ILockPageParameters>): Promise<string> {
        let url = Urls.lock.order.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取项目列表
    public async fetchProjects(parameters: IPageParameters<IProjectPageParameters>): Promise<PageResult<ProjectModel>> {
        let url = Urls.lock.projects,
            result = await Caxios.get<PageResult<ProjectModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters)}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<ProjectModel>(0, []);
        return result as PageResult<ProjectModel>;
    }

    // 获取锁仓奖励信息
    public async fetchLockAward(): Promise<AwardFormModel> {
        let result = await Caxios.get<AwardFormModel | null>({ url: Urls.lock.awardInfo }, CaxiosType.FullLoadingToken);
        return this._buildAwardForm(result);
    }
}
