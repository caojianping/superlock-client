import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { IPageParameters, IFundPageParameters } from '@/ts/interfaces';
import { PageResult, FundModel } from '@/ts/models';

export class FundService {
    // 获取资金列表
    public async fetchFunds(parameters: IPageParameters<IFundPageParameters>): Promise<PageResult<FundModel>> {
        let url = Urls.fund.record.list,
            result = await Caxios.get<PageResult<FundModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['accountName', 'orderType'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<FundModel>(0, []);
        return result as PageResult<FundModel>;
    }

    // 导出资金列表
    public async exportFunds(parameters: IPageParameters<IFundPageParameters>): Promise<string> {
        let url = Urls.fund.record.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['accountName', 'orderType'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }
}
