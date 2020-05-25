import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import Locales from '@/locales';
import { Prompt } from '@/ts/common';

import { CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const i18n = Locales.buildLocale();
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
            if (!result) Prompt.error(i18n.tc('MINE.LOGOUT_FAILURE'));
            else {
                Prompt.success(i18n.tc('MINE.LOGOUT_SUCCESS'));
                setTimeout(() => {
                    self.$router.push('/user/login');
                }, 1688);
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }
}
