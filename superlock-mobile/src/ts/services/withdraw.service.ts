import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import { WithdrawModel, WithdrawAddressModel, WithdrawFormModel } from '@/ts/models';

import Locales from '@/locales';
const i18n = Locales.buildLocale();

export class WithdrawService {
    // 校验提现表单
    public static validateWithdrawForm(withdrawForm: WithdrawFormModel, isPassword: boolean = true): ValidationResult {
        if (!withdrawForm) return { status: false, data: { withdrawForm: i18n.tc('VALIDATES.PARAMETER_NOT_NULL') } };

        let key = 'withdrawForm',
            { address, amount, fundPasswd, maxAmount } = withdrawForm,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'maxAmount', value: maxAmount },
            { required: true, minExclude: 0 },
            { required: i18n.tc('VALIDATES.LACK_BALANCE'), minExclude: i18n.tc('VALIDATES.LACK_BALANCE') }
        );
        validator.addRule(key, { name: 'address', value: address }, { required: true }, { required: i18n.tc('VALIDATES.WITHDRAW_ADDRESS_NOT_NULL') });
        validator.addRule(
            key,
            { name: 'amount', value: !Utils.isNullOrUndefined(amount) ? Utils.digitConvert(amount) : amount },
            { required: true, minExclude: 0, max: maxAmount },
            {
                required: i18n.tc('VALIDATES.WITHDRAW_AMOUNT_NOT_NULL'),
                minExclude: i18n.tc('VALIDATES.RECHARGE_AMOUNT_GT_ZERO'),
                max: i18n.t('VALIDATES.RECHARGE_AMOUNT_LE', { value: maxAmount })
            }
        );
        if (isPassword) {
            validator.addRule(
                key,
                { name: 'fundPasswd', value: fundPasswd },
                { required: true },
                { required: i18n.tc('VALIDATES.FUND_PASSWORD_NOT_NULL') }
            );
        }
        return validator.execute(key);
    }

    // 校验提现地址
    public static validateWithdrawAddress(withdrawAddress: WithdrawAddressModel): ValidationResult {
        if (!withdrawAddress) return { status: false, data: { withdrawAddress: i18n.tc('VALIDATES.PARAMETER_NOT_NULL') } };

        let key = 'withdrawAddress',
            { nickName, address } = withdrawAddress,
            validator = new Validator();
        validator.addRule(key, { name: 'nickName', value: nickName }, { required: true }, { required: i18n.tc('VALIDATES.WALLET_NAME_NOT_NULL') });
        validator.addRule(key, { name: 'address', value: address }, { required: true }, { required: i18n.tc('VALIDATES.WALLET_ADDRESS_NOT_NULL') });
        return validator.execute(key);
    }

    // 执行提现
    public async executeWithdraw(withdrawForm: WithdrawFormModel): Promise<boolean> {
        let result: ValidationResult = WithdrawService.validateWithdrawForm(withdrawForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { address, amount, fundPasswd, remark } = withdrawForm,
            parameters = Utils.buildParameters({
                address,
                amount,
                fundPasswd: md5(fundPasswd),
                remark: remark || ''
            });
        await Caxios.post<any>({ url: `${Urls.withdraw.execute}?${parameters}` }, CaxiosType.LoadingToken);
        return true;
    }

    // 获取提现列表
    public async fetchWithdraws(pageNum: number = 1, pageSize: number = 10): Promise<Array<WithdrawModel>> {
        let result = await Caxios.get<Array<WithdrawModel> | null>(
            { url: `${Urls.withdraw.list}?${Utils.buildParameters({ pageNum, pageSize })}` },
            pageNum === 1 ? CaxiosType.LoadingToken : CaxiosType.Token
        );
        return result || [];
    }

    // 获取提现地址列表
    public async fetchWithdrawAddresses(isLoading: boolean = false): Promise<Array<WithdrawAddressModel>> {
        let result = await Caxios.get<Array<WithdrawAddressModel> | null>(
            { url: Urls.withdraw.address.list },
            isLoading ? CaxiosType.LoadingToken : CaxiosType.Token
        );
        return result || [];
    }

    // 添加提现地址
    public async addWithdrawAddress(withdrawAddress: WithdrawAddressModel): Promise<boolean> {
        let result: ValidationResult = WithdrawService.validateWithdrawAddress(withdrawAddress);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { nickName, address } = withdrawAddress,
            parameters = Utils.buildParameters({ nickName, address });
        await Caxios.post<any>({ url: `${Urls.withdraw.address.add}?${parameters}` }, CaxiosType.LoadingToken);
        return true;
    }
}
