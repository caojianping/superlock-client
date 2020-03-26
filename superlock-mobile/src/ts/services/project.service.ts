import { Urls, CaxiosType } from '@/ts/config';
import { Caxios } from '@/ts/common';
import { ProjectStatsModel } from '@/ts/models';

export class ProjectService {
    // 获取资产统计信息
    public async fetchProjectStats(): Promise<ProjectStatsModel | null> {
        return await Caxios.get<ProjectStatsModel | null>(
            { url: Urls.project.stats },
            CaxiosType.Token
        );
    }
}
