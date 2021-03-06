import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Locales from '@/locales';

interface IRoute {
    path: string; // 路径
    icon: string; // 图标
    title: string; // 标题
}

const i18n = Locales.buildLocale();

@Component({
    name: 'Navs',
    components: {}
})
export default class Navs extends Vue {
    routes: Array<IRoute> = [
        { path: '/home/index', icon: 'home', title: i18n.tc('COMMON.MONEY') },
        { path: '/asset/index', icon: 'asset', title: i18n.tc('COMMON.ASSET') },
        { path: '/mine/index', icon: 'mine', title: i18n.tc('COMMON.MINE') }
    ];
    activePath: string = '';

    // 跳转至指定页面（router-link跳转无法产生动画效果）
    goPage(path: string) {
        let self = this;
        setTimeout(function() {
            self.$router.push(path);
        }, 300);
    }

    mounted() {
        let route = this.$route;
        this.activePath = route.path;
    }
}
