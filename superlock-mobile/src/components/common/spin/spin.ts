import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Loading } from 'vant';

@Component({
    name: 'Spin',
    components: { Loading }
})
export default class Spin extends Vue {
    @Prop() readonly isSpinning!: boolean;
    @Prop({ type: String, default: 'center' }) readonly position!: string; // 组件参数：显示位置
    @Prop({ type: String, default: '加载中...' }) readonly text!: string; // 组件参数：显示文本
}
