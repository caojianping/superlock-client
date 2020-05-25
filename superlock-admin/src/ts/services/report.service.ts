import Calculator from 'jts-calculator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import {
    IPageParameters,
    IRechargeReportPageParameters,
    IWithdrawReportPageParameters,
    ILockReportPageParameters,
    IExpendReportPageParameters,
    IUserReportPageParameters
} from '@/ts/interfaces';
import { PageResult, RechargeReportModel, WithdrawReportModel, LockReportModel, ExpendReportModel, UserReportModel } from '@/ts/models';

export class ReportService {
    // 获取充值报表
    public async fetchRechargeReports(parameters: IPageParameters<IRechargeReportPageParameters>): Promise<PageResult<RechargeReportModel>> {
        let url = Urls.report.recharge.list,
            result = await Caxios.get<PageResult<RechargeReportModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], [], 'yyyyMMdd')}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<RechargeReportModel>(0, []);
        else {
            let coinCode = parameters.conditions.coinCode,
                list = result.list;
            if (list && list.length > 0) {
                let totalAmount = 0,
                    totalGotAmount = 0,
                    totalCount = 0;
                list.forEach((item: any) => {
                    let amount = Utils.digitConvert(item.amount),
                        gotAmount = Utils.digitConvert(item.gotAmount),
                        count = Utils.digitConvert(item.totalCount);
                    if (coinCode) {
                        totalAmount = Calculator.add(totalAmount, amount, 6);
                        totalCount = Calculator.add(totalCount, count);
                    }
                    totalGotAmount = Calculator.add(totalGotAmount, gotAmount, 6);
                });

                let rechargeReport = new RechargeReportModel();
                rechargeReport.date = '合计';
                if (coinCode) {
                    rechargeReport.amount = totalAmount.toString();
                    rechargeReport.totalCount = totalCount;
                }
                rechargeReport.gotAmount = totalGotAmount.toString();
                list.push(rechargeReport);
            }
            return result;
        }
    }

    // 导出充值报表
    public async exportRechargeReports(parameters: IPageParameters<IRechargeReportPageParameters>): Promise<string> {
        let url = Urls.report.recharge.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], [], 'yyyyMMdd')}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取提现报表
    public async fetchWithdrawReports(parameters: IPageParameters<IWithdrawReportPageParameters>): Promise<PageResult<WithdrawReportModel>> {
        let url = Urls.report.withdraw.list,
            result = await Caxios.get<PageResult<WithdrawReportModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], [], 'yyyyMMdd')}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<WithdrawReportModel>(0, []);
        else {
            let list = result.list;
            if (list && list.length > 0) {
                let totalAmount = 0,
                    totalCount = 0;
                list.forEach((item: any) => {
                    let amount = Utils.digitConvert(item.amount),
                        count = Utils.digitConvert(item.totalCount);
                    totalAmount = Calculator.add(totalAmount, amount, 6);
                    totalCount = Calculator.add(totalCount, count);
                });

                let withdrawReport = new WithdrawReportModel();
                withdrawReport.date = '合计';
                withdrawReport.amount = totalAmount.toString();
                withdrawReport.totalCount = totalCount.toString();
                list.push(withdrawReport);
            }
            return result;
        }
    }

    // 导出提现报表
    public async exportWithdrawReports(parameters: IPageParameters<IWithdrawReportPageParameters>): Promise<string> {
        let url = Urls.report.withdraw.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], [], 'yyyyMMdd')}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取锁仓报表
    public async fetchLockReports(parameters: IPageParameters<ILockReportPageParameters>): Promise<PageResult<LockReportModel>> {
        let url = Urls.report.lock.list,
            result = await Caxios.get<PageResult<LockReportModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], [], 'yyyyMMdd')}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<LockReportModel>(0, []);
        else {
            let list = result.list;
            if (list && list.length > 0) {
                let totalAmount = 0,
                    totalValue = 0;
                list.forEach((item: any) => {
                    let amount = Utils.digitConvert(item.lockAmount),
                        value = Utils.digitConvert(item.lockValue);
                    totalAmount = Calculator.add(totalAmount, amount, 6);
                    totalValue = Calculator.add(totalValue, value, 6);
                });

                let lockReport = new LockReportModel();
                lockReport.date = '合计';
                lockReport.lockAmount = totalAmount.toString();
                lockReport.lockValue = totalValue.toString();
                list.push(lockReport);
            }
            return result;
        }
    }

    // 导出锁仓报表
    public async exportLockReports(parameters: IPageParameters<ILockReportPageParameters>): Promise<string> {
        let url = Urls.report.lock.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], [], 'yyyyMMdd')}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取支出报表
    public async fetchExpendReports(parameters: IPageParameters<IExpendReportPageParameters>): Promise<PageResult<ExpendReportModel>> {
        let url = Urls.report.expend.list,
            result = await Caxios.get<PageResult<ExpendReportModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['type'], 'yyyyMMdd')}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<ExpendReportModel>(0, []);
        else {
            let list = result.list;
            if (list && list.length > 0) {
                let totalDcAmount = 0,
                    totalBcbAmount = 0;
                result.list.forEach((item: any) => {
                    let dcAmount = Utils.digitConvert(item.dcAmount),
                        bcbAmount = Utils.digitConvert(item.bcbAmount);
                    totalDcAmount = Calculator.add(totalDcAmount, dcAmount, 6);
                    totalBcbAmount = Calculator.add(totalBcbAmount, bcbAmount, 6);
                });

                let expendReport = new ExpendReportModel();
                expendReport.date = '合计';
                expendReport.dcAmount = totalDcAmount.toString();
                expendReport.bcbAmount = totalBcbAmount.toString();
                result.list.push(expendReport);
            }
            return result;
        }
    }

    // 导出支出报表
    public async exportExpendReports(parameters: IPageParameters<IExpendReportPageParameters>): Promise<string> {
        let url = Urls.report.expend.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['type'], 'yyyyMMdd')}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取用户报表
    public async fetchUserReports(parameters: IPageParameters<IUserReportPageParameters>): Promise<PageResult<UserReportModel>> {
        let url = Urls.report.user.list,
            result = await Caxios.get<PageResult<UserReportModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['type'], 'yyyyMMdd')}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<UserReportModel>(0, []);
        else {
            let list = result.list;
            if (list && list.length > 0) {
                let totalCount = 0;
                result.list.forEach((item: any) => {
                    let count = Utils.digitConvert(item.count);
                    totalCount += count;
                });

                let userReport = new UserReportModel();
                userReport.date = '合计';
                userReport.count = totalCount.toString();
                result.list.push(userReport);
            }
            return result;
        }
    }

    // 导出用户报表
    public async exportUserReports(parameters: IPageParameters<IUserReportPageParameters>): Promise<string> {
        let url = Urls.report.user.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['type'], 'yyyyMMdd')}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }
}
