import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { CaxiosType, CarrierFormType, Urls, CONSTANTS, AreaCodes } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import { IPageParameters, IRebateOrderPageParameters, IFlashOrderPageParameters, IWithdrawOrderPageParameters } from '@/ts/interfaces';
import { PageResult, CarrierFormModel, CarrierModel, RebateOrderModel, FlashOrderModel, WithdrawOrderModel } from '@/ts/models';

export class CarrierService {
    // 验证运营商表单
    public static validateCarrierForm(carrierForm: CarrierFormModel, formType: CarrierFormType): ValidationResult {
        if (!carrierForm) return { status: false, data: { brokerForm: '参数不可以为空' } };

        const key = 'carrierForm';
        let { carrierId, carrierName, areaCode, mobile, loginPwd, rebateRatio, billingCycle, unit } = carrierForm,
            validator = new Validator();
        if (formType === CarrierFormType.CarrierForm) {
            validator.addRule(key, { name: 'carrierName', value: carrierName }, { required: true }, { required: '运营商不可以为空' });
            if (areaCode === CONSTANTS.CHINA_AREA_CODE) {
                validator.addRule(key, { name: 'mobile', value: mobile }, { required: true, mobile: true }, { required: '手机号不可以为空' });
            } else {
                validator.addRule(key, { name: 'mobile', value: mobile }, { required: true }, { required: '手机号不可以为空' });
            }
            validator.addRule(key, { name: 'loginPwd', value: loginPwd }, { required: true, password: true }, { required: '登录密码不可以为空' });
            validator.addRule(key, { name: 'rebateRatio', value: rebateRatio }, { required: true }, { required: '返点比例(%)不可以为空' });
            validator.addRule(key, { name: 'billingCycle', value: billingCycle }, { required: true }, { required: '结算时间不可以为空' });
            validator.addRule(key, { name: 'unit', value: unit }, { required: true }, { required: '单位（周、月）不可以为空' });
        } else if (formType === CarrierFormType.CarrierPasswordForm) {
            validator.addRule(key, { name: 'carrierId', value: carrierId }, { required: true }, { required: '运营商编号不可以为空' });
            validator.addRule(key, { name: 'loginPwd', value: loginPwd }, { required: true, password: true }, { required: '登录密码不可以为空' });
        } else if (formType === CarrierFormType.CarrierMobileForm) {
            validator.addRule(key, { name: 'carrierId', value: carrierId }, { required: true }, { required: '运营商编号不可以为空' });
            if (areaCode === CONSTANTS.CHINA_AREA_CODE) {
                validator.addRule(key, { name: 'mobile', value: mobile }, { required: true, mobile: true }, { required: '手机号不可以为空' });
            } else {
                validator.addRule(key, { name: 'mobile', value: mobile }, { required: true }, { required: '手机号不可以为空' });
            }
        } else if (formType === CarrierFormType.CarrierRebateForm) {
            validator.addRule(key, { name: 'carrierId', value: carrierId }, { required: true }, { required: '运营商不可以为空' });
            validator.addRule(key, { name: 'rebateRatio', value: rebateRatio }, { required: true }, { required: '返点比例(%)不可以为空' });
            validator.addRule(key, { name: 'billingCycle', value: billingCycle }, { required: true }, { required: '结算时间不可以为空' });
            validator.addRule(key, { name: 'unit', value: unit }, { required: true }, { required: '单位（周、月）不可以为空' });
        }
        return validator.execute(key);
    }

    // 获取运营商列表
    public async fetchCarriers(parameters: IPageParameters<null>): Promise<PageResult<CarrierModel>> {
        let url = Urls.carrier.list.list,
            result = await Caxios.get<PageResult<CarrierModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters)}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<CarrierModel>(0, []);

        (result.list || []).forEach((item: any) => {
            item['carrierId'] = isNaN(Number(item.carrierId)) ? null : Number(item.carrierId);
            item['rebateRatio'] = isNaN(Number(item.rebateRatio)) ? null : Number(item.rebateRatio);
        });
        return result as PageResult<CarrierModel>;
    }

    // 添加运营商
    public async addCarrier(carrierForm: CarrierFormModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = CarrierService.validateCarrierForm(carrierForm, CarrierFormType.CarrierForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { carrierName, areaCode, mobile, loginPwd, rebateRatio, billingCycle, unit } = carrierForm,
            filterAreaCode = AreaCodes.filter((item: any) => item.i === areaCode)[0];
        if (!filterAreaCode) return Promise.reject('未找到相对应的国家区号');

        await Caxios.post<any>(
            {
                url: Urls.carrier.list.add,
                data: {
                    carrierName,
                    areaCode: '+' + filterAreaCode.d,
                    mobile,
                    loginPwd: md5(loginPwd),
                    rebateRatio,
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

        let { carrierId, areaCode, mobile, loginPwd, rebateRatio, billingCycle, unit } = carrierForm,
            filterAreaCode = AreaCodes.filter((item: any) => item.i === areaCode)[0];
        if (!filterAreaCode) return Promise.reject('未找到相对应的国家区号');

        let tAreaCode = '+' + filterAreaCode.d,
            pwd = md5(loginPwd);
        await Caxios.post<any>(
            {
                url: {
                    2: Urls.carrier.list.updatePassword,
                    3: Urls.carrier.list.updateMobile,
                    4: Urls.carrier.list.updateRebate
                }[formType],
                data: {
                    2: { carrierId, pwd },
                    3: { carrierId, areaCode: tAreaCode, mobileNumber: mobile, pwd },
                    4: { carrierId, rebateRatio, billingCycle, unit }
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
