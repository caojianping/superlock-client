import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component, Model, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { MigrationInfoModel, MigrationFormModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const memberModule = namespace('member');

@Component({
    name: 'MigrationModal',
    components: { SecondVerify }
})
export default class MigrationModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model

    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;

    @memberModule.State('migrationInfo') migrationInfo?: MigrationInfoModel | null;
    @memberModule.State('migrationForm') migrationForm!: MigrationFormModel;
    @memberModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @memberModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @memberModule.Action('fetchMigrationInfo') fetchMigrationInfo!: () => any;
    @memberModule.Action('execMigration') execMigration!: (isCode?: boolean) => any;

    isShow: boolean = this.value; // 是否显示模态框

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let migrationForm = Utils.duplicate(this.migrationForm);
        migrationForm[key] = value;
        this.setStates({ migrationForm });
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交迁移表单
    async submit(isCode?: boolean) {
        try {
            let result = await this.execMigration(isCode);
            if (!result) Prompt.error('券商迁移失败');
            else {
                Prompt.success('券商迁移成功');
                this.$emit('close', false);
                this.$emit('submit');
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            let migrationForm = new MigrationFormModel();
            this.setStates({ migrationForm });
            this.fetchMigrationInfo();
        }
    }
}
