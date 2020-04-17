import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { HomeModel } from '@/ts/models';

export class HomeService {
    // 获取首页数据
    public async fetchHomeData(): Promise<HomeModel> {
        let result = await Caxios.get<HomeModel | null>({ url: Urls.home.data }, CaxiosType.FullLoadingToken);
        return result || new HomeModel();
    }
}
