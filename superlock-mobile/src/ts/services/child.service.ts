import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { LockPromoteRateModel, ChildModel, ChildRateFormModel, DefaultRateStatsModel, DefaultRateFormModel, ChildRateModel } from '@/ts/models';

import Locales from '@/locales';
const i18n = Locales.buildLocale();

export class ChildService {
    // 校验下级利率表单
    public static validateChildRateForms(childUid: string, childRateForms: Array<ChildRateFormModel>): ValidationResult {
        let unitTypes = [i18n.tc('ARRAY.UNIT_TYPES.0'), i18n.tc('ARRAY.UNIT_TYPES.1'), i18n.tc('ARRAY.UNIT_TYPES.2')],
            rateTypes = [i18n.tc('ARRAY.RATE_TYPES.0'), i18n.tc('ARRAY.RATE_TYPES.1'), i18n.tc('ARRAY.RATE_TYPES.2')],
            key = 'childRateForms',
            validator = new Validator();
        validator.addRule(key, { name: 'childUid', value: childUid }, { required: true }, { required: i18n.tc('VALIDATES.CHILD_UID_NOT_NULL') });

        childRateForms.forEach((childRateForm: ChildRateFormModel, index: number) => {
            let type = childRateForm.type,
                msg = '';
            if (type === 1) {
                msg = childRateForm.length + unitTypes[childRateForm.unit - 1] + rateTypes[type - 1];
            } else {
                msg = rateTypes[type - 1];
            }

            let minAmount = childRateForm.minAmount,
                maxAmount = childRateForm.maxAmount,
                value = !Utils.isNullOrUndefined(childRateForm.value) ? Utils.digitConvert(childRateForm.value) : childRateForm.value;
            validator.addRule(
                key,
                { name: `value${index}`, value: value },
                { required: true, min: minAmount, max: maxAmount },
                {
                    required: i18n.t('VALIDATES.VALIDATE_NOT_NULL', { title: msg }),
                    min: i18n.t('VALIDATES.VALIDATE_GE', { title: msg, value: minAmount }),
                    max: i18n.t('VALIDATES.VALIDATE_LE', { title: msg, value: maxAmount })
                }
            );
        });
        return validator.execute(key);
    }

    // 校验默认利率表单
    public static validateDefaultRateForms(defaultRateForms: Array<DefaultRateFormModel>): ValidationResult {
        let unitTypes = [i18n.tc('ARRAY.UNIT_TYPES.0'), i18n.tc('ARRAY.UNIT_TYPES.1'), i18n.tc('ARRAY.UNIT_TYPES.2')],
            rateTypes = [i18n.tc('ARRAY.RATE_TYPES.0'), i18n.tc('ARRAY.RATE_TYPES.1'), i18n.tc('ARRAY.RATE_TYPES.2')],
            key = 'defaultRateForms',
            validator = new Validator();
        defaultRateForms.forEach((defaultRateForm: DefaultRateFormModel, index: number) => {
            let type = defaultRateForm.type,
                msg = '';
            if (type === 1) {
                msg = defaultRateForm.length + unitTypes[defaultRateForm.unit - 1] + rateTypes[type - 1];
            } else {
                msg = rateTypes[type - 1];
            }

            let max = defaultRateForm.max,
                value = !Utils.isNullOrUndefined(defaultRateForm.value) ? Utils.digitConvert(defaultRateForm.value) : defaultRateForm.value;
            validator.addRule(
                key,
                { name: `value${index}`, value: value },
                { required: true, minExclude: 0, max: max },
                {
                    required: i18n.t('VALIDATES.VALIDATE_NOT_NULL', { title: msg }),
                    minExclude: i18n.t('VALIDATES.VALIDATE_GT', { title: msg, value: 0 }),
                    max: i18n.t('VALIDATES.VALIDATE_LE', { title: msg, value: max })
                }
            );
        });
        return validator.execute(key);
    }

    // 获取锁仓利率和推广解锁利率列表
    public async fetchLockPromoteRates(): Promise<Array<LockPromoteRateModel>> {
        let result = await Caxios.get<Array<LockPromoteRateModel> | null>({ url: Urls.child.lockPromoteRates }, CaxiosType.Token);
        return result || [];
    }

    // 获取下级分页列表
    public async fetchChilds(pageNum: number = 1, pageSize: number = 10): Promise<Array<ChildModel>> {
        let result = await Caxios.get<Array<ChildModel> | null>(
            { url: `${Urls.child.page}?${Utils.buildParameters({ pageNum, pageSize })}` },
            pageNum === 1 ? CaxiosType.LoadingToken : CaxiosType.Token
        );
        (result || []).forEach((child: ChildModel) => {
            (child.rates || []).forEach((rate: ChildRateModel) => {
                rate['value'] = Utils.digitConvert(rate.value);
                rate['childValue'] = Utils.digitConvert(rate.childValue);
            });
        });
        return result || [];
    }

    // 设置下级备注
    public async setChildRemark(childUid: string, remark: string): Promise<boolean> {
        let key = 'remark',
            validator = new Validator();
        validator.addRule(key, { name: 'childUid', value: childUid }, { required: true }, { required: i18n.tc('VALIDATES.CHILD_UID_NOT_NULL') });
        validator.addRule(key, { name: 'remark', value: remark }, { required: true }, { required: i18n.tc('VALIDATES.CHILD_REMARK_NOT_NULL') });

        let result = validator.execute(key);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let parameters = Utils.buildParameters({ childUid, nickNameRemark: remark });
        await Caxios.post<any>({ url: `${Urls.child.setRemark}?${parameters}` }, CaxiosType.LoadingToken);
        return true;
    }

    // 设置下级利率
    public async setChildRates(childUid: string, childRateForms: Array<ChildRateFormModel>): Promise<boolean> {
        let result: ValidationResult = ChildService.validateChildRateForms(childUid, childRateForms);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        await Caxios.post<any>(
            {
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                url: `${Urls.child.setRates}?childUid=${childUid}`,
                data: childRateForms.map((item: any) => ({
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
        let result = await Caxios.get<any>({ url: Urls.child.defaultRate.stats }, CaxiosType.Token);
        if (result) {
            (result.defaultRateList || []).forEach((rate: any) => {
                rate['value'] = Utils.digitConvert(rate.value);
                rate['childValue'] = Utils.digitConvert(rate.childValue);
            });
        }
        return result;
    }

    // 设置默认利率
    public async setDefaultRates(defaultRateForms: Array<DefaultRateFormModel>): Promise<boolean> {
        let result: ValidationResult = ChildService.validateDefaultRateForms(defaultRateForms);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

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
