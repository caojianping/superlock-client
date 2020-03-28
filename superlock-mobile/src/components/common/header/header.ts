import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { NavBar, Icon } from 'vant';

@Component({
    name: 'Header',
    components: { NavBar, Icon }
})
export default class Header extends Vue {
    @Prop() title!: string; // 组件参数：标题
    @Prop({ type: Boolean, default: true }) border!: boolean; // 组件参数：是否显示底部边框
    @Prop({ type: Boolean, default: false }) back!: boolean; // 组件参数：是否自定义back事件，true自定义@back事件
    @Prop({ type: Boolean, default: false }) home!: boolean; // 组件参数：是否自定义home事件，true自定义@home事件

    // 返回
    goBack() {
        if (!this.back) this.$router.back();
        else this.$emit('back');
    }

    // 回首页
    goHome() {
        if (this.home) this.$router.push('/home/index');
        else this.$emit('home');
    }
}
