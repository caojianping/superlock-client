import Vue from 'vue';
import { Component, Model, Watch } from 'vue-property-decorator';

import { Popup, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

@Component({
    name: 'MobileVerify',
    components: { Popup, CellGroup, Cell, Header }
})
export default class MobileVerify extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model

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