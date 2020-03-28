import Vue from 'vue';
import { Component, Model, Watch } from 'vue-property-decorator';
import { Popup, Button } from 'vant';

@Component({
    name: 'Modal',
    components: { Popup, Button }
})
export default class Modal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model

    isShow: boolean = false; // 是否显示弹出框

    // 关闭弹出框
    closePopup() {
        this.isShow = false;
        this.$emit('close', false);
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
    }
}
