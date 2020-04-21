import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType, defaultAreaCode } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { QuotaModel, ExchangeRateModel, VerifyResult } from '@/ts/models';

export class CommonService {
    // 验证手机号码
    public static validateMobilePhone(areaCode: string, mobile: string) {
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
        return validator.execute(key);
    }

    // 获取验证方式
    public async fetchVerifyMethod(areaCode: string, mobile: string): Promise<VerifyResult | null> {
        let result: ValidationResult = CommonService.validateMobilePhone(areaCode, mobile);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        return await Caxios.post<VerifyResult | null>(
            { url: Urls.common.verifyMethod, data: { account: [areaCode, mobile].join(',') } },
            CaxiosType.Default
        );
    }

    // 获取短信验证码
    public async fetchSmsCode(areaCode: string, mobile: string): Promise<boolean> {
        let result: ValidationResult = CommonService.validateMobilePhone(areaCode, mobile);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        await Caxios.post<any>({ url: Urls.common.smsCode, data: { account: [areaCode, mobile].join(',') } }, CaxiosType.Default);
        return true;
    }

    // 获取邮箱验证码
    public async fetchEmailCode(areaCode: string, mobile: string): Promise<boolean> {
        let result: ValidationResult = CommonService.validateMobilePhone(areaCode, mobile);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        await Caxios.post<any>({ url: Urls.common.emailCode, data: { account: [areaCode, mobile].join(',') } }, CaxiosType.Default);
        return true;
    }

    // 获取可提现、可转账额度
    public async fetchQuota(): Promise<QuotaModel | null> {
        return await Caxios.get<QuotaModel | null>({ url: Urls.common.quota }, CaxiosType.Token);
    }

    // 获取汇率信息
    public async fetchExchangeRate(fromCoin: string = 'BCB', toCoin: string = 'DC'): Promise<ExchangeRateModel | null> {
        let parameters = Utils.buildParameters({ fromCoin, toCoin });
        return await Caxios.get<ExchangeRateModel | null>({ url: `${Urls.common.exchangeRate}?${parameters}` }, CaxiosType.Token);
    }
}
