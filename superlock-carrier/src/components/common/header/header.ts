import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import { Prompt } from '@/ts/common';
import { TokenInfo } from '@/ts/models';

const loginModule = namespace('login');

@Component({
    name: 'Header',
    components: {}
})
export default class Header extends Vue {
    @State('tokenInfo') tokenInfo!: TokenInfo; // token消息
    @loginModule.Action('logout') logoutAction!: () => any; // 退出

    // 退出
    async logout() {
        let result = await this.logoutAction();
        if (!result) Prompt.error('退出失败');
        else this.$router.push({ path: '/login' });
    }
}
