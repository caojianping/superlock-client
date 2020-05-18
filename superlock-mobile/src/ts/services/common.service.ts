import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType, defaultAreaCode } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { UsableQuotaModel, ExchangeRateModel, VerifyResult, EmailFormModel } from '@/ts/models';

export class CommonService {
    // 验证短信、邮箱
    public static validateSmsAndEmail(areaCode: string, mobile: string, email?: string) {
        let key = 'mobilePhone',
            validator = new Validator();
        validator.addRule(key, { name: 'areaCode', value: areaCode }, { required: true }, { required: '国家/地区区号不可以为空' });
        if (areaCode === defaultAreaCode.code) {
            validator.addRule(key, { name: 'mobile', value: mobile }, { required: true, mobile: true }, { required: '手机号不可以为空' });
        } else {
            validator.addRule(
                key,
                { name: 'mobile', value: mobile },
                { required: true, pureDigit: true },
                { required: '手机号不可以为空', pureDigit: '手机号格式不正确' }
            );
        }
        if (email) {
            validator.addRule(
                key,
                { name: 'email', value: email },
                { required: true, email: true },
                { required: '邮箱地址不可以为空', email: '邮箱地址格式不正确' }
            );
        }
        return validator.execute(key);
    }

    // 获取验证方式
    public async fetchVerifyMethod(areaCode: string, mobile: string, type: number = 2): Promise<VerifyResult | null> {
        let result: ValidationResult = CommonService.validateSmsAndEmail(areaCode, mobile);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let parameters = Utils.buildParameters({ account: [areaCode, mobile].join(','), type }),
            verifyResult = await Caxios.get<VerifyResult | null>({ url: `${Urls.common.verifyMethod}?${parameters}` }, CaxiosType.Loading);
        if (verifyResult) {
            verifyResult.needVerify = isNaN(Number(verifyResult.needVerify)) ? 0 : Number(verifyResult.needVerify);
        }
        return verifyResult;
    }

    // 获取短信验证码
    public async fetchSmsCode(areaCode: string, mobile: string): Promise<boolean> {
        let result: ValidationResult = CommonService.validateSmsAndEmail(areaCode, mobile);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        await Caxios.post<any>({ url: Urls.common.smsCode, data: { account: [areaCode, mobile].join(',') } }, CaxiosType.Default);
        return true;
    }

    // 获取邮箱验证码
    public async fetchEmailCode(areaCode: string, mobile: string, email: string): Promise<boolean> {
        let result: ValidationResult = CommonService.validateSmsAndEmail(areaCode, mobile, email);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let parameters = Utils.buildParameters({ account: [areaCode, mobile].join(','), email });
        await Caxios.post<VerifyResult | null>({ url: `${Urls.common.emailCode}?${parameters}` }, CaxiosType.Default);
        return true;
    }

    // 获取可提现、可转账额度
    public async fetchUsableQuota(): Promise<UsableQuotaModel | null> {
        return await Caxios.get<UsableQuotaModel | null>({ url: Urls.common.usableQuota }, CaxiosType.Token);
    }

    // 获取汇率信息
    public async fetchExchangeRate(fromCoin: string = 'BCB', toCoin: string = 'DC'): Promise<ExchangeRateModel | null> {
        let parameters = Utils.buildParameters({ fromCoin, toCoin });
        return await Caxios.get<ExchangeRateModel | null>({ url: `${Urls.common.exchangeRate}?${parameters}` }, CaxiosType.Token);
    }
}
