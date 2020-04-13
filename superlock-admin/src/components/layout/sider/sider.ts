import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Utils } from '@/ts/common';

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
                { name: '充值记录', route: '/recharge/record', items: null },
                { name: '手续费设置', route: '/recharge/poundage', items: null }
            ],
            toggle: false
        },
        {
            name: '提现管理',
            route: null,
            path: '/withdraw',
            icon: 'withdraw',
            items: [
                // { name: '提现记录', route: '/withdraw/record', items: null },
                { name: '提现订单', route: '/withdraw/record', items: null },
                { name: '转账记录', route: '/withdraw/transfer', items: null }
            ],
            toggle: false
        },
        {
            name: '锁仓管理',
            route: null,
            path: '/lock',
            icon: 'lock',
            items: [
                { name: '锁仓记录', route: '/lock/record', items: null },
                { name: '锁仓创建', route: '/lock/create', items: null },
                { name: '奖励设置', route: '/lock/award', items: null },
                { name: '项目列表', route: '/lock/project', items: null }
            ],
            toggle: false
        },
        {
            name: '账务管理',
            route: null,
            path: '/finance',
            icon: 'finance',
            items: [
                { name: '利息支出', route: '/finance/interest', items: null },
                { name: '直推奖励', route: '/finance/direct', items: null },
                { name: '推广奖励', route: '/finance/promote', items: null },
                { name: '日销奖励', route: '/finance/sale', items: null }
            ],
            toggle: false
        },
        // {
        //     name: '贷款管理',
        //     route: null,
        //     path: '/loan',
        //     icon: 'loan',
        //     items: [
        //         { name: '贷款记录', route: '/loan/record', items: null },
        //         { name: '贷款计息', route: '/loan/interest', items: null },
        //         { name: '贷款设置', route: '/loan/setting', items: null }
        //     ],
        //     toggle: false
        // },
        {
            name: '资金管理',
            route: null,
            path: '/fund',
            icon: 'fund',
            items: [{ name: '资金记录', route: '/fund/record', items: null }],
            toggle: false
        },
        {
            name: '风控管理',
            route: null,
            path: '/risk',
            icon: 'risk',
            items: [{ name: '审核设置', route: '/risk/audit', items: null }],
            toggle: false
        },
        {
            name: '用户中心',
            route: null,
            path: '/member',
            icon: 'member',
            items: [
                { name: '券商列表', route: '/member/broker/0', items: null },
                { name: '代理列表', route: '/member/broker/1', items: null },
                { name: '利率详情', route: '/member/rate', items: null }
            ],
            toggle: false
        },
        {
            name: '上分管理',
            route: null,
            path: '/point',
            icon: 'point',
            items: [
                { name: '上分记录', route: '/point/record', items: null },
                { name: '系统账号', route: '/point/account', items: null }
            ],
            toggle: false
        },
        {
            name: '系统设置',
            route: null,
            path: '/system',
            icon: 'system',
            items: [
                { name: '用户列表', route: '/system/user', items: null },
                // { name: 'google设置', route: '/system/google', items: null },
                { name: '更改密码', route: '/system/password', items: null }
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
