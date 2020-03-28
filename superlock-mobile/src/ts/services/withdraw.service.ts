import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import {
    WithdrawModel,
    WithdrawAddressModel,
    WithdrawFormModel
} from '@/ts/models';

export class WithdrawService {
    // 校验提现表单
    public static validateWithdrawForm(
        withdrawForm: WithdrawFormModel
    ): ValidationResult {
        if (!withdrawForm)
            return {
                status: false,
                data: { userForm: '提现表单参数不可以为空' }
            };

        const key = 'withdrawForm';
        let { address, amount, fundPasswd, remark } = withdrawForm,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'address', value: address },
            { required: true },
            { required: '提现地址不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'amount', value: amount },
            { required: true },
            { required: '提现金额不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'fundPasswd', value: fundPasswd },
            { required: true },
            { required: '资金密码不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'remark', value: remark },
            { required: true },
            { required: '提现备注不可以为空' }
        );
        return validator.execute(key);
    }

    // 校验提现地址
    public static validateWithdrawAddress(
        withdrawAddress: WithdrawAddressModel
    ): ValidationResult {
        if (!withdrawAddress)
            return {
                status: false,
                data: { userForm: '提现地址参数不可以为空' }
            };

        const key = 'withdrawAddress';
        let { nickName, address } = withdrawAddress,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'nickName', value: nickName },
            { required: true },
            { required: '昵称不可以为空' }
        );
        validator.addRule(
            key,
            { name: 'address', value: address },
            { required: true, password: true },
            { required: '地址不可以为空' }
        );
        return validator.execute(key);
    }

    // 执行提现
    public async executeWithdraw(
        withdrawForm: WithdrawFormModel
    ): Promise<boolean> {
        let result: ValidationResult = WithdrawService.validateWithdrawForm(
            withdrawForm
        );
        if (!result.status)
            return Promise.reject(Utils.getFirstValue(result.data));

        let { address, amount, fundPasswd, remark } = withdrawForm,
            parameters = Utils.buildParameters({
                address,
                amount,
                fundPasswd,
                remark
            });
        await Caxios.post<any>(
            { url: `${Urls.withdraw.execute}?${parameters}` },
            CaxiosType.LoadingToken
        );
        return true;
    }

    // 获取提现列表
    public async fetchWithdraws(
        pageNum: number = 1,
        pageSize: number = 10
    ): Promise<Array<WithdrawModel>> {
        // let result = await Caxios.get<Array<WithdrawModel> | null>(
        //     {
        //         url: `${Urls.withdraw.page}?${Utils.buildParameters({
        //             pageNum,
        //             pageSize
        //         })}`
        //     },
        //     CaxiosType.Token
        // );
        // return result || [];

        return [
            {
                orderId: 'ewrdsr24432',
                txhash: 'dsfew324324ddsdfds',
                createTime: '2020-02-18 12:12:12',
                coin: 'BCB',
                amount: 100,
                toAddress: 'bcbdfsrewrdfdsf',
                memo: '',
                statusRemark: '成功',
                status: 1,
                capitalType: '支出',
                balance: 100,
                balanceCoin: 'BCB'
            },
            {
                orderId: 'ewrdsr24432',
                txhash: 'dsfew324324ddsdfds',
                createTime: '2020-02-18 12:12:12',
                coin: 'BCB',
                amount: 100,
                toAddress: 'bcbdfsrewrdfdsf',
                memo: '',
                statusRemark: '成功',
                status: 1,
                capitalType: '支出',
                balance: 100,
                balanceCoin: 'BCB'
            }
        ];
    }

    // 获取提现地址列表
    public async fetchWithdrawAddresses(): Promise<
        Array<WithdrawAddressModel>
    > {
        // let result = await Caxios.get<Array<WithdrawAddressModel> | null>(
        //     { url: Urls.withdraw.address.list },
        //     CaxiosType.LoadingToken
        // );
        // return result || [];
        return [
            {
                nickName: '钱包一',
                address: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
            },
            {
                nickName: '钱包二',
                address: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
            },
            {
                nickName: '钱包三',
                address: 'ccccccccccccccccccccccccccccccccccccccccc'
            }
        ];
    }

    // 添加提现地址
    public async addWithdrawAddress(
        withdrawAddress: WithdrawAddressModel
    ): Promise<boolean> {
        let result: ValidationResult = WithdrawService.validateWithdrawAddress(
            withdrawAddress
        );
        if (!result.status)
            return Promise.reject(Utils.getFirstValue(result.data));

        let { nickName, address } = withdrawAddress,
            parameters = Utils.buildParameters({
                nickName,
                address
            });
        await Caxios.post<any>(
            { url: `${Urls.withdraw.address.add}?${parameters}` },
            CaxiosType.LoadingToken
        );
        return true;
    }
}
