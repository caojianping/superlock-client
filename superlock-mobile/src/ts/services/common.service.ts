import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType, defaultAreaCode } from '@/ts/config';
import { Caxios } from '@/ts/common';

export class CommonService {
    // 获取短信验证码
    public async fetchSmsCode(
        areaCode: string,
        mobile: string
    ): Promise<boolean> {
        const key = 'smsCode';
        let validator = new Validator();
        validator.addRule(
            key,
            { name: 'areaCode', value: areaCode },
            { required: true },
            { required: '国家/地区区号不可以为空' }
        );
        if (areaCode === defaultAreaCode.code) {
            validator.addRule(
                key,
                { name: 'mobile', value: mobile },
                { required: true, mobile: true },
                { required: '手机号不可以为空' }
            );
        } else {
            validator.addRule(
                key,
                { name: 'mobile', value: mobile },
                { required: true },
                { required: '手机号不可以为空' }
            );
        }

        let result: ValidationResult = validator.execute(key);
        if (!result.status)
            return Promise.reject(Utils.getFirstValue(result.data));

        await Caxios.post<any>(
            {
                url: Urls.common.smsCode,
                data: { account: [areaCode, mobile].join(',') }
            },
            CaxiosType.Default
        );
        return true;
    }
}
