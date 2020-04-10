import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { OperationType } from '@/ts/config';
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
    @withdrawModule.State('withdrawAddresses') withdrawAddresses?: Array<WithdrawAddressModel>;
    @withdrawModule.State('selectedWithdrawAddress') selectedWithdrawAddress?: WithdrawAddressModel;
    @withdrawModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @withdrawModule.Mutation(TYPES.CLEAR_STATES) clearStates!: (withoutSelected: boolean) => any;
    @withdrawModule.Action('fetchWithdrawAddresses') fetchWithdrawAddresses!: (isLoading: boolean) => any;

    from: string = '';
    isShow: boolean = false;
    operationType: OperationType = OperationType.Add;

    // 返回
    goBack() {
        let from = this.from;
        this.$router.push({
            path: from,
            query: {
                cache: from === '/withdraw/index' ? 'true' : 'false'
            }
        });
    }

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
        this.$router.push({ path: '/withdraw/index', query: { cache: 'true' } });
    }

    // 初始化数据
    initData() {
        let query: any = this.$route.query || {};
        this.from = query.from || '';
    }

    created() {
        this.clearStates(true);
        this.initData();
    }

    mounted() {
        this.fetchWithdrawAddresses(true);
    }
}
