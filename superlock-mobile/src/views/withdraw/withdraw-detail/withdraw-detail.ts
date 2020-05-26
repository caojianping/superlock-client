import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace, State } from 'vuex-class';
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
    @State('dataStatuses') dataStatuses!: Map<string, string>;
    @State('fundTypes') fundTypes!: Map<string, string>;

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
        Clipboard.copy('withdrawOrderId', i18n.tc('COMMON.TRANSACTION_ID'));// id添加前缀，防止复制元素重复
        Clipboard.copy('withdrawTxhash', i18n.tc('COMMON.TRANSACTION_HASH'));// id添加前缀，防止复制元素重复
    }
}
