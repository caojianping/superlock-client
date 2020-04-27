import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType, VirtualType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { HomeModel, InitModel, VirtualModel, VirtualSectionModel } from '@/ts/models';

export class HomeService {
    // 验证初始化数据
    public static validateInit(init: InitModel): ValidationResult {
        if (!init) return { status: false, data: { initInfoForm: '参数不可以为空' } };

        let key = 'init',
            { initialTotalLock, initialRegisteredUser } = init,
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
        return validator.execute(key);
    }

    // 验证虚拟数据
    public static validateVirtual(type: VirtualType, virtual: VirtualModel): ValidationResult {
        if (!virtual) return { status: false, data: { initInfoForm: '参数不可以为空' } };

        console.log('virtual:', virtual);
        let msg = ['锁仓', '注册'][type - 1],
            initMsg = ['初始锁仓总额', '初始注册用户'][type - 1],
            key = 'virtual',
            initialAmount = virtual.initialAmount,
            virtualDtos = virtual.virtualDtos || [],
            count = (virtualDtos || []).length,
            validator = new Validator();
        validator.addRule(
            key,
            { name: 'initialAmount', value: initialAmount },
            { required: true, minExclude: 0 },
            {
                required: `${initMsg}不可以为空`,
                minExclude: `${initMsg}不可以小于等于0`
            }
        );

        validator.addRule(
            key,
            { name: 'count', value: count },
            { required: true, minExclude: 0 },
            { required: `${msg}时间段不可以为空`, minExclude: `${msg}时间段不可以小于等于0` }
        );
        virtualDtos.forEach((section: VirtualSectionModel, index: number) => {
            let { startTime, endTime, interval, minValue, maxValue } = section,
                text = `第${index + 1}条${msg}时间段的`;
            validator.addRule(key, { name: 'startTime', value: startTime }, { required: true }, { required: `${text}开始时间不可以为空` });
            validator.addRule(
                key,
                { name: 'endTime', value: endTime },
                { required: true, minExclude: startTime },
                {
                    required: `${text}结束时间不可以为空`,
                    minExclude: `${text}结束时间不可以小于等于${startTime}`
                }
            );
            validator.addRule(
                key,
                { name: 'interval', value: interval },
                { required: true, minExclude: 0 },
                {
                    required: `${text}时间间隔不可以为空`,
                    minExclude: `${text}时间间隔不可以小于等于0`
                }
            );
            validator.addRule(
                key,
                { name: 'minValue', value: minValue },
                { required: true, min: 0 },
                {
                    required: `${text}最小值不可以为空`,
                    min: `${text}最小值不可以小于0`
                }
            );
            validator.addRule(
                key,
                { name: 'maxValue', value: maxValue },
                { required: true, minExclude: minValue },
                {
                    required: `${text}最大值不可以为空`,
                    minExclude: `${text}最大值不可以小于等于${minValue}`
                }
            );
        });
        return validator.execute(key);
    }

    // 获取首页数据
    public async fetchHomeData(): Promise<HomeModel> {
        let result = await Caxios.get<HomeModel | null>({ url: Urls.home.info }, CaxiosType.FullLoadingToken);
        return result || new HomeModel();
    }

    // 获取初始化数据
    public async fetchInitData(): Promise<InitModel> {
        let result = await Caxios.get<InitModel | null>({ url: Urls.home.init.info }, CaxiosType.FullLoadingToken);
        return result || new InitModel();
    }

    // 获取初始化数据
    public async setInitData(init: InitModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = HomeService.validateInit(init);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        await Caxios.post<any>({ url: Urls.home.init.set, data: init }, CaxiosType.FullLoadingToken, isCode);
        return true;
    }

    // 获取模拟数据
    public async fetchVirtualData(type: VirtualType): Promise<VirtualModel> {
        let url = `${Urls.home.virtual.info}?type=${type - 1}`,
            result = await Caxios.get<VirtualModel | null>({ url }, CaxiosType.FullLoadingToken);
        return result || new VirtualModel();
    }

    // 设置模拟数据
    public async setVirtualData(type: VirtualType, virtual: VirtualModel, isCode: boolean = false): Promise<boolean> {
        let result: ValidationResult = HomeService.validateVirtual(type, virtual);
        if (!result.status) return Promise.reject(Utils.getFirstValue(result.data));

        let url = `${Urls.home.virtual.set}?type=${type - 1}`;
        await Caxios.post<any>({ url, data: virtual }, CaxiosType.FullLoadingToken, isCode);
        return true;
    }
}
