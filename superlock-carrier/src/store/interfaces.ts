import { Commit } from 'vuex';
import {
    ISelectOption,
    IPageParameters,
    ILockPageParameters,
    IProjectPageParameters,
    IFinancePageParameters,
    IBrokerPageParameters,
    IBrokerChildPageParameters,
    IRatePageParameters,
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
    CarrierInfoModel,
    WithdrawFormModel,
    RebateOrderModel,
    FlashOrderModel,
    WithdrawOrderModel,
    PasswordFormModel
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
    code: string; // 验证码
}

export interface IHomeState {
    homeData: HomeModel; // 首页数据
}

export interface ILockState {
    statusOptions: Array<ISelectOption>; // 状态选项

    lockParameters: IPageParameters<ILockPageParameters>; // 锁仓分页参数
    projectParameters: IPageParameters<IProjectPageParameters>; // 项目分页参数
    totalCount: number; // 总数量
    list: Array<LockModel | ProjectModel>; // 列表

    awardForm: AwardFormModel; // 奖励表单
}

export interface IFinanceState {
    parameters: IPageParameters<IFinancePageParameters>; // 财务模块分页参数
    totalCount: number; // 总数量
    list: Array<FinanceInterestModel | FinanceDirectModel | FinancePromoteModel | FinanceSaleModel>; // 列表
}

export interface IMemberState {
    projectOptions: Array<ISelectOption>; // 项目选项
    typeOptions: Array<ISelectOption>; // 类型选项

    brokerParameters: IPageParameters<IBrokerPageParameters>;
    childParameters: IPageParameters<IBrokerChildPageParameters>;
    rateParameters: IPageParameters<IRatePageParameters>;
    totalCount: number; // 总数量
    list: Array<BrokerModel | BrokerChildModel | RateModel>; // 列表

    brokerForm: BrokerFormModel; // 券商表单
    rateForm: RateFormModel; // 利率表单
    quotaForm: QuotaFormModel; // 额度表单

    count: number; // 下级数量
}

export interface ICarrierState {
    carrierInfo?: CarrierInfoModel | null; // 运营商信息
    rate: number; // 汇率
    serial: string; // 订单号
    withdrawForm: WithdrawFormModel; // 提现表单

    rebateParameters: IPageParameters<IRebateOrderPageParameters>; // 返点订单分页参数
    flashParameters: IPageParameters<IFlashOrderPageParameters>; // 闪兑订单分页参数
    withdrawParameters: IPageParameters<IWithdrawOrderPageParameters>; // 提现订单分页参数
    totalCount: number; // 总数量
    list: Array<RebateOrderModel | FlashOrderModel | WithdrawOrderModel>; // 列表
}

export interface ISystemState {
    passwordForm: PasswordFormModel; // 密码表单
}
