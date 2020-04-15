import Utils from '@/ts/utils';
import { Urls, CaxiosType, ReviewType, ReviewStatus } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { IPageParameters, IFinancePageParameters } from '@/ts/interfaces';
import { PageResult, FinanceInterestModel, FinanceDirectModel, FinancePromoteModel, FinanceSaleModel } from '@/ts/models';

export class FinanceService {
    // 设置审核操作
    public async setReview(serial: string, type: ReviewType, status: ReviewStatus): Promise<boolean> {
        if (!serial) return Promise.reject('编号不可以为空');

        await Caxios.post<any>(
            {
                url: Urls.finance.review,
                data: {
                    serial: serial,
                    type: type,
                    status: status
                }
            },
            CaxiosType.PageLoadingToken
        );
        return true;
    }

    // 获取利息支出列表
    public async fetchFinanceInterests(parameters: IPageParameters<IFinancePageParameters>): Promise<PageResult<FinanceInterestModel>> {
        let url = Urls.finance.interest.list,
            result = await Caxios.get<PageResult<FinanceInterestModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginDate', 'endDate'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<FinanceInterestModel>(0, []);
        return result as PageResult<FinanceInterestModel>;
    }

    // 导出利息支出列表
    public async exportFinanceInterests(parameters: IPageParameters<IFinancePageParameters>): Promise<string> {
        let url = Urls.finance.interest.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginDate', 'endDate'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取直推奖励列表
    public async fetchFinanceDirects(parameters: IPageParameters<IFinancePageParameters>): Promise<PageResult<FinanceDirectModel>> {
        let url = Urls.finance.direct.list,
            result = await Caxios.get<PageResult<FinanceDirectModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginDate', 'endDate'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<FinanceDirectModel>(0, []);
        return result as PageResult<FinanceDirectModel>;
    }

    // 导出直推奖励列表
    public async exportFinanceDirects(parameters: IPageParameters<IFinancePageParameters>): Promise<string> {
        let url = Urls.finance.direct.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginDate', 'endDate'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取推广奖励列表
    public async fetchFinancePromotes(parameters: IPageParameters<IFinancePageParameters>): Promise<PageResult<FinancePromoteModel>> {
        let url = Urls.finance.promote.list,
            result = await Caxios.get<PageResult<FinancePromoteModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginDate', 'endDate'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<FinancePromoteModel>(0, []);
        return result as PageResult<FinancePromoteModel>;
    }

    // 导出推广奖励列表
    public async exportFinancePromotes(parameters: IPageParameters<IFinancePageParameters>): Promise<string> {
        let url = Urls.finance.promote.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginDate', 'endDate'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取日销奖励列表
    public async fetchFinanceSales(parameters: IPageParameters<IFinancePageParameters>): Promise<PageResult<FinanceSaleModel>> {
        let url = Urls.finance.sale.list,
            result = await Caxios.get<PageResult<FinanceSaleModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginDate', 'endDate'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<FinanceSaleModel>(0, []);
        return result as PageResult<FinanceSaleModel>;
    }

    // 导出日销奖励列表
    public async exportFinanceSales(parameters: IPageParameters<IFinancePageParameters>): Promise<string> {
        let url = Urls.finance.sale.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginDate', 'endDate'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }
}
