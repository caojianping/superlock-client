import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, AreaCodes, defaultAreaCode, IAreaCode, CaxiosType, CarrierFormType } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import {
    IPageParameters,
    IRebateOrderPageParameters,
    IFlashOrderPageParameters,
    IWithdrawOrderPageParameters,
    ISelectOption,
    ICarrierPageParameters
} from '@/ts/interfaces';
import { PageResult, CarrierFormModel, CarrierModel, RebateOrderModel, FlashOrderModel, WithdrawOrderModel } from '@/ts/models';

export class CarrierService {
    // 验证运营商表单
    public static validateCarrierForm(carrierForm: CarrierFormModel, formType: CarrierFormType): ValidationResult {
        if (!carrierForm) return { status: false, data: { carrierForm: '参数不可以为空' } };

        let key = 'carrier',
            { carrierId, carrierName, areaCode, mobile, email, loginPwd, rebateRatio, billingCycle, unit } = carrierForm,
            validator = new Validator();
        if (formType === CarrierFormType.CarrierForm) {
            validator.addRule(key, { name: 'carrierName', value: carrierName }, { required: true }, { required: '运营商名称不可以为空' });
            if (areaCode === defaultAreaCode.id) {
                validator.addRule(key, { name: 'mobile', value: mobile }, { required: true, mobile: true }, { required: '手机号不可以为空' });
            } else {
                validator.addRule(key, { name: 'mobile', value: mobile }, { required: true, pureDigit: true }, { required: '手机号不可以为空' });
            }
            validator.addRule(key, { name: 'email', value: email }, { required: true, email: true }, { required: '邮箱不可以为空' });
            validator.addRule(key, { name: 'loginPwd', value: loginPwd }, { required: true, password: true }, { required: '登录密码不可以为空' });
            validator.addRule(key, { name: 'rebateRatio', value: rebateRatio }, { required: true }, { required: '返点比例(%)不可以为空' });
            validator.addRule(key, { name: 'billingCycle', value: billingCycle }, { required: true }, { required: '结算时间不可以为空' });
            validator.addRule(key, { name: 'unit', value: unit }, { required: true }, { required: '单位（周、月）不可以为空' });
        } else if (formType === CarrierFormType.CarrierPasswordForm) {
            validator.addRule(key, { name: 'carrierId', value: carrierId }, { required: true }, { required: '运营商编号不可以为空' });
            validator.addRule(key, { name: 'loginPwd', value: loginPwd }, { required: true, password: true }, { required: '登录密码不可以为空' });
        } else if (formType === CarrierFormType.CarrierMobileForm) {
            validator.addRule(key, { name: 'carrierId', value: carrierId }, { required: true }, { required: '运营商编号不可以为空' });
            if (areaCode === defaultAreaCode.id) {
                validator.addRule(key, { name: 'mobile', value: mobile }, { required: true, mobile: true }, { required: '手机号不可以为空' });
            } else {
                validator.addRule(key, { name: 'mobile', value: mobile }, { required: true, pureDigit: true }, { required: '手机号不可以为空' });
            }
            validator.addRule(key, { name: 'loginPwd', value: loginPwd }, { required: true, password: true }, { required: '登录密码不可以为空' });
        } else if (formType === CarrierFormType.CarrierRebateForm) {
            validator.addRule(key, { name: 'carrierId', value: carrierId }, { required: true }, { required: '运营商不可以为空' });
            validator.addRule(key, { name: 'rebateRatio', value: rebateRatio }, { required: true }, { required: '返点比例(%)不可以为空' });
            validator.addRule(key, { name: 'billingCycle', value: billingCycle }, { required: true }, { required: '结算时间不可以为空' });
            validator.addRule(key, { name: 'unit', value: unit }, { required: true }, { required: '单位（周、月）不可以为空' });
        } else if (formType === CarrierFormType.CarrierEmailForm) {
            validator.addRule(key, { name: 'carrierId', value: carrierId }, { required: true }, { required: '运营商编号不可以为空' });
            validator.addRule(key, { name: 'email', value: email }, { required: true, email: true }, { required: '邮箱不可以为空' });
            validator.addRule(key, { name: 'loginPwd', value: loginPwd }, { required: true, password: true }, { required: '登录密码不可以为空' });
        }
        return validator.execute(key);
    }

    // 获取运营商选项列表
    public async fetchCarrierOptions(): Promise<Array<ISelectOption>> {
        let result = await Caxios.get<Array<any> | null>({ url: Urls.carrier.cache }, CaxiosType.Token);
        return (result || []).map((item: any) => ({
            label: item.carrierName,
            value: item.carrierName
        }));
    }

    // 获取运营商列表
    public async fetchCarriers(parameters: IPageParameters<ICarrierPageParameters>): Promise<PageResult<CarrierModel>> {
        let url = Urls.carrier.list.list,
            result = await Caxios.get<PageResult<CarrierModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['carrierName'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<CarrierModel>(0, []);

        (result.list || []).forEach((item: any) => {
            // item['carrierId'] = Utils.digitConvert(item.carrierId);
            item['rebateRatio'] = Utils.digitConvert(item.rebateRatio);
        });
        return result as PageResult<CarrierModel>;
    }

    // 导出运营商列表
    public async exportCarriers(parameters: IPageParameters<ICarrierPageParameters>): Promise<string> {
        let url = Urls.carrier.list.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['carrierName'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 添加运营商
    public async addCarrier(carrierForm: CarrierFormModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = CarrierService.validateCarrierForm(carrierForm, CarrierFormType.CarrierForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { carrierName, areaCode, mobile, email, loginPwd, rebateRatio, billingCycle, unit } = carrierForm,
            filterAreaCode = AreaCodes.filter((item: IAreaCode) => item.id === areaCode)[0];
        if (!filterAreaCode) return Promise.reject('未找到对应的国家、地区区号');

        await Caxios.post<any>(
            {
                url: Urls.carrier.list.add,
                data: {
                    carrierName,
                    areaCode: '+' + filterAreaCode.code,
                    mobile,
                    email,
                    pwd: md5(loginPwd),
                    rebateRatio: Utils.digitPercent(rebateRatio, 4, false, true),
                    billingCycle,
                    unit
                }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }

    // 更新运营商
    public async updateCarrier(formType: CarrierFormType, carrierForm: CarrierFormModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = CarrierService.validateCarrierForm(carrierForm, formType);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { carrierId, areaCode, mobile, email, loginPwd, rebateRatio, billingCycle, unit } = carrierForm,
            filterAreaCode = AreaCodes.filter((item: IAreaCode) => item.id === areaCode)[0];
        if (formType === CarrierFormType.CarrierMobileForm && !filterAreaCode) return Promise.reject('未找到对应的国家、地区区号');

        let tAreaCode = filterAreaCode ? '+' + filterAreaCode.code : '',
            pwd = md5(loginPwd);
        await Caxios.post<any>(
            {
                url: {
                    2: Urls.carrier.list.updatePassword,
                    3: Urls.carrier.list.updateMobile,
                    4: Urls.carrier.list.updateRebate,
                    5: Urls.carrier.list.updateEmail
                }[formType],
                data: {
                    2: { carrierId, pwd },
                    3: { carrierId, areaCode: tAreaCode, mobile, pwd },
                    4: { carrierId, rebateRatio: Utils.digitPercent(rebateRatio, 4, false, true), billingCycle, unit },
                    5: { carrierId, email, pwd }
                }[formType]
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
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['carrierName'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<RebateOrderModel>(0, []);
        return result as PageResult<RebateOrderModel>;
    }

    // 导出返点订单列表
    public async exportRebateOrders(parameters: IPageParameters<IRebateOrderPageParameters>): Promise<string> {
        let url = Urls.carrier.rebate.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['carrierName'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取闪兑订单列表
    public async fetchFlashOrders(parameters: IPageParameters<IFlashOrderPageParameters>): Promise<PageResult<FlashOrderModel>> {
        let url = Urls.carrier.flash.list,
            result = await Caxios.get<PageResult<FlashOrderModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['carrierName'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<FlashOrderModel>(0, []);
        return result as PageResult<FlashOrderModel>;
    }

    // 导出闪兑订单列表
    public async exportFlashOrders(parameters: IPageParameters<IFlashOrderPageParameters>): Promise<string> {
        let url = Urls.carrier.flash.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['carrierName'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取提现订单列表
    public async fetchWithdrawOrders(parameters: IPageParameters<IWithdrawOrderPageParameters>): Promise<PageResult<WithdrawOrderModel>> {
        let url = Urls.carrier.withdraw.list,
            result = await Caxios.get<PageResult<WithdrawOrderModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['carrierName'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<WithdrawOrderModel>(0, []);
        return result as PageResult<WithdrawOrderModel>;
    }

    // 导出提现订单列表
    public async exportWithdrawOrders(parameters: IPageParameters<IWithdrawOrderPageParameters>): Promise<string> {
        let url = Urls.carrier.withdraw.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['carrierName'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }
}
