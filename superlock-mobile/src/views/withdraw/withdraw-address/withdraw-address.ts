import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { WithdrawSource, OperationType } from '@/ts/config';
import { WithdrawAddressModel } from '@/ts/models';

import { CellGroup, Cell, Checkbox } from 'vant';
import Header from '@/components/common/header';
import WithdrawSetting from '@/components/withdraw/withdraw-setting';

const withdrawModule = namespace('withdraw');

@Component({
    name: 'WithdrawAddress',
    components: { CellGroup, Cell, Checkbox, Header, WithdrawSetting }
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
    fetchWithdrawAddresses!: (isLoading: boolean) => any;

    source: WithdrawSource = WithdrawSource.Mine;
    isShow: boolean = false;
    operationType: OperationType = OperationType.Add;

    // 打开提现设置组件
    openWithdrawSetting() {
        this.isShow = true;
        this.operationType = OperationType.Add;
    }

    // 处理提现设置组件submit事件
    handleWithdrawSettingSubmit() {
        this.fetchWithdrawAddresses(true);
    }

    // 选择提现地址
    chooseAddress(withdrawAddress: WithdrawAddressModel) {
        this.setStates({ selectedWithdrawAddress: withdrawAddress });
        this.$router.push('/withdraw/index');
    }

    created() {
        let params = this.$route.params || {},
            source = isNaN(Number(params.source))
                ? WithdrawSource.Mine
                : Number(params.source);
        this.source = source;
    }

    mounted() {
        this.fetchWithdrawAddresses(true);
    }
}
