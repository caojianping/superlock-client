import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace, State } from 'vuex-class';
import { SessionStorage } from 'jts-storage';
import { ValidationResult } from 'jpts-validator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { CONSTANTS } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { ProjectModel, LockFormModel } from '@/ts/models';
import { LockService } from '@/ts/services';

import { Field, Button } from 'vant';
import Header from '@/components/common/header';
import Password from '@/components/common/password';

const lockModule = namespace('lock');

@Component({
    name: 'LockCreate',
    components: { Field, Button, Header, Password }
})
export default class LockCreate extends Vue {
    @State('lockUnits') lockUnits!: Array<string>;
    @lockModule.State('lockProject') lockProject!: ProjectModel;
    @lockModule.State('lockForm') lockForm!: LockFormModel;

    @lockModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @lockModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @lockModule.Action('createLock') createLock!: () => any;

    isShow: boolean = false; // 是否显示密码模态框

    // 处理Field控件input事件
    handleFieldInput(key: string, value: string) {
        let lockForm = Utils.duplicate(this.lockForm);
        lockForm[key] = value;
        this.setStates({ lockForm });
    }

    // 打开密码模态框
    async openPassword() {
        let result: ValidationResult = LockService.validateLockForm(
            this.lockForm,
            false
        );
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        this.isShow = true;
    }

    // 处理密码模态框submit事件
    async handlePasswordSubmit(password: string) {
        let lockForm = Utils.duplicate(this.lockForm);
        lockForm.fundPasswd = password;
        this.setStates({ lockForm });

        try {
            let result = await this.createLock();
            if (result) Prompt.success('锁仓成功');
            else Prompt.success('锁仓失败');
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 初始化数据
    initData() {
        // 锁仓项目缓存数据校验处理
        if (!this.lockProject || Utils.isEmptyObject(this.lockProject)) {
            let lockProjectCache = SessionStorage.getItem<ProjectModel>(
                CONSTANTS.LOCK_PROJECT
            );
            if (!lockProjectCache) {
                Prompt.error('异常的锁仓项目信息，数据丢失');
                this.$router.push('/home/index');
                return;
            }

            this.setStates({ lockProject: lockProjectCache });
        }

        let lockProject = this.lockProject,
            lockForm = new LockFormModel();
        lockForm.length = lockProject.length;
        lockForm.unit = lockProject.unit;
        lockForm.rate = lockProject.rate;
        this.setStates({ lockForm });
    }

    created() {
        this.initData();
    }
}
