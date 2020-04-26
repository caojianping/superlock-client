import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import {
    IPageParameters,
    IRechargeReportPageParameters,
    ILockReportPageParameters,
    IExpendReportPageParameters,
    IUserReportPageParameters
} from '@/ts/interfaces';
import { PageResult, RechargeReportModel, LockReportModel, ExpendReportModel, UserReportModel } from '@/ts/models';

export class ReportService {
    // 获取充值报表
    public async fetchRechargeReports(parameters: IPageParameters<IRechargeReportPageParameters>): Promise<PageResult<RechargeReportModel>> {
        let url = Urls.report.recharge.list,
            result = await Caxios.get<PageResult<RechargeReportModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<RechargeReportModel>(0, []);
        return result as PageResult<RechargeReportModel>;
    }

    // 导出充值报表
    public async exportRechargeReports(parameters: IPageParameters<IRechargeReportPageParameters>): Promise<string> {
        let url = Urls.report.recharge.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取锁仓报表
    public async fetchLockReports(parameters: IPageParameters<ILockReportPageParameters>): Promise<PageResult<LockReportModel>> {
        let url = Urls.report.lock.list,
            result = await Caxios.get<PageResult<LockReportModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<LockReportModel>(0, []);
        return result as PageResult<LockReportModel>;
    }

    // 导出锁仓报表
    public async exportLockReports(parameters: IPageParameters<ILockReportPageParameters>): Promise<string> {
        let url = Urls.report.lock.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取支出报表
    public async fetchExpendReports(parameters: IPageParameters<IExpendReportPageParameters>): Promise<PageResult<ExpendReportModel>> {
        let url = Urls.report.expend.list,
            result = await Caxios.get<PageResult<ExpendReportModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<ExpendReportModel>(0, []);
        return result as PageResult<ExpendReportModel>;
    }

    // 导出支出报表
    public async exportExpendReports(parameters: IPageParameters<IExpendReportPageParameters>): Promise<string> {
        let url = Urls.report.expend.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取用户报表
    public async fetchUserReports(parameters: IPageParameters<IUserReportPageParameters>): Promise<PageResult<UserReportModel>> {
        let url = Urls.report.user.list,
            result = await Caxios.get<PageResult<UserReportModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<UserReportModel>(0, []);
        return result as PageResult<UserReportModel>;
    }

    // 导出用户报表
    public async exportUserReports(parameters: IPageParameters<IUserReportPageParameters>): Promise<string> {
        let url = Urls.report.user.list,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }
}
