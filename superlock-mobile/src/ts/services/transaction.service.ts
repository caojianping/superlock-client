import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { TransactionTypeModel, TransactionModel } from '@/ts/models';

export class TransactionService {
    // 获取交易类型列表
    public async fetchTransactionTypes(): Promise<Array<TransactionTypeModel>> {
        let result = await Caxios.get<Array<TransactionTypeModel> | null>(
            { url: Urls.transaction.types },
            CaxiosType.Token
        );
        return result || [];
    }

    // 获取交易分页列表
    public async fetchTransactions(
        type: number,
        pageNum: number,
        pageSize: number
    ): Promise<Array<TransactionModel>> {
        let parameters = Utils.buildParameters({ type, pageNum, pageSize }),
            result = await Caxios.get<Array<TransactionModel> | null>(
                { url: `${Urls.transaction.page}?${parameters}` },
                CaxiosType.Token
            );
        return result || [];
    }
}
