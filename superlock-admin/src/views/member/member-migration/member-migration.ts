import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { IPageParameters, IMigrationPageParameters } from '@/ts/interfaces';
import { MigrationModel } from '@/ts/models';

const memberModule = namespace('member');

@Component({
    name: 'MemberMigration',
    components: {}
})
export default class MemberMigration extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;

    @memberModule.State('migrationParameters') migrationParameters!: IPageParameters<IMigrationPageParameters>;
    @memberModule.State('totalCount') totalCount!: number;
    @memberModule.State('list') list!: Array<MigrationModel>;
    @memberModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @memberModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @memberModule.Action('fetchMigrations') fetchMigrations!: () => any;
    @memberModule.Action('exportMigrations') exportMigrations!: () => any;

    columns: Array<any> = [
        {
            title: 'UID',
            dataIndex: 'uid'
        },
        {
            title: '手机号',
            dataIndex: '',
            key: 'mobile',
            scopedSlots: { customRender: 'mobile' }
        },
        {
            title: '邮箱账号',
            dataIndex: 'email'
        },
        {
            title: '来源平台',
            dataIndex: 'fromOperatorName'
        },
        {
            title: '来源平台ID',
            dataIndex: 'fromOperatorId'
        },
        {
            title: '迁移平台',
            dataIndex: 'toOperatorName'
        },
        {
            title: '迁移平台ID',
            dataIndex: 'toOperatorId'
        },
        {
            title: '迁移时间',
            dataIndex: '',
            key: 'createTime',
            scopedSlots: { customRender: 'createTime' }
        },
        {
            title: '迁移时总锁仓价值(DC)',
            dataIndex: 'dcAmount'
        },
        {
            title: '备注',
            dataIndex: 'memo'
        }
    ];

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let migrationParameters = Utils.duplicate(this.migrationParameters);
        migrationParameters.conditions[key] = value;
        this.setStates({ migrationParameters });
    }

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let migrationParameters = Utils.duplicate(this.migrationParameters);
        migrationParameters.conditions.beginTime = dateStrings[0];
        migrationParameters.conditions.endTime = dateStrings[1];
        this.setStates({ migrationParameters });
    }

    // 搜索
    async search() {
        try {
            let migrationParameters = Utils.duplicate(this.migrationParameters);
            migrationParameters.pageNum = 1;
            this.setStates({ migrationParameters });
            await this.fetchMigrations();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportMigrations();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let migrationParameters = Utils.duplicate(this.migrationParameters);
        migrationParameters.pageNum = page;
        migrationParameters.pageSize = pageSize;
        this.setStates({ migrationParameters });
        this.fetchMigrations();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let migrationParameters = Utils.duplicate(this.migrationParameters);
        migrationParameters.pageNum = 1;
        migrationParameters.pageSize = pageSize;
        this.setStates({ migrationParameters });
        this.fetchMigrations();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchMigrations();
    }
}
