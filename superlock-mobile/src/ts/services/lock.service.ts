import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import { LockModel, LockFormModel, LockResultModel, LockInterestModel } from '@/ts/models';

export class LockService {
    // 校验锁仓表单
    public static validateLockForm(lockForm: LockFormModel, isPassword: boolean = true): ValidationResult {
        if (!lockForm)
            return {
                status: false,
                data: { userForm: '锁仓表单参数不可以为空' }
            };

        let key = 'lockForm',
            { length, unit, rate, amount, fundPasswd, minAmount, maxAmount } = lockForm,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'maxAmount', value: maxAmount },
            { required: true, minExclude: 0 },
            { required: '可用余额不足', minExclude: '可用余额不足' }
        );
        validator.addRule(key, { name: 'length', value: length }, { required: true }, { required: '锁仓长度不可以为空' });
        validator.addRule(key, { name: 'unit', value: unit }, { required: true }, { required: '锁仓单位不可以为空' });
        validator.addRule(key, { name: 'rate', value: rate }, { required: true }, { required: '锁仓利率不可以为空' });
        validator.addRule(
            key,
            { name: 'amount', value: amount },
            { required: true, min: minAmount, max: maxAmount },
            {
                required: '锁仓金额不可以为空',
                min: `锁仓金额不可以小于${minAmount}`,
                max: `锁仓金额不可以大于${maxAmount}`
            }
        );
        if (isPassword) {
            validator.addRule(key, { name: 'fundPasswd', value: fundPasswd }, { required: true }, { required: '资金密码不可以为空' });
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
        return await Caxios.post<LockResultModel | null>({ url: `${Urls.lock.create}?${parameters}` }, CaxiosType.LoadingToken);
    }

    // 获取锁仓利息列表
    public async fetchLockInterests(orderId: string, pageNum: number = 1, pageSize: number = 10): Promise<Array<LockInterestModel>> {
        if (!orderId) return Promise.reject('锁仓订单号不可以为空');

        let result = await Caxios.get<Array<LockInterestModel> | null>(
            { url: `${Urls.lock.interests}?${Utils.buildParameters({ orderId, pageNum, pageSize })}` },
            pageNum === 1 ? CaxiosType.LoadingToken : CaxiosType.Token
        );
        return result || [];
    }
}
