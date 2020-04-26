import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType, OperationType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { IPageParameters, IRechargePageParameters, IRechargeAddressPageParameters } from '@/ts/interfaces';
import { PageResult, RechargeModel, RechargePoundageModel, RechargeAddressModel } from '@/ts/models';

export class RechargeService {
    // 验证手续费设置
    public static validatePoundage(poundage: RechargePoundageModel, type: OperationType): ValidationResult {
        if (!poundage) return { status: false, data: { projectForm: '参数不可以为空' } };

        let key = 'poundage',
            { tokenType, type: ptype, feeToken, chargeRate } = poundage,
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

    // 获取手续费列表
    public async fetchRechargePoundages(): Promise<Array<RechargePoundageModel>> {
        let result = await Caxios.get<Array<RechargePoundageModel> | null>({ url: Urls.recharge.poundage.list }, CaxiosType.PageLoadingToken);
        if (!result) return [];
        return result as Array<RechargePoundageModel>;
    }

    // 添加手续费
    public async addRechargePoundage(poundage: RechargePoundageModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = RechargeService.validatePoundage(poundage, OperationType.Add);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { tokenType, type, feeToken, chargeRate } = poundage;
        await Caxios.post<any>(
            {
                url: Urls.recharge.poundage.add,
                data: {
                    tokenType,
                    type,
                    feeToken,
                    chargeRate: (chargeRate / 100).toFixed(4)
                }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }

    // 更新手续费
    public async updateRechargePoundage(poundage: RechargePoundageModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = RechargeService.validatePoundage(poundage, OperationType.Edit);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { tokenType, chargeRate } = poundage;
        await Caxios.post<any>(
            {
                url: Urls.recharge.poundage.update,
                data: {
                    tokenType,
                    chargeRate: (chargeRate / 100).toFixed(4)
                }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }

    // 获取充值地址列表
    public async fetchRechargeAddresses(parameters: IPageParameters<IRechargeAddressPageParameters>): Promise<PageResult<RechargeAddressModel>> {
        let url = Urls.recharge.address.list,
            result = await Caxios.get<PageResult<RechargeAddressModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters)}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<RechargeAddressModel>(0, []);
        return result as PageResult<RechargeAddressModel>;
    }

    // 导出充值地址列表
    public async exportRechargeAddresses(parameters: IPageParameters<IRechargeAddressPageParameters>): Promise<string> {
        let url = Urls.recharge.address.export,
            result = await Caxios.get<string | null>({ url: `${url}?${Utils.buildPageParameters(parameters)}` }, CaxiosType.FullLoadingToken);
        return result || '';
    }
}
