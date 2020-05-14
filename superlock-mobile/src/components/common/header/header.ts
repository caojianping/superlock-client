import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { NavBar, Icon } from 'vant';

@Component({
    name: 'Header',
    components: { NavBar, Icon }
})
export default class Header extends Vue {
    @Prop() title!: string; // 组件参数：标题
    @Prop({ type: Boolean, default: false }) isBlue!: boolean; // 组件参数：是否显示蓝色背景
    @Prop({ type: Boolean, default: true }) isLeft!: boolean; // 组件参数：是否包含左侧区域
    @Prop({ type: Boolean, default: false }) isRight!: boolean; // 组件参数：是否包含右侧区域
    @Prop({ type: Boolean, default: true }) isBorder!: boolean; // 组件参数：是否显示边框

    // 处理左侧点击事件
    handleLeftClick() {
        this.$emit('left');
    }

    // 处理右侧点击事件
    handleRightClick() {
        this.$emit('right');
    }
}
