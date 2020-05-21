import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { SessionStorage } from 'jts-storage';

import Locales from '@/locales';
import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { Clipboard } from '@/ts/common';
import { WithdrawModel } from '@/ts/models';

import { CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const i18n = Locales.buildLocale();
const withdrawModule = namespace('withdraw');

@Component({
    name: 'WithdrawDetail',
    components: { CellGroup, Cell, Header }
})
export default class WithdrawDetail extends Vue {
    @withdrawModule.State('withdraw') withdraw?: WithdrawModel | null;
    @withdrawModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @withdrawModule.Mutation(TYPES.CLEAR_STATES) clearStates!: (withoutSelected: boolean) => any;

    // 初始化数据
    initData() {
        let withdraw = this.withdraw;
        if (!withdraw) {
            withdraw = SessionStorage.getItem<WithdrawModel>(CONSTANTS.WITHDRAW);
        }
        this.setStates({ withdraw });
    }

    created() {
        this.initData();
    }

    mounted() {
        Clipboard.copy('orderId', i18n.tc('COMMON.TRASACTION_ID'));
        Clipboard.copy('txhash', i18n.tc('COMMON.TRASACTION_HASH'));
    }
}
