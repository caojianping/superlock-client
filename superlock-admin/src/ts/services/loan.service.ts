import { Urls, CaxiosType } from '@/ts/config';
import { Utils, Caxios } from '@/ts/common';
import {
    IPageParameters,
    ILoanRecordPageParameters,
    ILoanInterestPageParameters,
    PageResult,
    LoanRecordModel,
    LoanInterestModel,
    LoanForm
} from '@/ts/models';

export class LoanService {
    // 获取贷款记录分页列表
    public async fetchPageLoanRecords(
        parameters: IPageParameters<ILoanRecordPageParameters>
    ): Promise<PageResult<LoanRecordModel>> {
        let url = Urls.loan.record.page,
            result = await Caxios.get<PageResult<LoanRecordModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters)}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<LoanRecordModel>(0, []);
        return result as PageResult<LoanRecordModel>;
    }

    // 获取贷款计息分页列表
    public async fetchPageLoanInterests(
        parameters: IPageParameters<ILoanInterestPageParameters>
    ): Promise<PageResult<LoanRecordModel>> {
        let url = Urls.loan.interest.page,
            result = await Caxios.get<PageResult<LoanInterestModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters)}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<LoanInterestModel>(0, []);
        return result as PageResult<LoanInterestModel>;
    }

    // 设置贷款
    public async setLoan(loanForm: LoanForm): Promise<boolean> {
        return await Caxios.post<any>(
            {
                url: Urls.loan.setting,
                data: loanForm
            },
            CaxiosType.FullLoadingToken
        );
    }
}
