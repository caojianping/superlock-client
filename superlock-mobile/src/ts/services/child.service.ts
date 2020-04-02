import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import {
    RateModel,
    ChildModel,
    DefaultRateStatsModel,
    DefaultRateFormModel
} from '@/ts/models';

export class ChildService {
    // 校验默认利率表单
    public static validateDefaultRateForms(
        defaultRateForms: Array<DefaultRateFormModel>
    ): ValidationResult {
        const units = ['天', '月', '年'];
        const key = 'rateForms';
        let validator = new Validator();
        defaultRateForms.forEach(
            (defaultRateForm: DefaultRateFormModel, index: number) => {
                let type = defaultRateForm.type,
                    max = Number(defaultRateForm.max),
                    value = Utils.isNullOrUndefined(defaultRateForm.value)
                        ? defaultRateForm.value
                        : Number(defaultRateForm.value);
                if (type === 1) {
                    let msg =
                        defaultRateForm.length +
                        units[defaultRateForm.unit] +
                        '锁仓利率';
                    validator.addRule(
                        key,
                        { name: `value${index}`, value: value },
                        { required: true, minExclude: 0, maxExclude: max },
                        {
                            required: `${msg}值不可以为空`,
                            minExclude: `${msg}不可以小于等于0`,
                            maxExclude: `${msg}不可以大于等于${max}`
                        }
                    );
                } else if (type === 2) {
                    validator.addRule(
                        key,
                        { name: `value${index}`, value: value },
                        { required: true, minExclude: 0, maxExclude: max },
                        {
                            required: '推广解锁利率不可以为空',
                            minExclude: '推广解锁利率不可以小于等于0',
                            maxExclude: `推广解锁利率不可以大于等于${max}`
                        }
                    );
                }
            }
        );
        return validator.execute(key);
    }

    // 获取下级列表
    public async fetchChilds(): Promise<ChildModel | null> {
        return await Caxios.get<any>(
            { url: Urls.child.list },
            CaxiosType.LoadingToken
        );
    }

    // 设置下级利率
    public async setChildRates(rates: Array<RateModel>): Promise<boolean> {
        await Caxios.post<any>(
            {
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                url: Urls.child.defaultRate.set,
                data: rates.map((item: any) => ({
                    length: item.length,
                    type: item.type,
                    unit: item.unit,
                    value: Number(item.value)
                }))
            },
            CaxiosType.LoadingToken
        );
        return true;
    }

    // 获取默认利率统计信息
    public async fetchDefaultRateStats(): Promise<DefaultRateStatsModel | null> {
        return await Caxios.get<any>(
            { url: Urls.child.defaultRate.stats },
            CaxiosType.LoadingToken
        );
    }

    // 设置默认利率
    public async setDefaultRates(
        defaultRateForms: Array<DefaultRateFormModel>
    ): Promise<boolean> {
        let result: ValidationResult = ChildService.validateDefaultRateForms(
            defaultRateForms
        );
        if (!result.status)
            return Promise.reject(Utils.getFirstValue(result.data));

        await Caxios.post<any>(
            {
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                url: Urls.child.defaultRate.set,
                data: defaultRateForms.map((item: any) => ({
                    length: item.length,
                    type: item.type,
                    unit: item.unit,
                    value: Number(item.value)
                }))
            },
            CaxiosType.LoadingToken
        );
        return true;
    }
}
