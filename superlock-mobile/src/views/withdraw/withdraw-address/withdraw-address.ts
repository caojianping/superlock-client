import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import TYPES from '@/store/types';
import { WithdrawModel, WithdrawAddressModel } from '@/ts/models';

import { CellGroup, Cell, Checkbox } from 'vant';
import Header from '@/components/common/header';
import { WithdrawSource } from '@/ts/config';

const withdrawModule = namespace('withdraw');

@Component({
    name: 'WithdrawAddress',
    components: { CellGroup, Cell, Checkbox, Header }
})
export default class WithdrawAddress extends Vue {
    @withdrawModule.State('withdrawAddresses') withdrawAddresses!: Array<
        WithdrawAddressModel
    >;
    @withdrawModule.State('selectedWithdrawAddress')
    selectedWithdrawAddress?: WithdrawAddressModel;

    @withdrawModule.Mutation(TYPES.SET_STATES) setStates!: (
        payload: any
    ) => any;
    @withdrawModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @withdrawModule.Action('fetchWithdrawAddresses')
    fetchWithdrawAddresses!: () => any;

    source: WithdrawSource = WithdrawSource.Mine;
    isShow: boolean = false;

    // 打开地址弹出框
    openAddressPopup() {
        this.isShow = true;
    }

    // 选择提现地址
    chooseAddress(withdrawAddress: WithdrawAddressModel) {
        this.setStates({ selectedWithdrawAddress: withdrawAddress });
        if (this.source === WithdrawSource.Withdraw) {
            this.$router.push('/withdraw/index');
        }
    }

    created() {
        let psource = this.$route.params.source,
            source = isNaN(Number(psource))
                ? WithdrawSource.Mine
                : Number(psource);
        this.source = source;
    }

    mounted() {
        this.fetchWithdrawAddresses();
    }
}
