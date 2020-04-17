import { Commit } from 'vuex';
import { CarrierFormType, OperationType } from '@/ts/config';
import {
    ISelectOption,
    IPageParameters,
    ILockPageParameters,
    IProjectPageParameters,
    IFinancePageParameters,
    IMemberPageParameters,
    IRebateOrderPageParameters,
    IFlashOrderPageParameters,
    IWithdrawOrderPageParameters
} from '@/ts/interfaces';
import {
    TokenInfo,
    LoginFormModel,
    HomeModel,
    LockModel,
    ProjectModel,
    AwardFormModel,
    FinanceInterestModel,
    FinanceDirectModel,
    FinancePromoteModel,
    FinanceSaleModel,
    BrokerModel,
    BrokerChildModel,
    RateModel,
    BrokerFormModel,
    QuotaFormModel,
    RateFormModel,
    PasswordFormModel,
    CarrierFormModel,
    CarrierModel,
    RebateOrderModel,
    FlashOrderModel,
    WithdrawOrderModel
} from '@/ts/models';

export interface IActionContext<T> {
    commit: Commit;
    state: T;
    rootState: IRootState;
}

export interface IRootState {
    tokenInfo: TokenInfo; // token信息
    isFullLoading: boolean; // 是否启用全屏加载中UI
    isPageLoading: boolean; // 是否启用分页加载中UI
    isSecondVerifyShow: boolean; // 是否显示二次验证模态框

    pageSizeOptions: Array<string>; // 分页尺寸选项
    areaCodeOptions: Array<ISelectOption>; // 国家地区选项
    coinOptions: Array<ISelectOption>; // 币种选项
    withdrawOptions: Array<ISelectOption>; // 提现状态选项

    statusColors: any;
    auditColors: any;
    statusNames: any;
    auditNames: any;
}

export interface ILoginState {
    loginForm: LoginFormModel; // 登录表单
    smsCode: string; // 短信验证码
}

export interface IHomeState {
    homeData: HomeModel; // 首页数据
}

export interface ILockState {
    statusOptions: Array<ISelectOption>;

    lockParameters: IPageParameters<ILockPageParameters>;
    projectParameters: IPageParameters<IProjectPageParameters>;
    totalCount: number;
    list: Array<LockModel | ProjectModel>;

    awardForm: AwardFormModel;
}

export interface IFinanceState {
    parameters: IPageParameters<IFinancePageParameters>;
    totalCount: number;
    list: Array<FinanceInterestModel | FinanceDirectModel | FinancePromoteModel | FinanceSaleModel>;
}

export interface IMemberState {
    projectOptions: Array<ISelectOption>;
    typeOptions: Array<ISelectOption>;

    parameters: IPageParameters<IMemberPageParameters>;
    totalCount: number;
    list: Array<BrokerModel | BrokerChildModel | RateModel>;

    brokerForm: BrokerFormModel;
    rateForm: RateFormModel;
    quotaForm: QuotaFormModel;

    count: number;
}

export interface ICarrierState {
    cycleOptions: Array<ISelectOption>;

    operationType: OperationType;
    formType: CarrierFormType;
    carrierForm: CarrierFormModel;
    carrier?: CarrierModel;

    carrierParameters: IPageParameters<null>;
    rebateParameters: IPageParameters<IRebateOrderPageParameters>;
    flashParameters: IPageParameters<IFlashOrderPageParameters>;
    withdrawParameters: IPageParameters<IWithdrawOrderPageParameters>;
    totalCount: number;
    list: Array<CarrierModel | RebateOrderModel | FlashOrderModel | WithdrawOrderModel>;
}

export interface ISystemState {
    passwordForm: PasswordFormModel;
}
