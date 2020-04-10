import Vue from 'vue';
import { State } from 'vuex-class';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';
import { LockModel } from '@/ts/models';

import { Popup, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

@Component({
    name: 'LockInfo',
    components: { Popup, CellGroup, Cell, Header }
})
export default class LockInfo extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly lock!: LockModel;

    @State('unitTypes') unitTypes!: Array<string>;

    isShow: boolean = this.value; // 是否显示弹出框

    lockStatuses: any = {
        0: '订单已创建',
        10: '订单处理中',
        20: '锁仓计息中',
        30: '锁仓到期',
        40: '锁仓失败',
        50: '贷款质押中'
    };
    lockStyles: any = {
        0: 'black',
        10: 'gray',
        20: 'green',
        30: 'red',
        40: 'pink',
        50: 'orange'
    };

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
