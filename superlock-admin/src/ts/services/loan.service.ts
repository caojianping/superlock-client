import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { IPageParameters, ILoanPageParameters } from '@/ts/interfaces';
import { PageResult, LoanModel, LoanInterestModel, LoanInfoModel } from '@/ts/models';

export class LoanService {
    // 验证贷款设置信息
    public static validateLoanInfo(loanInfo: LoanInfoModel): ValidationResult {
        if (!loanInfo) return { status: false, data: { loanInfo: '参数不可以为空' } };

        let key = 'loanInfo',
            { loanRate, loanProportion, loanMinValue } = loanInfo,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'loanRate', value: loanRate },
            { required: true, min: 0, max: 100 },
            {
                required: '贷款年利率不可以为空',
                min: '贷款年利率不可以小于0',
                max: '贷款年利率不可以大于1'
            }
        );
        validator.addRule(
            key,
            { name: 'loanProportion', value: loanProportion },
            { required: true, min: 0, max: 100 },
            {
                required: '最大贷款比例不可以为空',
                min: '最大贷款比例不可以小于0',
                max: '最大贷款比例不可以大于1'
            }
        );
        validator.addRule(
            key,
            { name: 'loanMinValue', value: loanMinValue },
            { required: true, minExclude: 0 },
            {
                required: '最小贷款价值不可以为空',
                minExclude: '最小贷款价值不可以小于等于0'
            }
        );
        return validator.execute(key);
    }

    // 获取贷款列表
    public async fetchLoans(parameters: IPageParameters<ILoanPageParameters>): Promise<PageResult<LoanModel>> {
        let url = Urls.loan.order.list,
            result = await Caxios.get<PageResult<LoanModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<LoanModel>(0, []);
        return result as PageResult<LoanModel>;
    }

    // 导出贷款列表
    public async exportLoans(parameters: IPageParameters<ILoanPageParameters>): Promise<string> {
        let url = Urls.loan.order.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取贷款计息列表
    public async fetchLoanInterests(parameters: IPageParameters<ILoanPageParameters>): Promise<PageResult<LoanInterestModel>> {
        let url = Urls.loan.interest.list,
            result = await Caxios.get<PageResult<LoanInterestModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<LoanInterestModel>(0, []);
        return result as PageResult<LoanInterestModel>;
    }

    // 导出贷款计息列表
    public async exportLoanInterests(parameters: IPageParameters<ILoanPageParameters>): Promise<string> {
        let url = Urls.loan.interest.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取贷款设置信息
    public async fetchLoanInfo(): Promise<LoanInfoModel> {
        let result = await Caxios.get<LoanInfoModel | null>({ url: Urls.loan.setting.info }, CaxiosType.FullLoadingToken),
            loanInfo = new LoanInfoModel();
        if (result) {
            loanInfo.loanRate = Utils.digitConvert(result.loanRate);
            loanInfo.loanProportion = Utils.digitConvert(result.loanProportion);
            loanInfo.loanMinValue = Utils.digitConvert(result.loanMinValue);
        }
        return loanInfo;
    }

    // 设置贷款信息
    public async setLoanInfo(loanInfo: LoanInfoModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = LoanService.validateLoanInfo(loanInfo);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        return await Caxios.post<any>(
            {
                url: Urls.loan.setting.set,
                data: loanInfo
            },
            CaxiosType.FullLoadingToken
        );
    }
}
