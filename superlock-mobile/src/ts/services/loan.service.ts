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
    LoanApplyResultModel,
    LoanRepayFormModel,
    LoanRepayResultModel
} from '@/ts/models';

export class LoanService {
    // 校验贷款表单
    public static validateApplyForm(applyForm: LoanApplyFormModel, isPassword: boolean = true): ValidationResult {
        if (!applyForm) return { status: false, data: { applyForm: '参数不可以为空' } };

        let key = 'apply',
            { lockOrderId, amount, loanDays, fundPasswd, maxAmount, maxDuration } = applyForm,
            validator = new Validator();
        validator.addRule(key, { name: 'lockOrderId', value: lockOrderId }, { required: true }, { required: '锁仓订单号不可以为空' });
        validator.addRule(
            key,
            { name: 'amount', value: amount },
            { required: true, minExclude: 0, max: maxAmount },
            {
                required: '贷款金额不可以为空',
                minExclude: '贷款金额不可以小于等于0',
                max: `贷款金额不可以大于${maxAmount}`
            }
        );
        validator.addRule(
            key,
            { name: 'loanDays', value: loanDays },
            { required: true, min: 1, max: maxDuration },
            {
                required: '贷款时长不可以为空',
                min: '贷款时长不可以小于1天',
                max: `贷款时长不可以大于${maxDuration}`
            }
        );
        if (isPassword) {
            validator.addRule(key, { name: 'fundPasswd', value: fundPasswd }, { required: true }, { required: '资金密码不可以为空' });
        }
        return validator.execute(key);
    }

    // 校验还贷表单
    public static validateRepayForm(repayForm: LoanRepayFormModel, isPassword: boolean = true): ValidationResult {
        if (!repayForm) return { status: false, data: { repayForm: '参数不可以为空' } };

        let key = 'repay',
            { loansSerial, fundPasswd } = repayForm,
            validator = new Validator();
        validator.addRule(key, { name: 'loansSerial', value: loansSerial }, { required: true }, { required: '贷款订单号不可以为空' });
        if (isPassword) {
            validator.addRule(key, { name: 'fundPasswd', value: fundPasswd }, { required: true }, { required: '资金密码不可以为空' });
        }
        return validator.execute(key);
    }

    // 获取贷款基础信息
    public async fetchLoanBaseInfo(): Promise<LoanBaseInfoModel | null> {
        return await Caxios.get<LoanBaseInfoModel | null>({ url: Urls.loan.baseInfo }, CaxiosType.Token);
    }

    // 获取可贷款额度
    public async fetchLoanableQuota(orderId: string): Promise<LoanableQuotaModel | null> {
        if (!orderId) return Promise.reject('订单号不可以为空');
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
        if (!orderId) return Promise.reject('锁仓订单号不可以为空');

        let result = await Caxios.get<Array<LoanInterestModel> | null>(
            { url: `${Urls.loan.interests}?${Utils.buildParameters({ orderId, pageNum, pageSize })}` },
            pageNum === 1 ? CaxiosType.LoadingToken : CaxiosType.Token
        );
        return result || [];
    }

    // 申请贷款
    public async applyLoan(applyForm: LoanApplyFormModel): Promise<LoanApplyResultModel | null> {
        let result: ValidationResult = LoanService.validateApplyForm(applyForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { lockOrderId, amount, loanDays, fundPasswd } = applyForm,
            parameters = Utils.buildParameters({ lockOrderId, amount, loanDays, fundPasswd: md5(fundPasswd) });
        return await Caxios.post<LoanApplyResultModel | null>({ url: `${Urls.loan.applyLoan}?${parameters}` }, CaxiosType.LoadingToken);
    }

    // 偿还贷款
    public async repayLoan(repayForm: LoanRepayFormModel): Promise<LoanRepayResultModel | null> {
        let result: ValidationResult = LoanService.validateRepayForm(repayForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { loansSerial, fundPasswd } = repayForm,
            parameters = Utils.buildParameters({ loansSerial, fundPasswd: md5(fundPasswd) });
        return await Caxios.post<LoanRepayResultModel | null>({ url: `${Urls.loan.repayLoan}?${parameters}` }, CaxiosType.LoadingToken);
    }
}
