import { Commit } from 'vuex';
import { FreeTrialType, CarrierFormType, OperationType } from '@/ts/config';
import {
    ISelectOption,
    IPageParameters,
    IRechargePageParameters,
    IWithdrawPageParameters,
    ITransferPageParameters,
    ILockPageParameters,
    IProjectPageParameters,
    IFinancePageParameters,
    ILoanPageParameters,
    ILoanInterestPageParameters,
    IFundPageParameters,
    IMemberPageParameters,
    IPointPageParameters,
    IRebateOrderPageParameters,
    IFlashOrderPageParameters,
    IWithdrawOrderPageParameters
} from '@/ts/interfaces';
import {
    TokenInfo,
    LoginFormModel,
    HomeModel,
    RechargeModel,
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
    LoanFormModel,
    FundModel,
    BrokerModel,
    BrokerChildModel,
    RateModel,
    BrokerFormModel,
    QuotaFormModel,
    RateFormModel,
    PointModel,
    PointAccountModel,
    UserModel,
    UserFormModel,
    GoogleFormModel,
    PasswordFormModel,
    PointFormModel,
    TransferFormModel,
    PointInfoModel,
    TransferInfoModel,
    FreeTrialModel,
    InitInfoFormModel,
    RechargePoundageModel,
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
    withdrawOptions: Array<ISelectOption>; // 提现状态选项
    carrierOptions: Array<any>; // 运营商选项

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
    homeData: HomeModel; // 今日数据
    initInfoForm: InitInfoFormModel; // 初始信息表单
}

export interface IRechargeState {
    coinOptions: Array<ISelectOption>;

    parameters: IPageParameters<IRechargePageParameters>;
    totalCount: number;
    list: Array<RechargeModel | RechargePoundageModel>;

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

    loanParameters: IPageParameters<ILoanPageParameters>;
    interestParameters: IPageParameters<ILoanInterestPageParameters>;
    totalCount: number;
    list: Array<LoanModel | LoanInterestModel>;

    loanForm: LoanFormModel;
}

export interface IFundState {
    coinOptions: Array<ISelectOption>;
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

    parameters: IPageParameters<IMemberPageParameters>;
    totalCount: number;
    list: Array<BrokerModel | BrokerChildModel | RateModel>;

    brokerForm: BrokerFormModel;
    rateForm: RateFormModel;
    quotaForm: QuotaFormModel;

    count: number;
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

export interface ISystemState {
    roleOptions: Array<ISelectOption>;

    parameters: IPageParameters<null>;
    totalCount: number;
    list: Array<UserModel>;

    userForm: UserFormModel;
    passwordForm: PasswordFormModel;
    googleForm: GoogleFormModel;
}

export interface ICarrierState {
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
