import Calculator from 'jts-calculator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { IPageParameters, IWithdrawPageParameters, ITransferPageParameters } from '@/ts/interfaces';
import { PageResult, WithdrawModel, TransferModel } from '@/ts/models';

export class WithdrawService {
    // 获取提现列表
    public async fetchWithdraws(parameters: IPageParameters<IWithdrawPageParameters>): Promise<PageResult<WithdrawModel>> {
        let url = Urls.withdraw.order.list,
            result = await Caxios.get<PageResult<WithdrawModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['createBeginTime', 'createEndTime', 'finishBeginTime', 'finishEndTime'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<WithdrawModel>(0, []);
        else {
            let list = result.list;
            if (list && list.length > 0) {
                let totalAmount = 0;
                list.forEach((item: any) => {
                    let amount = isNaN(Number(item.amount)) ? 0 : Number(item.amount);
                    totalAmount = Calculator.add(totalAmount, amount, 6);
                });

                let withdraw = new WithdrawModel();
                withdraw.serial = '合计';
                withdraw.amount = totalAmount.toString();
                list.push(withdraw);
            }
            return result;
        }
    }

    // 导出提现列表
    public async exportWithdraws(parameters: IPageParameters<IWithdrawPageParameters>): Promise<string> {
        let url = Urls.withdraw.order.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['createBeginTime', 'createEndTime', 'finishBeginTime', 'finishEndTime'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取转账列表
    public async fetchTransfers(parameters: IPageParameters<ITransferPageParameters>): Promise<PageResult<TransferModel>> {
        let url = Urls.withdraw.transfer.list,
            result = await Caxios.get<PageResult<TransferModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<TransferModel>(0, []);
        return result as PageResult<TransferModel>;
    }

    // 导出转账列表
    public async exportTransfers(parameters: IPageParameters<ITransferPageParameters>): Promise<string> {
        let url = Urls.withdraw.transfer.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }
}
