import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component, Model, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { InitModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const homeModule = namespace('home');

@Component({
    name: 'InitModal',
    components: { SecondVerify }
})
export default class InitModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model

    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;

    @homeModule.State('init') init!: InitModel;
    @homeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @homeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: (payload: any) => any;
    @homeModule.Action('fetchInitData') fetchInitData!: () => any;
    @homeModule.Action('setInitData') setInitData!: (isCode?: boolean) => any;

    isShow: boolean = this.value; // 是否显示模态框

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let init = Utils.duplicate(this.init);
        init[key] = value;
        this.setStates({ init });
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交初始化数据
    async submit(isCode?: boolean) {
        try {
            let result = await this.setInitData(isCode);
            if (!result) Prompt.error('初始化数据设置失败');
            else {
                Prompt.success('初始化数据设置成功');
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
            this.fetchInitData();
        }
    }
}
