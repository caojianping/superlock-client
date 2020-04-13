import { Urls, CaxiosType } from '@/ts/config';
import { Utils, Caxios } from '@/ts/common';
import {
    IPageParameters,
    IWithdrawRecordPageParameters,
    IWithdrawTransferPageParameters,
    PageResult,
    WithdrawRecordModel,
    WithdrawTransferModel
} from '@/ts/models';

export class WithdrawService {
    // 获取提现记录分页列表
    public async fetchPageWithdrawRecords(
        parameters: IPageParameters<IWithdrawRecordPageParameters>
    ): Promise<PageResult<WithdrawRecordModel>> {
        let url = Urls.withdraw.record.page,
            result = await Caxios.get<PageResult<WithdrawRecordModel> | null>(
                {
                    url: `${url}?${Utils.buildPageParameters(parameters, [
                        'createBeginTime',
                        'createEndTime',
                        'finishBeginTime',
                        'finishEndTime'
                    ])}`
                },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<WithdrawRecordModel>(0, []);
        return result as PageResult<WithdrawRecordModel>;
    }

    // 导出提现记录
    public async exportWithdrawRecords(
        parameters: IPageParameters<IWithdrawRecordPageParameters>
    ): Promise<string> {
        let url = Urls.withdraw.record.export,
            result = await Caxios.get<string | null>(
                {
                    url: `${url}?${Utils.buildPageParameters(parameters, [
                        'createBeginTime',
                        'createEndTime',
                        'finishBeginTime',
                        'finishEndTime'
                    ])}`
                },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取转账记录分页列表
    public async fetchPageWithdrawTransfers(
        parameters: IPageParameters<IWithdrawTransferPageParameters>
    ): Promise<PageResult<WithdrawTransferModel>> {
        let url = Urls.withdraw.transfer.page,
            result = await Caxios.get<PageResult<WithdrawTransferModel> | null>(
                {
                    url: `${url}?${Utils.buildPageParameters(parameters, [
                        'beginTime',
                        'endTime'
                    ])}`
                },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<WithdrawTransferModel>(0, []);
        return result as PageResult<WithdrawTransferModel>;
    }

    // 导出转账记录
    public async exportWithdrawTransfers(
        parameters: IPageParameters<IWithdrawTransferPageParameters>
    ): Promise<string> {
        let url = Urls.withdraw.transfer.export,
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
