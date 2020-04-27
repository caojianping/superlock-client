import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component, Model, Watch, Prop } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { VirtualType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { VirtualModel, VirtualSectionModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const homeModule = namespace('home');

@Component({
    name: 'VirtualModal',
    components: { SecondVerify }
})
export default class VirtualModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly type!: VirtualType;

    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;

    @homeModule.State('virtual') virtual!: VirtualModel;
    @homeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @homeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: (payload: any) => any;
    @homeModule.Action('fetchVirtualData') fetchVirtualData!: () => any;
    @homeModule.Action('setVirtualData') setVirtualData!: (isCode: boolean) => any;

    isShow: boolean = this.value; // 是否显示模态框

    get msg() {
        return ['锁仓', '注册'][this.type - 1];
    }

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        console.log(key, typeof value, value);
        let virtual = Utils.duplicate(this.virtual);
        virtual[key] = value;
        this.setStates({ virtual });
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 处理时间段change事件
    handleSectionChange(cindex: number, key: string, value: any) {
        console.log(cindex, key, typeof value, value);
        let virtual = Utils.duplicate(this.virtual),
            sections: Array<VirtualSectionModel> = virtual.virtualDtos || [];
        sections.forEach((section: VirtualSectionModel, index: number) => {
            if (cindex === index) {
                section[key] = value;
            }
        });
        this.setStates({ virtual });
    }

    // 添加时间段
    addSection() {
        let virtual = Utils.duplicate(this.virtual);
        if (!Array.isArray(virtual.virtualDtos)) {
            virtual.virtualDtos = [];
        }
        virtual.virtualDtos.push(new VirtualSectionModel());
        this.setStates({ virtual });
    }

    // 删除时间段
    removeSection(cindex: number) {
        let virtual = Utils.duplicate(this.virtual);
        if (!Array.isArray(virtual.virtualDtos)) {
            virtual.virtualDtos = [];
        }
        virtual.virtualDtos.splice(cindex, 1);
        this.setStates({ virtual });
    }

    // 提交模拟数据
    async submit(isCode: boolean) {
        try {
            let result = await this.setVirtualData(isCode);
            if (!result) Prompt.error(`${this.msg}模拟数据设置失败`);
            else {
                Prompt.success(`${this.msg}模拟数据设置成功`);
                this.$emit('close', false);
                this.$emit('submit');
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit() {
        await this.submit(true);
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            this.fetchVirtualData();
        }
    }
}
