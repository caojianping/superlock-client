import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { IPageParameters, ILoanPageParameters, ILoanInterestPageParameters } from '@/ts/interfaces';
import { PageResult, LoanModel, LoanInterestModel, LoanFormModel } from '@/ts/models';

export class LoanService {
    // 获取贷款列表
    public async fetchLoans(parameters: IPageParameters<ILoanPageParameters>): Promise<PageResult<LoanModel>> {
        let url = Urls.loan.order.list,
            result = await Caxios.get<PageResult<LoanModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters)}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<LoanModel>(0, []);
        return result as PageResult<LoanModel>;
    }

    // 获取贷款计息列表
    public async fetchLoanInterests(parameters: IPageParameters<ILoanInterestPageParameters>): Promise<PageResult<LoanInterestModel>> {
        let url = Urls.loan.interest.list,
            result = await Caxios.get<PageResult<LoanInterestModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters)}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<LoanInterestModel>(0, []);
        return result as PageResult<LoanInterestModel>;
    }

    // 设置贷款
    public async setLoan(loanForm: LoanFormModel): Promise<boolean> {
        return await Caxios.post<any>(
            {
                url: Urls.loan.setting,
                data: loanForm
            },
            CaxiosType.FullLoadingToken
        );
    }
}
