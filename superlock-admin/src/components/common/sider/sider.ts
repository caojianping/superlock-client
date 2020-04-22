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
            name: '充值管理',
            route: null,
            path: '/recharge',
            icon: 'recharge',
            items: [
                { name: '充值订单', route: '/recharge/order' }
                // { name: '手续费设置', route: '/recharge/poundage' }
            ],
            toggle: false
        },
        {
            name: '提现管理',
            route: null,
            path: '/withdraw',
            icon: 'withdraw',
            items: [
                // { name: '提现记录', route: '/withdraw/record' },
                { name: '提现订单', route: '/withdraw/record' },
                { name: '转账记录', route: '/withdraw/transfer' }
            ],
            toggle: false
        },
        {
            name: '锁仓管理',
            route: null,
            path: '/lock',
            icon: 'lock',
            items: [
                { name: '锁仓订单', route: '/lock/order' },
                { name: '锁仓创建', route: '/lock/create' },
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
        // {
        //     name: '贷款管理',
        //     route: null,
        //     path: '/loan',
        //     icon: 'loan',
        //     items: [
        //         { name: '贷款订单', route: '/loan/order' },
        //         { name: '利息记录', route: '/loan/interest' },
        //         { name: '贷款设置', route: '/loan/setting' }
        //     ],
        //     toggle: false
        // },
        {
            name: '资金管理',
            route: null,
            path: '/fund',
            icon: 'fund',
            items: [{ name: '资金记录', route: '/fund/record' }],
            toggle: false
        },
        {
            name: '风控管理',
            route: null,
            path: '/risk',
            icon: 'risk',
            items: [{ name: '审核设置', route: '/risk/audit' }],
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
                { name: '运营商列表', route: '/carrier/list' },
                { name: '返点订单', route: '/carrier/rebate/order' },
                { name: '闪兑订单', route: '/carrier/flash/order' },
                { name: '提现订单', route: '/carrier/withdraw/order' }
            ],
            toggle: false
        },
        {
            name: '上分管理',
            route: null,
            path: '/point',
            icon: 'point',
            items: [
                { name: '上分记录', route: '/point/record' },
                { name: '系统账号', route: '/point/account' }
            ],
            toggle: false
        },
        {
            name: '系统管理',
            route: null,
            path: '/system',
            icon: 'system',
            items: [
                { name: '用户列表', route: '/system/user' },
                // { name: 'google设置', route: '/system/google' },
                { name: '更改密码', route: '/system/password' }
            ],
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
