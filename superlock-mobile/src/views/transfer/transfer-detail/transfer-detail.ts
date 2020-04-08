import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
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
    @transferModule.State('transfer') transfer!: TransferModel;

    @transferModule.Mutation(TYPES.SET_STATES) setStates!: (
        payload: any
    ) => any;
    @transferModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    created() {
        let id = this.$route.params.id,
            transfers = this.transfers || [],
            transfer =
                transfers.filter(
                    (transfer: TransferModel) => transfer.orderId === id
                )[0] || new TransferModel();
        this.setStates({ transfer });
    }
}
