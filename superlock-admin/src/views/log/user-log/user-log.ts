import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { IPageParameters, IUserLogPageParameters } from '@/ts/interfaces';
import { UserLogModel } from '@/ts/models';
import { Prompt } from '@/ts/common';

const logModule = namespace('log');

@Component({
    name: 'UserLog',
    components: {}
})
export default class UserLog extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;

    @logModule.State('userParameters') userParameters!: IPageParameters<IUserLogPageParameters>;
    @logModule.State('totalCount') totalCount!: number;
    @logModule.State('list') list!: Array<UserLogModel>;

    @logModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @logModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @logModule.Action('fetchUserLogs') fetchUserLogs!: () => any;
    @logModule.Action('exportUserLogs') exportUserLogs!: () => any;

    columns: Array<any> = [
        {
            title: '用户UID',
            dataIndex: 'uid'
        },
        {
            title: '操作平台',
            dataIndex: 'source'
        },
        {
            title: '操作',
            dataIndex: 'operate'
        },
        {
            title: '机器IP',
            dataIndex: 'ip'
        },
        {
            title: '时间',
            dataIndex: 'createTime'
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
            await this.fetchUserLogs();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportUserLogs();
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
        this.fetchUserLogs();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let userParameters = Utils.duplicate(this.userParameters);
        userParameters.pageNum = current;
        userParameters.pageSize = pageSize;
        this.setStates({ userParameters });
        this.fetchUserLogs();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchUserLogs();
    }
}
