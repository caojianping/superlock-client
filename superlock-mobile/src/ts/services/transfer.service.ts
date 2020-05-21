import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import { TransferFormModel, TransferModel, TransferChildModel } from '@/ts/models';

import Locales from '@/locales';
const i18n = Locales.buildLocale();

export class TransferService {
    // 校验转账表单
    public static validateTransferForm(transferForm: TransferFormModel, isPassword: boolean = true): ValidationResult {
        if (!transferForm) return { status: false, data: { transferForm: '参数不可以为空' } };

        let key = 'transferForm',
            { toUid, quota, fundPasswd, maxAmount } = transferForm,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'maxAmount', value: maxAmount },
            { required: true, minExclude: 0 },
            { required: '可用余额不足', minExclude: '可用余额不足' }
        );
        validator.addRule(key, { name: 'toUid', value: toUid }, { required: true }, { required: '收款人UID不可以为空' });
        validator.addRule(
            key,
            { name: 'quota', value: !Utils.isNullOrUndefined(quota) ? Utils.digitConvert(quota) : quota },
            { required: true, minExclude: 0, max: maxAmount },
            {
                required: '转账金额不可以为空',
                minExclude: '转账金额不可以小于等于0',
                max: `转账金额不可以大于${maxAmount}`
            }
        );
        if (isPassword) {
            validator.addRule(key, { name: 'fundPasswd', value: fundPasswd }, { required: true }, { required: '资金密码不可以为空' });
        }
        return validator.execute(key);
    }

    // 执行转账
    public async executeTransfer(transferForm: TransferFormModel): Promise<boolean> {
        let result: ValidationResult = TransferService.validateTransferForm(transferForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { toUid, quota, fundPasswd, memo } = transferForm,
            parameters = Utils.buildParameters({
                toUid,
                quota,
                coin: 'BCB',
                fundPasswd: md5(fundPasswd),
                memo: memo || ''
            });
        await Caxios.post<any>({ url: `${Urls.transfer.execute}?${parameters}` }, CaxiosType.LoadingToken);
        return true;
    }

    // 获取转账列表
    public async fetchTransfers(pageNum: number = 1, pageSize: number = 10): Promise<Array<TransferModel>> {
        let result = await Caxios.get<Array<TransferModel> | null>(
            { url: `${Urls.transfer.list}?${Utils.buildParameters({ pageNum, pageSize })}` },
            pageNum === 1 ? CaxiosType.LoadingToken : CaxiosType.Token
        );
        return result || [];
    }

    // 获取转账下级列表
    public async fetchTransferChilds(keyword: string = '', pageNum: number = 1, pageSize: number = 10): Promise<Array<TransferChildModel>> {
        let result = await Caxios.get<Array<TransferChildModel> | null>(
            { url: `${Urls.transfer.childs}?${Utils.buildParameters({ nickName: keyword || '', pageNum, pageSize })}` },
            pageNum === 1 ? CaxiosType.LoadingToken : CaxiosType.Token
        );
        return result || [];
    }
}
