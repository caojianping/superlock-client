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

    statusColors: any;
    auditColors: any;
    statusNames: any;
    auditNames: any;
}

export interface IGoogleState {
    googlePlayUrl: string; // google-play地址
    appStoreUrl: string; // app-store地址

    qrcode: string; // 二维码
    gakey: string; // 谷歌密钥
    gacode: string; // 谷歌验证码

    isLoading: boolean;
}

export interface ILoginState {
    loginForm: LoginFormModel; // 登录表单
}

export interface IHomeState {
    home: HomeModel; // 首页数据
    init: InitModel; // 初始化数据

    type: VirtualType; // 虚拟类型
    virtual: VirtualModel; // 虚拟数据
}

export interface IRechargeState {
    rechargeParameters: IPageParameters<IRechargePageParameters>;
    addressParameters: IPageParameters<IRechargeAddressPageParameters>;
    totalCount: number;
    list: Array<RechargeModel | RechargePoundageModel | RechargeAddressModel>;

    poundage: RechargePoundageModel;
}

export interface IWithdrawState {
    withdrawParameters: IPageParameters<IWithdrawPageParameters>;
    transferParameters: IPageParameters<ITransferPageParameters>;
    totalCount: number;
    list: Array<WithdrawModel | TransferModel>;
}

export interface ILockState {
    statusOptions: Array<ISelectOption>;

    lockParameters: IPageParameters<ILockPageParameters>;
    projectParameters: IPageParameters<IProjectPageParameters>;
    totalCount: number;
    list: Array<LockModel | ProjectModel>;

    projectForm: ProjectFormModel;
    awardForm: AwardFormModel;
}

export interface IFinanceState {
    parameters: IPageParameters<IFinancePageParameters>;
    totalCount: number;
    list: Array<FinanceInterestModel | FinanceDirectModel | FinancePromoteModel | FinanceSaleModel>;
}

export interface ILoanState {
    statusOptions: Array<ISelectOption>;
    statusColors: any;
    statusNames: any;

    loanParameters: IPageParameters<ILoanPageParameters>;
    totalCount: number;
    list: Array<LoanModel | LoanInterestModel>;

    loanInfo: LoanInfoModel;
}

export interface IFundState {
    orderOptions: Array<ISelectOption>;
    accountOptions: Array<ISelectOption>;

    parameters: IPageParameters<IFundPageParameters>;
    totalCount: number;
    list: Array<FundModel>;
}

export interface IRiskState {
    type: FreeTrialType;
    freeTrial: FreeTrialModel;
}

export interface IMemberState {
    projectOptions: Array<ISelectOption>;
    typeOptions: Array<ISelectOption>;

    brokerParameters: IPageParameters<IBrokerPageParameters>;
    childParameters: IPageParameters<IBrokerChildPageParameters>;
    rateParameters: IPageParameters<IRatePageParameters>;
    migrationParameters: IPageParameters<IMigrationPageParameters>;
    totalCount: number;
    list: Array<BrokerModel | BrokerChildModel | RateModel | MigrationModel>;

    brokerForm: BrokerFormModel;
    rateForm: RateFormModel;
    quotaForm: QuotaFormModel;

    migrationInfo?: MigrationFormModel | null;
    migrationForm: MigrationFormModel;

    count: number;
}

export interface ICarrierState {
    cycleOptions: Array<ISelectOption>;

    operationType: OperationType;
    formType: CarrierFormType;
    carrierForm: CarrierFormModel;
    carrier?: CarrierModel;

    carrierParameters: IPageParameters<ICarrierPageParameters>;
    rebateParameters: IPageParameters<IRebateOrderPageParameters>;
    flashParameters: IPageParameters<IFlashOrderPageParameters>;
    withdrawParameters: IPageParameters<IWithdrawOrderPageParameters>;
    totalCount: number;
    list: Array<CarrierModel | RebateOrderModel | FlashOrderModel | WithdrawOrderModel>;
}

export interface IReportState {
    reportType: ReportType;
    cycleOptions: Array<ISelectOption>;
    expendTypeOptions: Array<ISelectOption>;
    userTypeOptions: Array<ISelectOption>;

    rechargeParameters: IPageParameters<IRechargeReportPageParameters>;
    lockParameters: IPageParameters<ILockReportPageParameters>;
    expendParameters: IPageParameters<IExpendReportPageParameters>;
    userParameters: IPageParameters<IUserReportPageParameters>;
    totalCount: number;
    list: Array<RechargeReportModel | LockReportModel | ExpendReportModel | UserReportModel>;
}

export interface IPointState {
    pointParameters: IPageParameters<IPointPageParameters>;
    accountParameters: IPageParameters<null>;
    totalCount: number;
    list: Array<PointModel | PointAccountModel>;

    pointInfos: Array<PointInfoModel>;
    transferInfo: TransferInfoModel;

    pointForm: PointFormModel;
    transferForm: TransferFormModel;
}

export interface ILogState {
    userParameters: IPageParameters<IUserLogPageParameters>;
    systemParameters: IPageParameters<ISystemLogPageParameters>;
    totalCount: number;
    list: Array<UserLogModel | SystemLogModel>;
}

export interface ISystemState {
    roleOptions: Array<ISelectOption>;

    parameters: IPageParameters<null>;
    totalCount: number;
    list: Array<UserModel>;

    userForm: UserFormModel;
    passwordForm: PasswordFormModel;
    googleForm: GoogleFormModel;
}
