import Validator, { ValidationResult } from 'jpts-validator';
import Utils from '@/ts/utils';
import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { LockModel } from '@/ts/models';

export class LockService {
    // 获取锁仓列表
    public async fetchLocks(): Promise<Array<LockModel>> {
        let result = await Caxios.get<Array<LockModel> | null>(
            { url: Urls.lock.list },
            CaxiosType.Token
        );
        return result || [];
    }
}
