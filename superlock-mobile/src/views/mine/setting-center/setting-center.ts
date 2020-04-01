import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import { CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';
import { Prompt } from '@/ts/common';

const userModule = namespace('user');

@Component({
    name: 'SettingCenter',
    components: { CellGroup, Cell, Header }
})
export default class SettingCenter extends Vue {
    @userModule.Action('logout') logoutAction!: () => any;

    // 退出
    async logout() {
        try {
            let self = this,
                result = await this.logoutAction();
            if (!result) Prompt.error('退出失败');
            else {
                Prompt.success('退出成功，稍后将跳转至登录页面重新登录');
                setTimeout(() => {
                    self.$router.push('/user/login');
                }, 1688);
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }
}
