import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, AreaCodes, defaultAreaCode, CaxiosType, IAreaCode, OperationType } from '@/ts/config';
import { Caxios, md5 } from '@/ts/common';
import {
    ISelectOption,
    IPageParameters,
    IBrokerPageParameters,
    IBrokerChildPageParameters,
    IRatePageParameters,
    IMigrationPageParameters
} from '@/ts/interfaces';
import {
    PageResult,
    BrokerChildPageResult,
    BrokerModel,
    BrokerChildModel,
    RateModel,
    QuotaFormModel,
    BrokerFormModel,
    RateFormModel,
    MigrationModel,
    MigrationInfoModel,
    MigrationFormModel
} from '@/ts/models';

export class MemberService {
    // 转换处理
    private _buildBrokerChilds(data: any): BrokerChildPageResult<BrokerChildModel> {
        if (!data) return new BrokerChildPageResult<BrokerChildModel>(0, []);
        else {
            let pagger = data.pagger,
                result = new BrokerChildPageResult<BrokerChildModel>(pagger.totalCount || 0, pagger.list || []);
            result.uid = data.uid;
            result.subordinate = data.lockAmount;
            return result;
        }
    }

    // 验证券商表单
    public static validateBrokerForm(brokerForm: BrokerFormModel, operationType: OperationType): ValidationResult {
        if (!brokerForm) return { status: false, data: { brokerForm: '参数不可以为空' } };

        let key = 'broker',
            { uid, areaCode, mobile, totalDegree, password } = brokerForm,
            validator = new Validator();
        if (operationType === OperationType.Edit) {
            validator.addRule(key, { name: 'uid', value: uid }, { required: true }, { required: 'UID不可以为空' });
        }

        validator.addRule(key, { name: 'areaCode', value: areaCode }, { required: true }, { required: '国家区号不可以为空' });
        if (areaCode === defaultAreaCode.id) {
            validator.addRule(
                key,
                { name: 'mobile', value: mobile },
                { required: true, mobile: true },
                { required: '手机号不可以为空', mobile: '手机号格式不正确' }
            );
        } else {
            validator.addRule(key, { name: 'mobile', value: mobile }, { required: true, pureDigit: true }, { required: '手机号不可以为空' });
        }

        if (operationType === OperationType.Add) {
            validator.addRule(
                key,
                { name: 'totalDegree', value: totalDegree },
                { required: true, min: 0 },
                { required: '代理额度不可以为空', min: '代理额度不可以小于0' }
            );
            validator.addRule(key, { name: 'password', value: password }, { required: true, password: true }, { required: '初始密码不可以为空' });
        }
        return validator.execute(key);
    }

    // 验证利率表单
    public static validateRateForm(rateForm: RateFormModel): ValidationResult {
        if (!rateForm) return { status: false, data: { rateForm: '参数不可以为空' } };

        let key = 'rate',
            { uid, type, rate } = rateForm,
            validator = new Validator();
        validator.addRule(key, { name: 'uid', value: uid }, { required: true }, { required: 'UID不可以为空' });
        validator.addRule(key, { name: 'type', value: type }, { required: true }, { required: '项目类型不可以为空' });
        validator.addRule(
            key,
            { name: 'rate', value: rate },
            { required: true, min: 0, max: 100 },
            {
                required: '利率不可以为空',
                min: '利率不可以小于0',
                max: '利率不可以大于100'
            }
        );
        return validator.execute(key);
    }

    // 验证迁移表单
    public static validateMigrationForm(migrationForm: MigrationFormModel): ValidationResult {
        if (!migrationForm) return { status: false, data: { migrationForm: '参数不可以为空' } };

        let key = 'migration',
            { uid, operatorId, memo } = migrationForm,
            validator = new Validator();
        validator.addRule(key, { name: 'uid', value: uid }, { required: true }, { required: 'UID不可以为空' });
        validator.addRule(key, { name: 'operatorId', value: operatorId }, { required: true }, { required: '迁移平台不可以为空' });
        validator.addRule(key, { name: 'memo', value: memo }, { required: true }, { required: '迁移备注不可以为空' });
        return validator.execute(key);
    }

    // 验证额度表单
    public static validateQuotaForm(quotaForm: QuotaFormModel): ValidationResult {
        if (!quotaForm) return { status: false, data: { quotaForm: '参数不可以为空' } };

        let key = 'quota',
            { uid, amount } = quotaForm,
            validator = new Validator();
        validator.addRule(key, { name: 'uid', value: uid }, { required: true }, { required: 'UID不可以为空' });
        validator.addRule(
            key,
            { name: 'amount', value: amount },
            { required: true, min: 0 },
            { required: '新增额度不可以为空', min: '新增额度不可以小于0' }
        );
        return validator.execute(key);
    }

    // 获取券商列表
    public async fetchBrokers(parameters: IPageParameters<IBrokerPageParameters>): Promise<PageResult<BrokerModel>> {
        let url = Urls.member.broker.list,
            result = await Caxios.get<PageResult<BrokerModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, [], ['carrierName'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<BrokerModel>(0, []);
        return result as PageResult<BrokerModel>;
    }

    // 导出券商列表
    public async exportBrokers(parameters: IPageParameters<IBrokerPageParameters>): Promise<string> {
        let url = Urls.member.broker.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, [], ['carrierName'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取券商下级列表
    public async fetchBrokerChilds(parameters: IPageParameters<IBrokerChildPageParameters>): Promise<BrokerChildPageResult<BrokerChildModel>> {
        let url = Urls.member.child.list,
            result = await Caxios.get<PageResult<BrokerChildModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters)}` },
                CaxiosType.PageLoadingToken
            );
        return this._buildBrokerChilds(result);
    }

    // 导出券商下级列表
    public async exportBrokerChilds(parameters: IPageParameters<IBrokerChildPageParameters>): Promise<string> {
        let url = Urls.member.child.export,
            result = await Caxios.get<string | null>({ url: `${url}?${Utils.buildPageParameters(parameters)}` }, CaxiosType.FullLoadingToken);
        return result || '';
    }

    // 获取利率详情列表
    public async fetchRates(parameters: IPageParameters<IRatePageParameters>): Promise<PageResult<RateModel>> {
        let url = Urls.member.broker.rates,
            result = await Caxios.get<PageResult<RateModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters)}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<RateModel>(0, []);
        return result as PageResult<RateModel>;
    }

    // 获取项目类型列表
    public async fetchProjectTypes(): Promise<Array<ISelectOption>> {
        let result = await Caxios.get<Array<any> | null>({ url: Urls.member.broker.types }, CaxiosType.FullLoadingToken);
        return (result || []).map((item: any) => ({
            label: item.projectName,
            value: item.rateType
        }));
    }

    // 添加券商
    public async addBroker(brokerForm: BrokerFormModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = MemberService.validateBrokerForm(brokerForm, OperationType.Add);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { areaCode, mobile, totalDegree, password } = brokerForm,
            filterAreaCode = AreaCodes.filter((item: IAreaCode) => item.id === areaCode)[0];
        if (!filterAreaCode) return Promise.reject('未找到对应的国家、地区区号');

        await Caxios.post<any>(
            {
                url: Urls.member.broker.add,
                data: {
                    areaCode: '+' + filterAreaCode.code,
                    mobile,
                    totalDegree: totalDegree.toFixed(2),
                    password: md5(password)
                }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }

    // 更改手机号
    public async updateMobile(brokerForm: BrokerFormModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = MemberService.validateBrokerForm(brokerForm, OperationType.Edit);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { uid, areaCode, mobile } = brokerForm,
            filterAreaCode = AreaCodes.filter((item: IAreaCode) => item.id === areaCode)[0];
        if (!filterAreaCode) return Promise.reject('未找到对应的国家、地区区号');

        await Caxios.post<any>(
            {
                url: Urls.member.broker.updateMobile,
                data: { uid, areaCode: '+' + filterAreaCode.code, mobile }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }

    // 设置禁用状态
    public async setDisable(uid: string, disable: boolean, isCode: boolean = false): Promise<boolean> {
        if (!uid) return Promise.reject('UID不可以为空');

        await Caxios.post<any>(
            {
                url: Urls.member.broker.setDisable,
                data: { uid, freeze: disable }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }

    // 设置利率
    public async setRate(rateForm: RateFormModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = MemberService.validateRateForm(rateForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { uid, type, rate } = rateForm;
        await Caxios.post<any>(
            {
                url: Urls.member.broker.setRate,
                data: { uid, type, rate: (rate / 100).toFixed(4) }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }

    // 添加额度
    public async addQuota(quotaForm: QuotaFormModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = MemberService.validateQuotaForm(quotaForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { uid, amount } = quotaForm;
        await Caxios.post<any>(
            {
                url: Urls.member.broker.addQuota,
                data: { uid, amount: amount.toFixed(2) }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }

    // 获取迁移列表
    public async fetchMigrations(parameters: IPageParameters<IMigrationPageParameters>): Promise<PageResult<MigrationModel>> {
        let url = Urls.member.migration.list,
            result = await Caxios.get<PageResult<MigrationModel> | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['brokerName', 'carrierName'])}` },
                CaxiosType.PageLoadingToken
            );
        if (!result) return new PageResult<MigrationModel>(0, []);
        return result as PageResult<MigrationModel>;
    }

    // 导出迁移列表
    public async exportMigrations(parameters: IPageParameters<IMigrationPageParameters>): Promise<string> {
        let url = Urls.member.migration.export,
            result = await Caxios.get<string | null>(
                { url: `${url}?${Utils.buildPageParameters(parameters, ['beginTime', 'endTime'], ['brokerName', 'carrierName'])}` },
                CaxiosType.FullLoadingToken
            );
        return result || '';
    }

    // 获取迁移信息
    public async fetchMigrationInfo(uid: string): Promise<MigrationInfoModel | null> {
        if (!uid) return Promise.reject('UID不可以为空');

        let result = await Caxios.get<MigrationInfoModel | null>({ url: `${Urls.member.migration.info}?uid=${uid}` }, CaxiosType.FullLoadingToken);
        if (result) {
            result.operatorList = (result.operatorList || []).map((item: any) => ({ label: item.operatorName, value: item.operatorId }));
        }
        return result;
    }

    // 执行迁移
    public async execMigration(migrationForm: MigrationFormModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = MemberService.validateMigrationForm(migrationForm);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let { uid, operatorId, memo } = migrationForm;
        await Caxios.post<any>(
            {
                url: Urls.member.migration.exec,
                data: { uid, operatorId, memo }
            },
            CaxiosType.FullLoadingToken,
            isCode
        );
        return true;
    }
}
