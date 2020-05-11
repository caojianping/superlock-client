import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { IPageParameters, IRebateOrderPageParameters, IFlashOrderPageParameters, IWithdrawOrderPageParameters } from '@/ts/interfaces';
import {
    PageResult,
    CarrierInfoModel,
    ExchangeFormModel,
    ExchangeStatsModel,
    WithdrawFormModel,
    RebateOrderModel,
    FlashOrderModel,
    WithdrawOrderModel
} from '@/ts/models';

export class CarrierService {
    // 验证兑换表单
    public static validateExchangeForm(exchangeForm: ExchangeFormModel): ValidationResult {
        if (!exchangeForm) return { status: false, data: { exchangeForm: '参数不可以为空' } };

        let key = 'exchange',
            { amount, maxAmount } = exchangeForm,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'amount', value: amount },
            { required: true, minExclude: 0, max: maxAmount },
            {
                required: '兑换数量不可以为空',
                minExclude: '兑换数量不可以小于等于0',
                max: `兑换数量不可以大于${maxAmount}`
            }
        );
        return validator.execute(key);
    }

    // 验证提现表单
    public static validateWithdrawForm(withdrawForm: WithdrawFormModel): ValidationResult {
        if (!withdrawForm) return { status: false, data: { withdrawForm: '参数不可以为空' } };

        let key = 'withdraw',
            { carrierId, value, toAddr, maxAmount } = withdrawForm,
            validator = new Validator();
        validator.addRule(key, { name: 'carrierId', value: carrierId }, { required: true }, { required: '运营商编号不可以为空' });
        validator.addRule(
            key,
            { name: 'value', value: value },
            { required: true, minExclude: 0, max: maxAmount },
            {
                required: '提现数量不可以为空',
                minExclude: '提现数量不可以小于等于0',
                max: `提现数量不可以大于${maxAmount}`
            }
        );
        validator.addRule(key, { name: 'toAddr', value: toAddr }, { required: true }, { required: '提现地址不可以为空' });
        return validator.execute(key);
    }

    // 获取运营商信息
    public async fetchCarrierInfo(): Promise<CarrierInfoModel | null> {
        return await Caxios.get<CarrierInfoModel | null>({ url: Urls.carrier.index.info }, CaxiosType.FullLoadingToken);
    }

    // 获取兑换汇率
    public async fetchRate(): Promise<number> {
        let parameters = Utils.buildParameters({ coin: 'DC', gotcoin: 'BCB' }),
            rate = await Caxios.get<any>({ url: `${Urls.carrier.index.rate}?${parameters}` }, CaxiosType.FullLoadingToken);
        return Utils.digitConvert(rate);
    }

    // 预兑换
    public async presetExchange(exchangeForm: ExchangeFormModel, isCode: boolean = false): Promise<ExchangeStatsModel | null> {
        let result: ValidationResult = CarrierService.validateExchangeForm(exchangeForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let stats = await Caxios.post<any>(
            { url: Urls.carrier.index.presetExchange, data: exchangeForm.amount },
            CaxiosType.FullLoadingToken,
            isCode
        );
        if (!stats) return null;

        let exchangeStats = new ExchangeStatsModel();
        exchangeStats.serial = stats.invoice;
        exchangeStats.rate = Utils.digitConvert(stats.rate);
        exchangeStats.dcAmount = Utils.digitConvert(stats.dcAmount);
        exchangeStats.bcbAmount = Utils.digitConvert(stats.bcbAmount);
        return exchangeStats;
    }

    // 确认兑换
    public async confirmExchange(serial: string, isCode: boolean = false): Promise<boolean> {
        if (!serial) return Promise.reject('订单号不可以为空');
        await Caxios.post<any>({ url: Urls.carrier.index.confirmExchange, data: serial }, CaxiosType.FullLoadingToken, isCode);
        return true;
    }

    // 提现
    public async withdrawCoin(withdrawForm: WithdrawFormModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = CarrierService.validateWithdrawForm(withdrawForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { carrierId, value, toAddr } = withdrawForm;
        await Caxios.post<any>(
            {
                url: Urls.carrier.index.withdraw,
                data: { carrierId, value, toAddr }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }

    // 获取返点订单列表
    public async fetchRebateOrders(parameters: IPageParameters<IRebateOrderPageParameters>): Promise<PageResult<RebateOrderModel>> {
        let url = Urls.carrier.rebate.list,
            result = await Caxios.get<PageResult<RebateOrderModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<RebateOrderModel>(0, []);
        return result as PageResult<RebateOrderModel>;
    }

    // 导出返点订单列表
    public async exportRebateOrders(parameters: IPageParameters<IRebateOrderPageParameters>): Promise<string> {
        let url = Urls.carrier.rebate.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取闪兑订单列表
    public async fetchFlashOrders(parameters: IPageParameters<IFlashOrderPageParameters>): Promise<PageResult<FlashOrderModel>> {
        let url = Urls.carrier.flash.list,
            result = await Caxios.get<PageResult<FlashOrderModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<FlashOrderModel>(0, []);
        return result as PageResult<FlashOrderModel>;
    }

    // 导出闪兑订单列表
    public async exportFlashOrders(parameters: IPageParameters<IFlashOrderPageParameters>): Promise<string> {
        let url = Urls.carrier.flash.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取提现订单列表
    public async fetchWithdrawOrders(parameters: IPageParameters<IWithdrawOrderPageParameters>): Promise<PageResult<WithdrawOrderModel>> {
        let url = Urls.carrier.withdraw.list,
            result = await Caxios.get<PageResult<WithdrawOrderModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<WithdrawOrderModel>(0, []);
        return result as PageResult<WithdrawOrderModel>;
    }

    // 导出提现订单列表
    public async exportWithdrawOrders(parameters: IPageParameters<IWithdrawOrderPageParameters>): Promise<string> {
        let url = Urls.carrier.withdraw.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }
}
