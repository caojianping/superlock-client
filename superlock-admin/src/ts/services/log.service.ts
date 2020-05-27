import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { IPageParameters, IUserLogPageParameters, ISystemLogPageParameters } from '@/ts/interfaces';
import { PageResult, UserLogModel, SystemLogModel } from '@/ts/models';

export class LogService {
    // 获取用户日志列表
    public async fetchUserLogs(parameters: IPageParameters<IUserLogPageParameters>): Promise<PageResult<UserLogModel>> {
        let url = Urls.log.user.list,
            result = await Caxios.get<PageResult<UserLogModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<UserLogModel>(0, []);
        return result as PageResult<UserLogModel>;
    }

    // 导出用户日志列表
    public async exportUserLogs(parameters: IPageParameters<IUserLogPageParameters>): Promise<string> {
        let url = Urls.log.user.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取系统日志列表
    public async fetchSystemLogs(parameters: IPageParameters<ISystemLogPageParameters>): Promise<PageResult<SystemLogModel>> {
        let url = Urls.log.system.list,
            result = await Caxios.get<PageResult<SystemLogModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['userName'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<SystemLogModel>(0, []);
        return result as PageResult<SystemLogModel>;
    }

    // 导出系统日志列表
    public async exportSystemLogs(parameters: IPageParameters<ISystemLogPageParameters>): Promise<string> {
        let url = Urls.log.system.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['userName'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }
}
