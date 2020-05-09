import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { IPageParameters, ISystemLogPageParameters } from '@/ts/interfaces';
import { SystemLogModel } from '@/ts/models';
import { Prompt } from '@/ts/common';

const logModule = namespace('log');

@Component({
    name: 'SystemLog',
    components: {}
})
export default class SystemLog extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;

    @logModule.State('systemParameters') systemParameters!: IPageParameters<ISystemLogPageParameters>;
    @logModule.State('totalCount') totalCount!: number;
    @logModule.State('list') list!: Array<SystemLogModel>;

    @logModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @logModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @logModule.Action('fetchSystemLogs') fetchSystemLogs!: () => any;
    @logModule.Action('exportSystemLogs') exportSystemLogs!: () => any;

    columns: Array<any> = [
        {
            title: '用户名',
            dataIndex: 'userName'
        },
        {
            title: '操作平台',
            dataIndex: 'source'
        },
        {
            title: '操作',
            dataIndex: 'operating'
        },
        {
            title: '时间',
            dataIndex: 'createTime'
        }
    ];

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let systemParameters = Utils.duplicate(this.systemParameters);
        systemParameters.conditions[key] = value;
        this.setStates({ systemParameters });
    }

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let systemParameters = Utils.duplicate(this.systemParameters);
        systemParameters.conditions.beginTime = dateStrings[0];
        systemParameters.conditions.endTime = dateStrings[1];
        this.setStates({ systemParameters });
    }

    // 搜索
    async search() {
        try {
            let systemParameters = Utils.duplicate(this.systemParameters);
            systemParameters.pageNum = 1;
            this.setStates({ systemParameters });
            await this.fetchSystemLogs();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportSystemLogs();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let systemParameters = Utils.duplicate(this.systemParameters);
        systemParameters.pageNum = page;
        systemParameters.pageSize = pageSize;
        this.setStates({ systemParameters });
        this.fetchSystemLogs();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let systemParameters = Utils.duplicate(this.systemParameters);
        systemParameters.pageNum = current;
        systemParameters.pageSize = pageSize;
        this.setStates({ systemParameters });
        this.fetchSystemLogs();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchSystemLogs();
    }
}
