import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { SessionStorage } from 'jts-storage';

import Locales from '@/locales';
import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { Clipboard } from '@/ts/common';
import { TransferModel } from '@/ts/models';

import { CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const i18n = Locales.buildLocale();
const transferModule = namespace('transfer');

@Component({
    name: 'TransferDetail',
    components: { CellGroup, Cell, Header }
})
export default class TransferDetail extends Vue {
    @State('dataStatuses') dataStatuses!: Map<string, string>;
    @State('fundTypes') fundTypes!: Map<string, string>;

    @transferModule.State('transfer') transfer?: TransferModel | null;
    @transferModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @transferModule.Mutation(TYPES.CLEAR_STATES) clearStates!: (withoutSelected: boolean) => any;

    // 初始化数据
    initData() {
        let transfer = this.transfer;
        if (!transfer) {
            transfer = SessionStorage.getItem<TransferModel>(CONSTANTS.TRANSFER);
        }
        this.setStates({ transfer });
    }

    created() {
        this.initData();
    }

    mounted() {
        Clipboard.copy('transferOrderId', i18n.tc('COMMON.TRANSACTION_ID')); // id添加前缀，防止复制元素重复
        Clipboard.copy('fromUid', i18n.tc('TRANSFER.FROM_UID'));
        Clipboard.copy('toUid', i18n.tc('TRANSFER.TO_UID'));
    }
}
