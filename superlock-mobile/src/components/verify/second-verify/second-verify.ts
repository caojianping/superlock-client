import Vue from 'vue';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';

import { Popup, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

@Component({
    name: 'SecondVerify',
    components: { Popup, CellGroup, Cell, Header }
})
export default class SecondVerify extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly verifyMode!: string; // 验证方式

    isShow: boolean = false; // 是否显示模态框

    // 处理弹出框close事件
    handlePopupClose() {
        this.isShow = false;
        this.$emit('close', false);
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
    }
}