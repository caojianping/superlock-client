import { Commit } from 'vuex';
import { FreeTrialType, CarrierFormType, OperationType, ReportType, VirtualType } from '@/ts/config';
import {
    ISelectOption,
    IPageParameters,
    IRechargePageParameters,
    IRechargeAddressPageParameters,
    IWithdrawPageParameters,
    ITransferPageParameters,
    ILockPageParameters,
    IProjectPageParameters,
    IFinancePageParameters,
    ILoanPageParameters,
    IFundPageParameters,
    IBrokerPageParameters,
    IBrokerChildPageParameters,
    IMigrationPageParameters,
    IRatePageParameters,
    ICarrierPageParameters,
    IRebateOrderPageParameters,
    IFlashOrderPageParameters,
    IWithdrawOrderPageParameters,
    ILockReportPageParameters,
    IExpendReportPageParameters,
    IUserReportPageParameters,
    IRechargeReportPageParameters,
    IPointPageParameters,
    IUserLogPageParameters,
    ISystemLogPageParameters
} from '@/ts/interfaces';
import {
    TokenInfo,
    LoginFormModel,
    HomeModel,
    InitModel,
    VirtualModel,
    RechargeModel,
    RechargeAddressModel,
    RechargePoundageModel,
    WithdrawModel,
    TransferModel,
    LockModel,
    ProjectModel,
    ProjectFormModel,
    AwardFormModel,
    FinanceInterestModel,
    FinanceDirectModel,
    FinancePromoteModel,
    FinanceSaleModel,
    LoanModel,
    LoanInterestModel,
    LoanInfoModel,
    FundModel,
    FreeTrialModel,
    BrokerModel,
    BrokerChildModel,
    BrokerFormModel,
    MigrationModel,
    MigrationFormModel,
    QuotaFormModel,
    RateFormModel,
    RateModel,
    CarrierFormModel,
    CarrierModel,
    RebateOrderModel,
    FlashOrderModel,
    WithdrawOrderModel,
    RechargeReportModel,
    LockReportModel,
    ExpendReportModel,
    UserReportModel,
    PointModel,
    PointAccountModel,
    PointFormModel,
    PointInfoModel,
    TransferFormModel,
    TransferInfoModel,
    UserLogModel,
    SystemLogModel,
    UserModel,
    UserFormModel,
    PasswordFormModel,
    GoogleFormModel
} from '@/ts/models';

export interface IActionContext<T> {
    commit: Commit;
    state: T;
    rootState: IRootState;
}

// 根状态接口
export interface IRootState {
    tokenInfo: TokenInfo; // token信息
    isFullLoading: boolean; // 是否启用全屏加载中UI
    isPageLoading: boolean; // 是否启用分页加载中UI
    isGoogleAuthShow: boolean; // 是否显示谷歌认证模态框
    isSecondVerifyShow: boolean; // 是否显示二次验证模态框
    isComGa: boolean; // 是否为总号

    pageSizeOptions: Array<string>; // 分页尺寸选项
    areaCodeOptions: Array<ISelectOption>; // 国家地区选项
    coinOptions: Array<ISelectOption>; // 币种选项
    withdrawOptions: Array<ISelectOption>; // 提现状态选项
    carrierOptions: Array<ISelectOption>; // 运营商选项

    statusColors: any; // 状态颜色
    statusNames: any; // 状态名称

    auditColors: any; // 审核颜色
    auditNames: any; // 审核名称
}

// 谷歌状态接口
export interface IGoogleState {
    googlePlayUrl: string; // google-play地址
    appStoreUrl: string; // app-store地址

    qrcode: string; // 二维码
    gakey: string; // 谷歌密钥
    gacode: string; // 谷歌验证码

    isLoading: boolean; // 是否正在加载中
}

// 登录状态接口
export interface ILoginState {
    loginForm: LoginFormModel; // 登录表单
}

// 首页状态接口
export interface IHomeState {
    home: HomeModel; // 首页数据
    init: InitModel; // 初始化数据

    type: VirtualType; // 虚拟类型
    virtual: VirtualModel; // 虚拟数据
}

// 充值状态接口
export interface IRechargeState {
    rechargeParameters: IPageParameters<IRechargePageParameters>; // 充值分页参数
    addressParameters: IPageParameters<IRechargeAddressPageParameters>; // 充值地址分页参数
    totalCount: number; // 总数量
    list: Array<RechargeModel | RechargePoundageModel | RechargeAddressModel>; // 列表

    poundage: RechargePoundageModel; // 手续费
}

// 提现状态接口
export interface IWithdrawState {
    withdrawParameters: IPageParameters<IWithdrawPageParameters>; // 提现分页参数
    transferParameters: IPageParameters<ITransferPageParameters>; // 转账分页参数
    totalCount: number; // 总数量
    list: Array<WithdrawModel | TransferModel>; // 列表
}

// 锁仓状态接口
export interface ILockState {
    statusOptions: Array<ISelectOption>; // 状态选项

    lockParameters: IPageParameters<ILockPageParameters>; // 锁仓分页参数
    projectParameters: IPageParameters<IProjectPageParameters>; // 项目分页参数
    totalCount: number; // 总数量
    list: Array<LockModel | ProjectModel>; // 列表

    projectForm: ProjectFormModel; // 项目表单
    awardForm: AwardFormModel; // 奖励表单
}

// 财务状态接口
export interface IFinanceState {
    parameters: IPageParameters<IFinancePageParameters>; // 财务分页参数
    totalCount: number; // 总数量
    list: Array<FinanceInterestModel | FinanceDirectModel | FinancePromoteModel | FinanceSaleModel>; // 列表
}

// 贷款状态接口
export interface ILoanState {
    auditOptions: Array<ISelectOption>; // 审核选项
    statusOptions: Array<ISelectOption>; // 状态选项
    statusColors: any; // 状态颜色
    statusNames: any; // 状态名称

    loanParameters: IPageParameters<ILoanPageParameters>; // 贷款分页参数
    totalCount: number; // 总数量
    list: Array<LoanModel | LoanInterestModel>; // 列表

    loanInfo: LoanInfoModel; // 贷款信息
}

// 资金状态接口
export interface IFundState {
    orderOptions: Array<ISelectOption>; // 订单选项
    accountOptions: Array<ISelectOption>; // 账号选项

    parameters: IPageParameters<IFundPageParameters>; // 资金分页参数
    totalCount: number; // 总数量
    list: Array<FundModel>; // 列表
}

// 风控状态接口
export interface IRiskState {
    type: FreeTrialType; // 免审类型
    freeTrial: FreeTrialModel; // 免审数据
}

// 用户中心状态接口
export interface IMemberState {
    projectOptions: Array<ISelectOption>; // 项目选项
    typeOptions: Array<ISelectOption>; // 类型选项

    brokerParameters: IPageParameters<IBrokerPageParameters>; // 券商分页参数
    childParameters: IPageParameters<IBrokerChildPageParameters>; // 券商下级分页参数
    rateParameters: IPageParameters<IRatePageParameters>; // 利率分页参数
    migrationParameters: IPageParameters<IMigrationPageParameters>; // 迁移分页参数
    totalCount: number; // 总数量
    list: Array<BrokerModel | BrokerChildModel | RateModel | MigrationModel>; // 列表

    brokerForm: BrokerFormModel; // 券商表单
    rateForm: RateFormModel; // 利率表单
    quotaForm: QuotaFormModel; // 额度表单

    migrationInfo?: MigrationFormModel | null; // 迁移信息
    migrationForm: MigrationFormModel; // 迁移表单

    count: number; // 下级数量
}

// 运营商状态接口
export interface ICarrierState {
    cycleOptions: Array<ISelectOption>; // 周期选项

    operationType: OperationType; // 操作类型
    formType: CarrierFormType; // 表单类型
    carrierForm: CarrierFormModel; // 运营商表单
    carrier?: CarrierModel; // 运营商数据

    carrierParameters: IPageParameters<ICarrierPageParameters>; // 运营商分页参数
    rebateParameters: IPageParameters<IRebateOrderPageParameters>; // 返利订单分页参数
    flashParameters: IPageParameters<IFlashOrderPageParameters>; // 闪兑订单分页参数
    withdrawParameters: IPageParameters<IWithdrawOrderPageParameters>; // 提现订单分页参数
    totalCount: number; // 总数量
    list: Array<CarrierModel | RebateOrderModel | FlashOrderModel | WithdrawOrderModel>; // 列表
}

// 报表状态接口
export interface IReportState {
    reportType: ReportType; // 报表类型
    cycleOptions: Array<ISelectOption>; // 周期选项
    expendTypeOptions: Array<ISelectOption>; // 支出类型选项
    userTypeOptions: Array<ISelectOption>; // 用户类型选项

    rechargeParameters: IPageParameters<IRechargeReportPageParameters>; // 充值报表分页参数
    lockParameters: IPageParameters<ILockReportPageParameters>; // 锁仓报表分页参数
    expendParameters: IPageParameters<IExpendReportPageParameters>; // 支出报表分页参数
    userParameters: IPageParameters<IUserReportPageParameters>; // 用户报表分页参数
    totalCount: number; // 总数量
    list: Array<RechargeReportModel | LockReportModel | ExpendReportModel | UserReportModel>; // 列表
}

// 上分状态接口
export interface IPointState {
    pointParameters: IPageParameters<IPointPageParameters>; // 上分分页参数
    accountParameters: IPageParameters<null>; // 账号分页参数
    totalCount: number; // 总数量
    list: Array<PointModel | PointAccountModel>; // 列表

    pointInfos: Array<PointInfoModel>; // 上分信息
    transferInfo: TransferInfoModel; // 转账信息

    pointForm: PointFormModel; // 上分表单
    transferForm: TransferFormModel; // 转账表单
}

// 日志状态接口
export interface ILogState {
    userParameters: IPageParameters<IUserLogPageParameters>; // 用户日志分页参数
    systemParameters: IPageParameters<ISystemLogPageParameters>; // 系统日志分页参数
    totalCount: number; // 总数量
    list: Array<UserLogModel | SystemLogModel>; // 列表
}

// 系统状态接口
export interface ISystemState {
    roleOptions: Array<ISelectOption>; // 权限选项

    parameters: IPageParameters<null>; // 分页参数
    totalCount: number; // 总数量
    list: Array<UserModel>; // 列表

    userForm: UserFormModel; // 用户表单
    passwordForm: PasswordFormModel; // 密码表单
    googleForm: GoogleFormModel; // 谷歌表单
}
