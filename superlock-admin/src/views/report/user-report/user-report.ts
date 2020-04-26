import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { IPageParameters, IUserReportPageParameters, ISelectOption } from '@/ts/interfaces';
import { UserReportModel } from '@/ts/models';

const reportModule = namespace('report');

@Component({
    name: 'UserReport',
    components: {}
})
export default class UserReport extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;

    @reportModule.State('userParameters') userParameters!: IPageParameters<IUserReportPageParameters>;
    @reportModule.State('totalCount') totalCount!: number;
    @reportModule.State('list') list!: Array<UserReportModel>;

    @reportModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @reportModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @reportModule.Action('fetchUserReports') fetchUserReports!: () => any;
    @reportModule.Action('exportUserReports') exportUserReports!: () => any;

    typeOptions: Array<ISelectOption> = [
        { label: '全部', value: '' },
        { label: '券商', value: '券商' },
        { label: '代理', value: '代理' }
    ];

    columns: Array<any> = [
        {
            title: '日期',
            dataIndex: 'date'
        },
        {
            title: '用户类型',
            dataIndex: 'type'
        },
        {
            title: '新增人数',
            dataIndex: 'count'
        }
    ];

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let userParameters = Utils.duplicate(this.userParameters);
        userParameters.conditions[key] = value;
        this.setStates({ userParameters });
    }

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let userParameters = Utils.duplicate(this.userParameters);
        userParameters.conditions.beginTime = dateStrings[0];
        userParameters.conditions.endTime = dateStrings[1];
        this.setStates({ userParameters });
    }

    // 搜索
    async search() {
        try {
            let userParameters = Utils.duplicate(this.userParameters);
            userParameters.pageNum = 1;
            this.setStates({ userParameters });
            await this.fetchUserReports();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportUserReports();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let userParameters = Utils.duplicate(this.userParameters);
        userParameters.pageNum = page;
        userParameters.pageSize = pageSize;
        this.setStates({ userParameters });
        this.fetchUserReports();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let userParameters = Utils.duplicate(this.userParameters);
        userParameters.pageNum = 1;
        userParameters.pageSize = pageSize;
        this.setStates({ userParameters });
        this.fetchUserReports();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchUserReports();
    }
}
