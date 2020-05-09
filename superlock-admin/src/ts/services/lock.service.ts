import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType, OperationType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { IPageParameters, ILockPageParameters, IProjectPageParameters, ISelectOption } from '@/ts/interfaces';
import { PageResult, LockModel, ProjectModel, ProjectFormModel, AwardFormModel, AwardDailySaleModel } from '@/ts/models';

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

    // 验证项目表单
    public static validateProjectForm(projectForm: ProjectFormModel, type: OperationType): ValidationResult {
        if (!projectForm) return { status: false, data: { projectForm: '参数不可以为空' } };

        let key = 'project',
            { id, memo, length, quota, rate, pushRate, enable, originQuota, originRate } = projectForm,
            validator = new Validator();
        validator.addRule(key, { name: 'memo', value: memo }, { required: true }, { required: '项目名称不可以为空' });
        if (type === OperationType.Add) {
            validator.addRule(
                key,
                { name: 'length', value: length },
                { required: true, min: 0 },
                { required: '项目周期不可以为空', min: '项目周期不可以小于0' }
            );
            validator.addRule(
                key,
                { name: 'quota', value: quota },
                { required: true, min: 0 },
                {
                    required: '项目总额度不可以为空',
                    min: '项目总额度不可以小于0'
                }
            );
            validator.addRule(
                key,
                { name: 'rate', value: rate },
                { required: true, min: 0, max: 100 },
                {
                    required: '锁仓利率不可以为空',
                    min: '锁仓利率不可以小于0',
                    max: '锁仓利率不可以大于100'
                }
            );
            validator.addRule(
                key,
                { name: 'pushRate', value: pushRate },
                { required: true, min: 0, max: 100 },
                {
                    required: '直推奖励利率不可以为空',
                    min: '直推奖励利率不可以小于0',
                    max: '直推奖励利率不可以大于100'
                }
            );
        } else if (type === OperationType.Edit) {
            validator.addRule(key, { name: 'id', value: id }, { required: true }, { required: '项目编号不可以为空' });
            validator.addRule(
                key,
                { name: 'quota', value: quota },
                { required: true, min: originQuota },
                {
                    required: '项目总额度不可以为空',
                    min: `项目总额度不可以小于${originQuota}`
                }
            );
            validator.addRule(
                key,
                { name: 'rate', value: rate },
                { required: true, min: originRate, max: 100 },
                {
                    required: '锁仓利率不可以为空',
                    min: `锁仓利率不可以小于${originRate}`,
                    max: '锁仓利率不可以大于100'
                }
            );
            validator.addRule(
                key,
                { name: 'pushRate', value: pushRate },
                { required: true, min: 0, max: 100 },
                {
                    required: '直推奖励利率不可以为空',
                    min: '直推奖励利率不可以小于0',
                    max: '直推奖励利率不可以大于100'
                }
            );
            validator.addRule(key, { name: 'enable', value: enable }, { required: true }, { required: '项目状态不可以为空' });
        }
        return validator.execute(key);
    }

    // 获取锁仓列表
    public async fetchLocks(parameters: IPageParameters<ILockPageParameters>): Promise<PageResult<LockModel>> {
        let url = Urls.lock.order.list,
            result = await Caxios.get<PageResult<LockModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['carrierName'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<LockModel>(0, []);
        return result as PageResult<LockModel>;
    }

    // 导出锁仓列表
    public async exportLocks(parameters: IPageParameters<ILockPageParameters>): Promise<string> {
        let url = Urls.lock.order.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['carrierName'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取项目列表
    public async fetchProjects(parameters: IPageParameters<IProjectPageParameters>): Promise<PageResult<ProjectModel>> {
        let url = Urls.lock.project.list,
            result = await Caxios.get<PageResult<ProjectModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters)}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<ProjectModel>(0, []);
        return result as PageResult<ProjectModel>;
    }

    // 创建项目
    public async crateProject(projectForm: ProjectFormModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = LockService.validateProjectForm(projectForm, OperationType.Add);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { memo, length, quota, rate, pushRate } = projectForm;
        await Caxios.post<any>(
            {
                url: Urls.lock.project.create,
                data: {
                    memo,
                    length,
                    quota: String(quota),
                    rate: (rate / 100).toFixed(4),
                    pushRate: (pushRate / 100).toFixed(4)
                }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }

    // 更新项目
    public async updateProject(projectForm: ProjectFormModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = LockService.validateProjectForm(projectForm, OperationType.Edit);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { id, memo, quota, rate, pushRate, enable } = projectForm;
        await Caxios.post<any>(
            {
                url: Urls.lock.project.update,
                data: {
                    id,
                    memo,
                    quota: String(quota),
                    rate: (rate / 100).toFixed(4),
                    pushRate: (pushRate / 100).toFixed(4),
                    enable
                }
            },
            CaxiosType.FullLoadingToken
        );
        return true;
    }

    // 获取锁仓奖励信息
    public async fetchLockAward(): Promise<AwardFormModel> {
        let result = await Caxios.get<AwardFormModel | null>({ url: Urls.lock.award.info }, CaxiosType.FullLoadingToken);
        return this._buildAwardForm(result);
    }

    // 更新锁仓奖励信息
    public async updateLockAward(awardForm: AwardFormModel, isCode: boolean = false): Promise<boolean> {
        if (!awardForm) return Promise.reject('参数不可以为空');

        let key = 'award',
            { promotionRate, pushStraightRate, dailySalesDto, originPromotionRate } = awardForm,
            saleCount = (dailySalesDto || []).length,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'promotionRate', value: promotionRate },
            { required: true, min: originPromotionRate, max: 100 },
            {
                required: '推广解锁利率不可以为空',
                min: `推广解锁利率不可以小于${originPromotionRate}`,
                max: '推广解锁利率不可以大于100'
            }
        );
        validator.addRule(key, { name: 'saleCount', value: saleCount }, { min: 1 }, { min: '日销奖励条目不可以小于等于0' });
        dailySalesDto.forEach((dailySale: AwardDailySaleModel, index: number) => {
            let { sales, rate } = dailySale,
                cindex = index + 1;
            validator.addRule(
                key,
                { name: 'sales' + cindex, value: sales },
                { required: true, min: 0 },
                {
                    required: `第${cindex}条日销奖励的达标日销数量不可以为空`,
                    min: `第${cindex}条日销奖励的达标日销数量不可以小于0`
                }
            );
            validator.addRule(
                key,
                { name: 'rate' + cindex, value: rate },
                { required: true, min: 0, max: 100 },
                {
                    required: `第${cindex}条日销奖励的达标返奖利率不可以为空`,
                    min: `第${cindex}条日销奖励的达标返奖利率不可以小于0`,
                    max: `第${cindex}条日销奖励的达标返奖利率不可以大于100`
                }
            );
        });

        let result: ValidationResult = validator.execute(key);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        await Caxios.post<any>(
            {
                url: Urls.lock.award.update,
                data: {
                    promotionRate: (promotionRate / 100).toFixed(4),
                    pushStraightRate: (pushStraightRate / 100).toFixed(4),
                    // lockAmount: String(lockAmount),
                    dailySalesDto: dailySalesDto.map((dailySale: AwardDailySaleModel) => ({
                        sales: String(dailySale.sales),
                        rate: (dailySale.rate / 100).toFixed(4)
                    }))
                }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }

    // 获取锁仓期限列表
    public async fetchLockCycles(): Promise<Array<ISelectOption>> {
        let result = await Caxios.get<any>({ url: Urls.lock.cycles }, CaxiosType.Token);
        return (result || []).map((item: any) => {
            let unit = ['天', '月', '年'][item.unit - 1];
            return { label: item.length + unit, value: item.length + '_' + item.unit };
        });
    }
}
