import { Urls, CaxiosType } from '@/ts/config';
import { Utils, Caxios } from '@/ts/common';
import {
    IPageParameters,
    IRebateOrderPageParameters,
    IFlashOrderPageParameters,
    IWithdrawOrderPageParameters,
    PageResult,
    CarrierModel,
    RebateOrderModel,
    FlashOrderModel,
    WithdrawOrderModel
} from '@/ts/models';

export class CarrierService {
    // 获取运营商分页列表
    public async fetchPageCarriers(parameters: IPageParameters<null>): Promise<PageResult<CarrierModel>> {
        let url = Urls.carrier.page,
            result = await Caxios.get<PageResult<CarrierModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters)}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<CarrierModel>(0, []);
        return result as PageResult<CarrierModel>;
    }

    // 获取返点订单分页列表
    public async fetchPageRebateOrders(
        parameters: IPageParameters<IRebateOrderPageParameters>
    ): Promise<PageResult<RebateOrderModel>> {
        let url = Urls.carrier.rebate.page,
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

    // 获取闪兑订单分页列表
    public async fetchPageFlashOrders(
        parameters: IPageParameters<IFlashOrderPageParameters>
    ): Promise<PageResult<FlashOrderModel>> {
        let url = Urls.carrier.flash.page,
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

    // 获取提现订单分页列表
    public async fetchPageWithdrawOrders(
        parameters: IPageParameters<IWithdrawOrderPageParameters>
    ): Promise<PageResult<WithdrawOrderModel>> {
        let url = Urls.carrier.rebate.page,
            result = await Caxios.get<PageResult<WithdrawOrderModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<WithdrawOrderModel>(0, []);
        return result as PageResult<WithdrawOrderModel>;
    }

    // 导出提现订单列表
    public async exportWithdrawOrders(parameters: IPageParameters<IWithdrawOrderPageParameters>): Promise<string> {
        let url = Urls.carrier.rebate.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }
}
