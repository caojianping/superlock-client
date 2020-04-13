import Validator, { ValidationResult } from 'jpts-validator';
import { Urls, CaxiosType, CONSTANTS, FreeTrialType } from '@/ts/config';
import { Utils, Caxios } from '@/ts/common';
import { FreeTrialModel } from '@/ts/models';

export class RiskService {
    // 获取小额免审信息
    public async fetchFreeTrial(): Promise<FreeTrialModel> {
        let result = await Caxios.get<FreeTrialModel | null>(
            { url: Urls.risk.audit.info },
            CaxiosType.FullLoadingToken
        );
        let freeTrial = new FreeTrialModel();
        if (result !== null) {
            freeTrial.withdrawLimit = Number(result.withdrawLimit);
            freeTrial.everyrewardLimit = Number(result.everyrewardLimit);
            freeTrial.promotionrewardLimit = Number(
                result.promotionrewardLimit
            );
            freeTrial.lockAmount = Number(result.lockAmount);
        }
        return freeTrial;
    }

    // 设置小额免审信息
    public async setFreeTrial(
        type: FreeTrialType,
        value: number,
        isCode: boolean = false,
        code?: string
    ): Promise<boolean> {
        const key = 'freeTrial';
        let validator = new Validator();
        validator.addRule(
            key,
            { name: 'type', value: type },
            { required: true },
            { required: '免审类型不可以为空' }
        );

        let msg = [
            '提现免审金额',
            '利息支出免审金额',
            '推广奖励免审金额',
            '最小锁仓数量'
        ][type - 1];
        validator.addRule(
            key,
            { name: 'value', value: value },
            { required: true, min: 0 },
            {
                required: `${msg}不可以为空`,
                min: `${msg}不可以小于0`
            }
        );
        if (isCode) {
            validator.addRule(
                key,
                { name: 'code', value: code },
                { required: true },
                { required: '验证码不可以为空' }
            );
        }

        let result: ValidationResult = validator.execute(key);
        if (!result.status)
            return Promise.reject(Utils.getFirstValue(result.data));

        await Caxios.post<any>(
            {
                headers: isCode ? { [CONSTANTS.HEADER_CODE]: code } : {},
                url: Urls.risk.audit.set,
                data: {
                    type: type,
                    value: value
                }
            },
            CaxiosType.FullLoadingToken
        );
        return true;
    }
}
