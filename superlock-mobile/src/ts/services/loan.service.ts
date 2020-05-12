import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import {
    LoanBaseInfoModel,
    LoanableLockModel,
    LoanableQuotaModel,
    LoanFormModel,
    RepaymentFormModel,
    LoanModel,
    LoanInterestModel
} from '@/ts/models';

export class LoanService {
    // 校验贷款表单
    public static validateLoanForm(loanForm: LoanFormModel, isPassword: boolean = true): ValidationResult {
        if (!loanForm) return { status: false, data: { userForm: '参数不可以为空' } };

        let key = 'loan',
            { lockOrderId, amount, loanDays, fundPasswd, maxAmount, maxDuration } = loanForm,
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
    public static validateRepaymentForm(repaymentForm: RepaymentFormModel, isPassword: boolean = true): ValidationResult {
        if (!repaymentForm) return { status: false, data: { repaymentForm: '参数不可以为空' } };

        let key = 'repayment',
            { loansSerial, fundPasswd } = repaymentForm,
            validator = new Validator();
        validator.addRule(key, { name: 'loansSerial', value: loansSerial }, { required: true }, { required: '贷款订单号不可以为空' });
        if (isPassword) {
            validator.addRule(key, { name: 'fundPasswd', value: fundPasswd }, { required: true }, { required: '资金密码不可以为空' });
        }
        return validator.execute(key);
    }

    // 获取基础信息
    public async fetchLoanBaseInfo(): Promise<LoanBaseInfoModel | null> {
        return await Caxios.get<LoanBaseInfoModel | null>({ url: Urls.loan.baseInfo }, CaxiosType.Token);
    }

    // 获取可贷款的锁仓列表
    public async fetchLoanableLocks(pageNum: number = 1, pageSize: number = 10): Promise<Array<LoanableLockModel>> {
        let result = await Caxios.get<Array<LoanableLockModel> | null>(
            { url: `${Urls.loan.loanableLocks}?${Utils.buildParameters({ pageNum, pageSize })}` },
            pageNum === 1 ? CaxiosType.LoadingToken : CaxiosType.Token
        );
        return result || [];
    }

    // 获取可贷款额度
    public async fetchLoanableQuota(orderId: string): Promise<LoanableQuotaModel | null> {
        if (!orderId) return Promise.reject('订单号不可以为空');
        return await Caxios.get<LoanableQuotaModel | null>({ url: `${Urls.loan.loanableQuota}?orderId=${orderId}` }, CaxiosType.LoadingToken);
    }

    // 执行贷款
    public async executeLoan(loanForm: LoanFormModel): Promise<any> {
        let result: ValidationResult = LoanService.validateLoanForm(loanForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { lockOrderId, amount, loanDays, fundPasswd } = loanForm,
            parameters = Utils.buildParameters({ lockOrderId, amount, loanDays, fundPasswd: md5(fundPasswd) });
        return await Caxios.post<any>({ url: `${Urls.loan.executeLoan}?${parameters}` }, CaxiosType.LoadingToken);
    }

    // 执行还贷
    public async executeRepayment(repaymentForm: RepaymentFormModel): Promise<any> {
        let result: ValidationResult = LoanService.validateRepaymentForm(repaymentForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { loansSerial, fundPasswd } = repaymentForm,
            parameters = Utils.buildParameters({ loansSerial, fundPasswd: md5(fundPasswd) });
        return await Caxios.post<any>({ url: `${Urls.loan.executeRepayment}?${parameters}` }, CaxiosType.LoadingToken);
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
}
