import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType, defaultAreaCode } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { UsableQuotaModel, ExchangeRateModel, VerifyResult } from '@/ts/models';

import Locales from '@/locales';
const i18n = Locales.buildLocale();

export class CommonService {
    // 验证短信、邮箱
    public static validateSmsAndEmail(areaCode: string, mobile: string, email?: string) {
        let key = 'smsAndEmail',
            validator = new Validator();
        validator.addRule(key, { name: 'areaCode', value: areaCode }, { required: true }, { required: i18n.tc('VALIDATES.COUNTRY_AREA_NOT_NULL') });
        if (areaCode === defaultAreaCode.code) {
            validator.addRule(
                key,
                { name: 'mobile', value: mobile },
                { required: true, mobile: true },
                {
                    required: i18n.tc('VALIDATES.MOBILE_NOT_NULL'),
                    mobile: i18n.tc('VALIDATES.MOBILE_FORMAT_WRONG')
                }
            );
        } else {
            validator.addRule(
                key,
                { name: 'mobile', value: mobile },
                { required: true, pureDigit: true },
                {
                    required: i18n.tc('VALIDATES.MOBILE_NOT_NULL'),
                    pureDigit: i18n.tc('VALIDATES.MOBILE_FORMAT_WRONG')
                }
            );
        }
        if (email) {
            validator.addRule(
                key,
                { name: 'email', value: email },
                { required: true, email: true },
                {
                    required: i18n.tc('VALIDATES.EMAIL_ADDRESS_NOT_NULL'),
                    email: i18n.tc('VALIDATES.EMAIL_ADDRESS_FORMAT_WRONG')
                }
            );
        }
        return validator.execute(key);
    }

    // 获取验证方式，type：1登录验证；2密码验证；
    public async fetchVerifyMethod(areaCode: string, mobile: string, type: number = 2, isLoading: boolean = false): Promise<VerifyResult | null> {
        let vresult: ValidationResult = CommonService.validateSmsAndEmail(areaCode, mobile);
        if (!vresult.status) return Promise.reject(Utils.getFirstValue(vresult.data));

        let parameters = Utils.buildParameters({ account: [areaCode, mobile].join(','), type }),
            result = await Caxios.get<VerifyResult | null>(
                { url: `${Urls.common.verifyMethod}?${parameters}` },
                isLoading ? CaxiosType.Loading : CaxiosType.Default
            );
        if (result) {
            result['needVerify'] = Utils.digitConvert(result.needVerify);
        }
        return result;
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
        let result = await Caxios.get<UsableQuotaModel | null>({ url: Urls.common.usableQuota }, CaxiosType.Token);
        if (result) {
            result['amount'] = Utils.digitConvert(result.amount);
            result['valuationAmount'] = Utils.digitConvert(result.valuationAmount);
        }
        return result;
    }

    // 获取汇率信息
    public async fetchExchangeRate(fromCoin: string = 'BCB', toCoin: string = 'DC'): Promise<ExchangeRateModel | null> {
        let parameters = Utils.buildParameters({ fromCoin, toCoin }),
            result = await Caxios.get<ExchangeRateModel | null>({ url: `${Urls.common.exchangeRate}?${parameters}` }, CaxiosType.Token);
        if (result) {
            result['rate'] = Utils.digitConvert(result.rate);
        }
        return result;
    }
}
