import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType, FreeTrialType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { FreeTrialModel } from '@/ts/models';

export class RiskService {
    // 获取小额免审信息
    public async fetchFreeTrial(): Promise<FreeTrialModel> {
        let result = await Caxios.get<FreeTrialModel | null>({ url: Urls.risk.audit.info }, CaxiosType.FullLoadingToken);
        let freeTrial = new FreeTrialModel();
        if (result !== null) {
            freeTrial.withdrawLimit = Utils.digitConvert(result.withdrawLimit);
            freeTrial.everyrewardLimit = Utils.digitConvert(result.everyrewardLimit);
            freeTrial.promotionrewardLimit = Utils.digitConvert(result.promotionrewardLimit);
            freeTrial.lockAmount = Utils.digitConvert(result.lockAmount);
        }
        return freeTrial;
    }

    // 设置小额免审信息
    public async setFreeTrial(type: FreeTrialType, value: number, isCode: boolean = false): Promise<boolean> {
        let key = 'freeTrial',
            validator = new Validator();
        validator.addRule(key, { name: 'type', value: type }, { required: true }, { required: '免审类型不可以为空' });

        let msg = ['提现免审金额', '利息支出免审金额', '推广奖励免审金额', '最小锁仓数量'][type - 1];
        validator.addRule(
            key,
            { name: 'value', value: value },
            { required: true, min: 0 },
            {
                required: `${msg}不可以为空`,
                min: `${msg}不可以小于0`
            }
        );

        let result: ValidationResult = validator.execute(key);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        await Caxios.post<any>(
            {
                url: Urls.risk.audit.set,
                data: {
                    type: type,
                    value: value
                }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }
}
