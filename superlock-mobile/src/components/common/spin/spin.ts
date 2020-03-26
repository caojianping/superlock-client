import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Loading } from 'vant';

@Component({
    name: 'Spin',
    components: { Loading }
})
export default class Spin extends Vue {
    @Prop() readonly isSpinning!: boolean;
    @Prop({ type: String, default: '加载中...' }) readonly text!: string;
}
