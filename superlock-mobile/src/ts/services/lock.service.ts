import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import { LockModel, LockFormModel, LockResultModel, LockInterestModel } from '@/ts/models';

import Locales from '@/locales';
const i18n = Locales.buildLocale();

export class LockService {
    // 校验锁仓表单
    public static validateLockForm(lockForm: LockFormModel, isPassword: boolean = true): ValidationResult {
        if (!lockForm) return { status: false, data: { lockForm: i18n.tc('VALIDATES.PARAMETER_NOT_NULL') } };

        let key = 'lockForm',
            { length, unit, rate, amount, fundPasswd, minAmount, maxAmount } = lockForm,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'maxAmount', value: maxAmount },
            { required: true, minExclude: 0 },
            {
                required: i18n.tc('VALIDATES.LACK_BALANCE'),
                minExclude: i18n.tc('VALIDATES.LACK_BALANCE')
            }
        );
        validator.addRule(key, { name: 'length', value: length }, { required: true }, { required: i18n.tc('VALIDATES.LOCK_TIME_NOT_NULL') });
        validator.addRule(key, { name: 'unit', value: unit }, { required: true }, { required: i18n.tc('VALIDATES.LOCK_UNIT_NOT_NULL') });
        validator.addRule(key, { name: 'rate', value: rate }, { required: true }, { required: i18n.tc('VALIDATES.LOCK_RATE_NOT_NULL') });
        validator.addRule(
            key,
            { name: 'amount', value: !Utils.isNullOrUndefined(amount) ? Utils.digitConvert(amount) : amount },
            { required: true, min: minAmount, max: maxAmount },
            {
                required: i18n.tc('VALIDATES.LOCK_AMOUNT_NOT_NULL'),
                min: i18n.t('VALIDATES.LOCK_AMOUNT_GE', { value: minAmount }),
                max: i18n.t('VALIDATES.LOCK_AMOUNT_LE', { value: maxAmount })
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

    // 获取最小锁仓金额
    public async fetchMinLockAmount(): Promise<number> {
        return await Caxios.get<any>({ url: Urls.lock.minAmount }, CaxiosType.Token);
    }

    // 获取锁仓列表
    public async fetchLocks(): Promise<Array<LockModel>> {
        let result = await Caxios.get<Array<LockModel> | null>({ url: Urls.lock.list }, CaxiosType.Token);
        (result || []).forEach((item: any) => {
            item['status'] = Utils.digitConvert(item.status);
        });
        return result || [];
    }

    // 创建锁仓
    public async createLock(lockForm: LockFormModel): Promise<LockResultModel | null> {
        let result: ValidationResult = LockService.validateLockForm(lockForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { length, unit, rate, amount, fundPasswd } = lockForm,
            parameters = Utils.buildParameters({
                length,
                unit,
                rate,
                coin: 'BCB',
                amount,
                fundPasswd: md5(fundPasswd)
            });
        return await Caxios.post<LockResultModel | null>({ url: `${Urls.lock.create}?${parameters}` }, CaxiosType.Token);
    }

    // 获取锁仓利息列表
    public async fetchLockInterests(orderId: string, pageNum: number = 1, pageSize: number = 10): Promise<Array<LockInterestModel>> {
        if (!orderId) return Promise.reject(i18n.tc('VALIDATES.LOCK_ORDER_ID_NOT_NULL'));

        let result = await Caxios.get<Array<LockInterestModel> | null>(
            { url: `${Urls.lock.interests}?${Utils.buildParameters({ orderId, pageNum, pageSize })}` },
            pageNum === 1 ? CaxiosType.LoadingToken : CaxiosType.Token
        );
        return result || [];
    }
}
