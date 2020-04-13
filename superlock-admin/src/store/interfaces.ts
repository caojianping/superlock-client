import { Commit } from 'vuex';
import {
    ISelectOption,
    IPageParameters,
    IRechargeRecordPageParameters,
    IWithdrawRecordPageParameters,
    IWithdrawTransferPageParameters,
    ILockRecordPageParameters,
    ILockProjectPageParameters,
    IFinancePageParameters,
    ILoanRecordPageParameters,
    ILoanInterestPageParameters,
    IFundRecordPageParameters,
    IMemberPageParameters,
    IPointRecordPageParameters,
    TokenInfo,
    LoginForm,
    HomeModel,
    RechargeRecordModel,
    WithdrawRecordModel,
    WithdrawTransferModel,
    LockRecordModel,
    LockProjectModel,
    ProjectForm,
    AwardForm,
    FinanceInterestModel,
    FinanceDirectModel,
    FinancePromoteModel,
    FinanceSaleModel,
    LoanRecordModel,
    LoanInterestModel,
    LoanForm,
    FundRecordModel,
    BrokerModel,
    BrokerChildModel,
    RateModel,
    BrokerForm,
    QuotaForm,
    RateForm,
    PointRecordModel,
    PointAccountModel,
    UserModel,
    UserForm,
    GoogleForm,
    PasswordForm,
    PointForm,
    TransferForm,
    PointInfo,
    TransferInfo,
    FreeTrialModel,
    InitInfoForm,
    RechargePoundageModel
} from '@/ts/models';
import { FreeTrialType } from '@/ts/config';

export interface IActionContext<T> {
    commit: Commit;
    state: T;
    rootState: IRootState;
}

export interface IRootState {
    tokenInfo: TokenInfo; // token信息
    isFullLoading: boolean; // 是否启用全屏加载中UI
    isPageLoading: boolean; // 是否启用分页加载中UI

    pageSizeOptions: Array<string>; // 分页尺寸选项
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
    loginForm: LoginForm; // 登录表单
}

export interface IHomeState {
    homeData: HomeModel; // 今日数据
    initInfoForm: InitInfoForm; // 初始信息表单
}

export interface IRechargeState {
    coinOptions: Array<ISelectOption>;

    parameters: IPageParameters<IRechargeRecordPageParameters>;
    totalCount: number;
    list: Array<RechargeRecordModel | RechargePoundageModel>;

    poundage: RechargePoundageModel;
}

export interface IWithdrawState {
    statusOptions: Array<ISelectOption>;

    recordParameters: IPageParameters<IWithdrawRecordPageParameters>;
    transferParameters: IPageParameters<IWithdrawTransferPageParameters>;
    totalCount: number;
    list: Array<WithdrawRecordModel | WithdrawTransferModel>;
}

export interface ILockState {
    statusOptions: Array<ISelectOption>;

    recordParameters: IPageParameters<ILockRecordPageParameters>;
    projectParameters: IPageParameters<ILockProjectPageParameters>;
    totalCount: number;
    list: Array<LockRecordModel | LockProjectModel>;

    projectForm: ProjectForm;
    awardForm: AwardForm;
}

export interface IFinanceState {
    parameters: IPageParameters<IFinancePageParameters>;
    totalCount: number;
    list: Array<
        | FinanceInterestModel
        | FinanceDirectModel
        | FinancePromoteModel
        | FinanceSaleModel
    >;
}

export interface ILoanState {
    statusOptions: Array<ISelectOption>;

    recordParameters: IPageParameters<ILoanRecordPageParameters>;
    interestParameters: IPageParameters<ILoanInterestPageParameters>;
    totalCount: number;
    list: Array<LoanRecordModel | LoanInterestModel>;

    loanForm: LoanForm;
}

export interface IFundState {
    coinOptions: Array<ISelectOption>;
    orderOptions: Array<ISelectOption>;
    accountOptions: Array<ISelectOption>;

    parameters: IPageParameters<IFundRecordPageParameters>;
    totalCount: number;
    list: Array<FundRecordModel>;
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

    brokerForm: BrokerForm;
    rateForm: RateForm;
    quotaForm: QuotaForm;

    count: number;
}

export interface IPointState {
    pointParameters: IPageParameters<IPointRecordPageParameters>;
    accountParameters: IPageParameters<null>;
    totalCount: number;
    list: Array<PointRecordModel | PointAccountModel>;

    pointInfos: Array<PointInfo>;
    transferInfo: TransferInfo;

    pointForm: PointForm;
    transferForm: TransferForm;
}

export interface ISystemState {
    roleOptions: Array<ISelectOption>;

    parameters: IPageParameters<null>;
    totalCount: number;
    list: Array<UserModel>;

    userForm: UserForm;
    passwordForm: PasswordForm;
    googleForm: GoogleForm;
}
