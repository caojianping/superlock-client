import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import Utils from '@/ts/utils';

@Component({
    name: 'Sider',
    components: {}
})
export default class Sider extends Vue {
    path: string = ''; // 路径
    menus: Array<any> = [
        {
            name: '首页',
            route: '/home',
            path: '/home',
            icon: 'home',
            items: null,
            toggle: false
        },
        {
            name: '锁仓管理',
            route: null,
            path: '/lock',
            icon: 'lock',
            items: [
                { name: '锁仓记录', route: '/lock/order' },
                { name: '奖励设置', route: '/lock/award' },
                { name: '项目列表', route: '/lock/project' }
            ],
            toggle: false
        },
        {
            name: '账务管理',
            route: null,
            path: '/finance',
            icon: 'finance',
            items: [
                { name: '利息支出', route: '/finance/interest' },
                { name: '直推奖励', route: '/finance/direct' },
                { name: '推广奖励', route: '/finance/promote' },
                { name: '日销奖励', route: '/finance/sale' }
            ],
            toggle: false
        },
        {
            name: '用户中心',
            route: null,
            path: '/member',
            icon: 'member',
            items: [
                { name: '券商列表', route: '/member/broker/0' },
                { name: '代理列表', route: '/member/broker/1' },
                { name: '利率详情', route: '/member/rate' }
            ],
            toggle: false
        },
        {
            name: '运营商管理',
            route: null,
            path: '/carrier',
            icon: 'carrier',
            items: [
                { name: '运营数据', route: '/carrier/index' },
                { name: '返点记录', route: '/carrier/rebate/order' },
                { name: '闪兑订单', route: '/carrier/flash/order' },
                { name: '提现订单', route: '/carrier/withdraw/order' }
            ],
            toggle: false
        },
        {
            name: '系统管理',
            route: null,
            path: '/system',
            icon: 'system',
            items: [{ name: '更改密码', route: '/system/password' }],
            toggle: false
        }
    ];

    // 切换菜单
    toggleMenu(activeMenu: any) {
        let items = activeMenu.items || [];
        if (items.length <= 0) return;

        let self = this,
            menus = Utils.duplicate(self.menus);
        menus.forEach((menu: any, index: number) => {
            if (menu.name === activeMenu.name) {
                menu.toggle = !menu.toggle;
                // self.$set(self.menus, index, menu);
            } else {
                menu.toggle !== null && (menu.toggle = false);
            }
        });
        self.menus = menus;
    }

    // 初始化数据
    initData(route: any) {
        let self = this,
            path = route.path;
        this.path = path;
        this.menus.forEach((menu: any, index: number) => {
            if (menu.items && path.indexOf(menu.path) > -1) {
                menu.toggle = true;
                self.$set(self.menus, index, menu);
            }
        });
    }

    mounted() {
        this.initData(this.$route);
    }

    @Watch('$route')
    watchRoute(route: any) {
        this.initData(route);
    }
}
