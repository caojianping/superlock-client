import Validator, { ValidationResult } from 'jpts-validator';
import { Urls, CaxiosType, CONSTANTS } from '@/ts/config';
import { Utils, Caxios } from '@/ts/common';
import {
    IPageParameters,
    IPointRecordPageParameters,
    PageResult,
    PointRecordModel,
    PointAccountModel,
    PointForm,
    TransferForm,
    PointInfo,
    TransferInfo
} from '@/ts/models';

export class PointService {
    // 验证上分信息
    public static validatePointInfo(
        pointForm: PointForm,
        isCode: boolean
    ): ValidationResult {
        if (!pointForm)
            return { status: false, data: { pointForm: '参数不可以为空' } };

        const key = 'point';
        let { accountId, coin, value, code } = pointForm,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'accountId', value: accountId },
            { required: true },
            { required: '上分账户ID不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'coin', value: coin },
            { required: true },
            { required: '上分币种不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'value', value: value },
            { required: true, min: 0 },
            { required: '上分数量不可以为空', min: '上分数量不可以小于0' }
        );
        if (isCode) {
            validator.addRule(
                key,
                { name: 'code', value: code },
                { required: true },
                { required: '验证码不可以为空' }
            );
        }
        return validator.execute(key);
    }

    // 验证转账信息
    public static validateTransferInfo(
        transferForm: TransferForm,
        isCode: boolean
    ): ValidationResult {
        if (!transferForm)
            return { status: false, data: { transferForm: '参数不可以为空' } };

        const key = 'transfer';
        let { fromId, toId, coin, value, code } = transferForm,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'fromId', value: fromId },
            { required: true },
            { required: '上分账户ID不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'toId', value: toId },
            { required: true },
            { required: '转账账户ID不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'coin', value: coin },
            { required: true },
            { required: '币种不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'value', value: value },
            { required: true, min: 0 },
            { required: '转账数量不可以为空', min: '转账数量不可以小于0' }
        );
        if (isCode) {
            validator.addRule(
                key,
                { name: 'code', value: code },
                { required: true },
                { required: '验证码不可以为空' }
            );
        }
        return validator.execute(key);
    }

    // 获取上分记录分页列表
    public async fetchPagePointRecords(
        parameters: IPageParameters<IPointRecordPageParameters>
    ): Promise<PageResult<PointRecordModel>> {
        let url = Urls.point.record.page,
            result = await Caxios.get<PageResult<PointRecordModel> | null>(
                {
                    url: `${url}?${Utils.buildPageParameters(parameters, [
                        'beginTime',
                        'endTime'
                    ])}`
                },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<PointRecordModel>(0, []);
        return result as PageResult<PointRecordModel>;
    }

    // 导出上分记录
    public async exportPointRecords(
        parameters: IPageParameters<IPointRecordPageParameters>
    ): Promise<string> {
        let url = Urls.point.record.export,
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

    // 获取上分信息
    public async fetchPointInfo(): Promise<Array<PointInfo>> {
        let result = await Caxios.get<Array<PointInfo> | null>(
            { url: Urls.point.record.pointInfo },
            CaxiosType.FullLoadingToken
        );
        return result || [];
    }

    // 设置上分信息
    public async setPointInfo(
        pointForm: PointForm,
        isCode: boolean = false
    ): Promise<boolean> {
        let result: ValidationResult = PointService.validatePointInfo(
            pointForm,
            isCode
        );
        if (!result.status)
            return Promise.reject(Utils.getFirstValue(result.data));

        let { code } = pointForm;
        delete pointForm.code;
        await Caxios.post<any>(
            {
                headers: isCode ? { [CONSTANTS.HEADER_CODE]: code } : {},
                url: Urls.point.record.setPoint,
                data: pointForm
            },
            CaxiosType.FullLoadingToken
        );
        return true;
    }

    // 获取转账信息
    public async fetchTransferInfo(): Promise<TransferInfo> {
        let result = await Caxios.get<any>(
            { url: Urls.point.record.transferInfo },
            CaxiosType.FullLoadingToken
        );
        return result || new TransferInfo();
    }

    // 设置转账信息
    public async setTransferInfo(
        transferForm: TransferForm,
        isCode: boolean = false
    ): Promise<boolean> {
        let result: ValidationResult = PointService.validateTransferInfo(
            transferForm,
            isCode
        );
        if (!result.status)
            return Promise.reject(Utils.getFirstValue(result.data));

        let { code } = transferForm;
        delete transferForm.code;
        await Caxios.post<any>(
            {
                headers: isCode ? { [CONSTANTS.HEADER_CODE]: code } : {},
                url: Urls.point.record.setTransfer,
                data: transferForm
            },
            CaxiosType.FullLoadingToken
        );
        return true;
    }

    // 获取系统账号分页列表
    public async fetchPagePointAccounts(
        parameters: IPageParameters<null>
    ): Promise<PageResult<PointAccountModel>> {
        let url = Urls.point.accounts,
            result = await Caxios.get<PageResult<PointAccountModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters)}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<PointAccountModel>(0, []);
        return result as PageResult<PointAccountModel>;
    }
}
