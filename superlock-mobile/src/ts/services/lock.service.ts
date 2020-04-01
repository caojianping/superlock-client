import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import { LockModel, LockFormModel } from '@/ts/models';

export class LockService {
    // 校验锁仓表单
    public static validateLockForm(
        lockForm: LockFormModel,
        isPassword: boolean = true
    ): ValidationResult {
        if (!lockForm)
            return {
                status: false,
                data: { userForm: '锁仓表单参数不可以为空' }
            };

        const key = 'lockForm';
        let {
                length,
                unit,
                rate,
                coin,
                amount,
                fundPasswd,
                maxAmount
            } = lockForm,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'length', value: length },
            { required: true },
            { required: '锁仓长度不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'unit', value: unit },
            { required: true },
            { required: '锁仓单位不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'rate', value: rate },
            { required: true },
            { required: '锁仓利率不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'amount', value: amount },
            { required: true, min: 0.1, max: maxAmount },
            {
                required: '锁仓金额不可以为空',
                min: '锁仓金额不可以小于0.1BCB',
                max: `锁仓金额不可以大于${maxAmount}`
            }
        );
        if (isPassword) {
            validator.addRule(
                key,
                { name: 'fundPasswd', value: fundPasswd },
                { required: true },
                { required: '资金密码不可以为空' }
            );
        }
        return validator.execute(key);
    }

    // 获取锁仓列表
    public async fetchLocks(): Promise<Array<LockModel>> {
        let result = await Caxios.get<Array<LockModel> | null>(
            { url: Urls.lock.list },
            CaxiosType.Token
        );
        return result || [];
    }

    // 创建锁仓
    public async createLock(lockForm: LockFormModel): Promise<boolean> {
        let result: ValidationResult = LockService.validateLockForm(lockForm);
        if (!result.status)
            return Promise.reject(Utils.getFirstValue(result.data));

        let { length, unit, rate, coin, amount, fundPasswd } = lockForm,
            parameters = Utils.buildParameters({
                length,
                unit,
                rate,
                coin: 'BCB',
                amount,
                fundPasswd: md5(fundPasswd)
            });
        await Caxios.post<any>(
            { url: `${Urls.lock.create}?${parameters}` },
            CaxiosType.LoadingToken
        );
        return true;
    }
}
