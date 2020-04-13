import Validator, { ValidationResult } from 'jpts-validator';
import { Urls, CaxiosType, CONSTANTS } from '@/ts/config';
import { Caxios, Utils } from '@/ts/common';
import { HomeModel, InitInfoForm } from '@/ts/models';

export class HomeService {
    // 验证初始信息表单
    public static validateInitInfoForm(
        initInfoForm: InitInfoForm,
        isCode: boolean
    ): ValidationResult {
        if (!initInfoForm)
            return { status: false, data: { initInfoForm: '参数不可以为空' } };

        const key = 'initInfo';
        let { initialTotalLock, initialRegisteredUser, code } = initInfoForm,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'initialTotalLock', value: initialTotalLock },
            { required: true, min: 0 },
            {
                required: '初始锁仓总额不可以为空',
                min: '项初始锁仓总额不可以小于0'
            }
        );
        validator.addRule(
            key,
            { name: 'initialRegisteredUser', value: initialRegisteredUser },
            { required: true, min: 0 },
            {
                required: '初始注册用户不可以为空',
                min: '初始注册用户不可以小于0'
            }
        );
        if (isCode) {
            validator.addRule(
                key,
                { name: 'code', value: code },
                { required: true },
                { required: '验证码不可以为空' }
            );
        }
        return validator.execute(key);
    }

    // 获取首页数据
    public async fetchHomeData(): Promise<HomeModel> {
        let result = await Caxios.get<HomeModel | null>(
            { url: Urls.home.info },
            CaxiosType.Token
        );
        return result || new HomeModel();
    }

    // 获取初始信息数据
    public async fetchInitInfo(): Promise<InitInfoForm> {
        let result = await Caxios.get<InitInfoForm | null>(
                { url: Urls.home.init.info },
                CaxiosType.Token
            ),
            initInfoForm = new InitInfoForm();
        if (result) {
            initInfoForm.initialTotalLock = Number(result.initialTotalLock);
            initInfoForm.initialRegisteredUser = Number(
                result.initialRegisteredUser
            );
        }
        return initInfoForm;
    }

    // 获取初始信息数据
    public async setInitInfo(
        initInfoForm: InitInfoForm,
        isCode: boolean = false
    ): Promise<boolean> {
        let result: ValidationResult = HomeService.validateInitInfoForm(
            initInfoForm,
            isCode
        );
        if (!result.status)
            return Promise.reject(Utils.getFirstValue(result.data));

        let { initialTotalLock, initialRegisteredUser, code } = initInfoForm;
        await Caxios.post<InitInfoForm | null>(
            {
                headers: isCode ? { [CONSTANTS.HEADER_CODE]: code } : {},
                url: Urls.home.init.set,
                data: {
                    initialTotalLock,
                    initialRegisteredUser
                }
            },
            CaxiosType.Token
        );
        return true;
    }
}
