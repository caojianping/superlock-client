import Vue from 'vue';
import { Component, Model, Watch, Prop } from 'vue-property-decorator';
import { Popup, Button } from 'vant';

@Component({
    name: 'Modal',
    components: { Popup, Button }
})
export default class Modal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop({ type: Boolean, default: false }) readonly closeable!: boolean;
    @Prop({ type: Boolean, default: true })
    readonly closeOnClickOverlay!: boolean;

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
