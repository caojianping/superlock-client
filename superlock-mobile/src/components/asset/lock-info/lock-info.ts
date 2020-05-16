import Vue from 'vue';
import { State, namespace } from 'vuex-class';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';
import { LockModel } from '@/ts/models';

import { Popup, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const lockModule = namespace('lock');

@Component({
    name: 'LockInfo',
    components: { Popup, CellGroup, Cell, Header }
})
export default class LockInfo extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly lock!: LockModel;

    @State('unitTypes') unitTypes!: Array<string>;

    @lockModule.State('lockStatuses') lockStatuses!: Map<number, string>;
    @lockModule.State('lockColors') lockColors!: Map<number, string>;

    isShow: boolean = this.value; // 是否显示弹出框

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
