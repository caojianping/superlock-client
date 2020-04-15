import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CONSTANTS, CaxiosType, OperationType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { IPageParameters, IRechargePageParameters } from '@/ts/interfaces';
import { PageResult, RechargeModel, RechargePoundageModel } from '@/ts/models';

export class RechargeService {
    // 验证手续费设置
    public static validatePoundage(poundage: RechargePoundageModel, isCode: boolean, type: OperationType): ValidationResult {
        if (!poundage) return { status: false, data: { projectForm: '参数不可以为空' } };

        const key = 'poundage';
        let { tokenType, type: ptype, feeToken, chargeRate, code } = poundage,
            validator = new Validator();
        validator.addRule(key, { name: 'tokenType', value: tokenType }, { required: true }, { required: '交易币种不可以为空' });
        if (type === OperationType.Add) {
            validator.addRule(key, { name: 'ptype', value: ptype }, { required: true }, { required: '交易类型不可以为空' });
            validator.addRule(key, { name: 'feeToken', value: feeToken }, { required: true }, { required: '手续币种不可以为空' });
        }
        validator.addRule(
            key,
            { name: 'chargeRate', value: chargeRate },
            { required: true, min: 0, max: 100 },
            {
                required: '手续费比例不可以为空',
                min: '手续费比例不可以小于0',
                max: '手续费比例不可以大于100'
            }
        );
        if (isCode) {
            validator.addRule(key, { name: 'code', value: code }, { required: true }, { required: '验证码不可以为空' });
        }
        return validator.execute(key);
    }

    // 获取充值列表
    public async fetchRecharges(parameters: IPageParameters<IRechargePageParameters>): Promise<PageResult<RechargeModel>> {
        let url = Urls.recharge.order.list,
            result = await Caxios.get<PageResult<RechargeModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<RechargeModel>(0, []);
        return result as PageResult<RechargeModel>;
    }

    // 导出充值列表
    public async exportRecharges(parameters: IPageParameters<IRechargePageParameters>): Promise<string> {
        let url = Urls.recharge.order.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取手续费设置列表
    public async fetchRechargePoundages(): Promise<Array<RechargePoundageModel>> {
        let result = await Caxios.get<Array<RechargePoundageModel> | null>({ url: Urls.recharge.poundage.list }, CaxiosType.PageLoadingToken);
        if (!result) return [];
        return result as Array<RechargePoundageModel>;
    }

    // 添加手续费设置
    public async addRechargePoundage(poundage: RechargePoundageModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = RechargeService.validatePoundage(poundage, isCode, OperationType.Add);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { tokenType, type, feeToken, chargeRate, code } = poundage;
        delete poundage.code;
        await Caxios.post<any>(
            {
                headers: isCode ? { [CONSTANTS.HEADER_CODE]: code } : {},
                url: Urls.recharge.poundage.add,
                data: {
                    tokenType,
                    type,
                    feeToken,
                    chargeRate: (chargeRate / 100).toFixed(4)
                }
            },
            CaxiosType.FullLoadingToken
        );
        return true;
    }

    // 更新手续费设置
    public async updateRechargePoundage(poundage: RechargePoundageModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = RechargeService.validatePoundage(poundage, isCode, OperationType.Edit);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { tokenType, chargeRate, code } = poundage;
        delete poundage.code;
        await Caxios.post<any>(
            {
                headers: isCode ? { [CONSTANTS.HEADER_CODE]: code } : {},
                url: Urls.recharge.poundage.update,
                data: {
                    tokenType,
                    chargeRate: (chargeRate / 100).toFixed(4)
                }
            },
            CaxiosType.FullLoadingToken
        );
        return true;
    }
}
