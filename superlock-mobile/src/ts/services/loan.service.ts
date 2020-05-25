import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import {
    LoanBaseInfoModel,
    LoanableQuotaModel,
    LoanableLockModel,
    LoanModel,
    LoanInterestModel,
    LoanApplyFormModel,
    LoanRepayFormModel
} from '@/ts/models';

import Locales from '@/locales';
const i18n = Locales.buildLocale();

export class LoanService {
    // 校验贷款表单
    public static validateApplyForm(applyForm: LoanApplyFormModel, isPassword: boolean = true): ValidationResult {
        if (!applyForm) return { status: false, data: { applyForm: i18n.tc('VALIDATES.PARAMETER_NOT_NULL') } };

        let key = 'apply',
            { lockOrderId, amount, loanDays, fundPasswd, minAmount, maxAmount, minDuration, maxDuration } = applyForm,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'lockOrderId', value: lockOrderId },
            { required: true },
            { required: i18n.tc('VALIDATES.LOCK_ORDER_ID_NOT_NULL') }
        );
        validator.addRule(
            key,
            { name: 'amount', value: !Utils.isNullOrUndefined(amount) ? Utils.digitConvert(amount) : amount },
            { required: true, min: minAmount, max: maxAmount },
            {
                required: i18n.tc('VALIDATES.LOAN_VALUE_NOT_NULL'),
                min: i18n.t('VALIDATES.LOAN_VALUE_GE', { value: minAmount }),
                max: i18n.t('VALIDATES.LOAN_VALUE_LE', { value: maxAmount })
            }
        );
        validator.addRule(
            key,
            { name: 'loanDays', value: !Utils.isNullOrUndefined(loanDays) ? Utils.digitConvert(loanDays) : loanDays },
            { required: true, min: minDuration, max: maxDuration },
            {
                required: i18n.tc('VALIDATES.EXPECT_LOAN_TIME_NOT_NULL'),
                min: i18n.t('VALIDATES.EXPECT_LOAN_TIME_GE', { value: minDuration }),
                max: i18n.t('VALIDATES.EXPECT_LOAN_TIME_LE', { value: maxDuration })
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

    // 校验还贷表单
    public static validateRepayForm(repayForm: LoanRepayFormModel, isPassword: boolean = true): ValidationResult {
        if (!repayForm) return { status: false, data: { repayForm: i18n.tc('VALIDATES.PARAMETER_NOT_NULL') } };

        let key = 'repay',
            { loansSerial, fundPasswd } = repayForm,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'loansSerial', value: loansSerial },
            { required: true },
            { required: i18n.tc('VALIDATES.LOAN_ORDER_ID_NOT_NULL') }
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

    // 获取贷款基础信息
    public async fetchLoanBaseInfo(): Promise<LoanBaseInfoModel | null> {
        return await Caxios.get<LoanBaseInfoModel | null>({ url: Urls.loan.baseInfo }, CaxiosType.Token);
    }

    // 获取可贷款额度
    public async fetchLoanableQuota(orderId: string): Promise<LoanableQuotaModel | null> {
        if (!orderId) return Promise.reject(i18n.tc('VALIDATES.ORDER_ID_NOT_NULL'));
        return await Caxios.get<LoanableQuotaModel | null>({ url: `${Urls.loan.loanableQuota}?orderId=${orderId}` }, CaxiosType.Token);
    }

    // 获取可贷款的锁仓列表
    public async fetchLoanableLocks(pageNum: number = 1, pageSize: number = 10): Promise<Array<LoanableLockModel>> {
        let result = await Caxios.get<Array<LoanableLockModel> | null>(
            { url: `${Urls.loan.loanableLocks}?${Utils.buildParameters({ pageNum, pageSize })}` },
            pageNum === 1 ? CaxiosType.LoadingToken : CaxiosType.Token
        );
        (result || []).forEach((item: any) => {
            item['lockValue'] = Utils.digitConvert(item.lockValue);
            item['minLoanAmount'] = Utils.digitConvert(item.minLoanAmount);
            item['maxLoanAmount'] = Utils.digitConvert(item.maxLoanAmount);
            item['maxLoanDays'] = Utils.digitConvert(item.maxLoanDays);
            item['loanFlag'] = Utils.digitConvert(item.loanFlag);
        });
        return result || [];
    }

    // 获取贷款列表
    public async fetchLoans(): Promise<Array<LoanModel>> {
        let result = await Caxios.get<Array<LoanModel> | null>({ url: Urls.loan.list }, CaxiosType.Token);
        return result || [];
    }

    // 获取贷款详情
    public async fetchLoan(lockOrderId: string): Promise<LoanModel | null> {
        return await Caxios.get<LoanModel | null>({ url: `${Urls.loan.detail}?lockOrderId=${lockOrderId}` }, CaxiosType.LoadingToken);
    }

    // 获取贷款利息列表
    public async fetchLoanInterests(orderId: string, pageNum: number = 1, pageSize: number = 10): Promise<Array<LoanInterestModel>> {
        if (!orderId) return Promise.reject(i18n.tc('VALIDATES.LOCK_ORDER_ID_NOT_NULL'));

        let result = await Caxios.get<Array<LoanInterestModel> | null>(
            { url: `${Urls.loan.interests}?${Utils.buildParameters({ orderId, pageNum, pageSize })}` },
            pageNum === 1 ? CaxiosType.LoadingToken : CaxiosType.Token
        );
        return result || [];
    }

    // 申请贷款
    public async applyLoan(applyForm: LoanApplyFormModel): Promise<boolean> {
        let result: ValidationResult = LoanService.validateApplyForm(applyForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { lockOrderId, amount, loanDays, fundPasswd } = applyForm,
            parameters = Utils.buildParameters({ lockOrderId, amount, loanDays, fundPasswd: md5(fundPasswd) });
        await Caxios.post<any>({ url: `${Urls.loan.applyLoan}?${parameters}` }, CaxiosType.LoadingToken);
        return true;
    }

    // 偿还贷款
    public async repayLoan(repayForm: LoanRepayFormModel): Promise<boolean> {
        let result: ValidationResult = LoanService.validateRepayForm(repayForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { loansSerial, fundPasswd } = repayForm,
            parameters = Utils.buildParameters({ loansSerial, fundPasswd: md5(fundPasswd) });
        await Caxios.post<any>({ url: `${Urls.loan.repayLoan}?${parameters}` }, CaxiosType.LoadingToken);
        return true;
    }
}
