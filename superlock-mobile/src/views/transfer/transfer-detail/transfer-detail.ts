import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { SessionStorage } from 'jts-storage';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { CONSTANTS } from '@/ts/config';
import { Clipboard } from '@/ts/common';
import { TransferModel } from '@/ts/models';

import { CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const transferModule = namespace('transfer');

@Component({
    name: 'TransferDetail',
    components: { CellGroup, Cell, Header }
})
export default class TransferDetail extends Vue {
    @transferModule.State('transfers') transfers?: Array<TransferModel>;
    @transferModule.State('transfer') transfer?: TransferModel | null;
    @transferModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @transferModule.Mutation(TYPES.CLEAR_STATES) clearStates!: (withoutSelected: boolean) => any;

    // 初始化数据
    initData() {
        let params: any = this.$route.params || {},
            transfers = Utils.duplicate(this.transfers || []),
            transfer: any = transfers.filter((transfer: TransferModel) => transfer.orderId === params.id)[0];
        if (!transfer) {
            transfer = SessionStorage.getItem<TransferModel>(CONSTANTS.TRANSFER);
        }
        this.setStates({ transfer });
    }

    created() {
        this.initData();
    }

    mounted() {
        Clipboard.copy('orderId', '交易单号');
        Clipboard.copy('fromUid', '发款UID');
        Clipboard.copy('toUid', '收款UID');
    }
}
