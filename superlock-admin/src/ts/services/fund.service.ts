import { Urls, CaxiosType } from '@/ts/config';
import { Utils, Caxios } from '@/ts/common';
import {
    IPageParameters,
    IFundRecordPageParameters,
    PageResult,
    FundRecordModel
} from '@/ts/models';

export class FundService {
    // 获取资金记录分页列表
    public async fetchPageFundRecords(
        parameters: IPageParameters<IFundRecordPageParameters>
    ): Promise<PageResult<FundRecordModel>> {
        let url = Urls.fund.record.page,
            result = await Caxios.get<PageResult<FundRecordModel> | null>(
                {
                    url: `${url}?${Utils.buildPageParameters(parameters, [
                        'beginTime',
                        'endTime'
                    ])}`
                },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<FundRecordModel>(0, []);
        return result as PageResult<FundRecordModel>;
    }

    // 导出资金记录
    public async exportFundRecords(
        parameters: IPageParameters<IFundRecordPageParameters>
    ): Promise<string> {
        let url = Urls.fund.record.export,
            result = await Caxios.get<string | null>(
                {
                    url: `${url}?${Utils.buildPageParameters(parameters, [
                        'beginTime',
                        'endTime'
                    ])}`
                },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }
}
