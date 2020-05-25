import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Loading } from 'vant';

import Locales from '@/locales';
const i18n = Locales.buildLocale();

@Component({
    name: 'Spin',
    components: { Loading }
})
export default class Spin extends Vue {
    @Prop() readonly isSpinning!: boolean;
    @Prop({ type: String, default: 'center' }) readonly position!: string; // 组件参数：显示位置
    @Prop({ type: String, default: i18n.tc('COMMON.LOADING') }) readonly text!: string; // 组件参数：显示文本
}
