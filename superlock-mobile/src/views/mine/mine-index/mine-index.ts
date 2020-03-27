import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { UserInfo } from '@/ts/models';

import { Icon, CellGroup, Cell } from 'vant';
import Navs from '@/components/layout/navs';

const userModule = namespace('user');

@Component({
    name: 'MineIndex',
    components: { Icon, CellGroup, Cell, Navs }
})
export default class MineIndex extends Vue {
    @userModule.State('userInfo') userInfo!: UserInfo;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: () => any;

    mounted() {
        this.fetchUserInfo();
    }
}
