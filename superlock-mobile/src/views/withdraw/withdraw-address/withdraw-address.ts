import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import Locales from '@/locales';
import TYPES from '@/store/types';
import { OperationType } from '@/ts/config';
import { WithdrawAddressModel } from '@/ts/models';

import { Toast, PullRefresh, CellGroup, Cell, Checkbox } from 'vant';
import Header from '@/components/common/header';
import WithdrawModal from '@/components/common/withdraw-modal';

const i18n = Locales.buildLocale();
const withdrawModule = namespace('withdraw');

@Component({
    name: 'WithdrawAddress',
    components: { PullRefresh, CellGroup, Cell, Checkbox, Header, WithdrawModal }
})
export default class WithdrawAddress extends Vue {
    @withdrawModule.State('withdrawAddresses') withdrawAddresses?: Array<WithdrawAddressModel>;
    @withdrawModule.State('selectedWithdrawAddress') selectedWithdrawAddress?: WithdrawAddressModel;
    @withdrawModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @withdrawModule.Mutation(TYPES.CLEAR_STATES) clearStates!: (withoutSelected: boolean) => any;
    @withdrawModule.Action('fetchWithdrawAddresses') fetchWithdrawAddresses!: (isLoading: boolean) => any;

    from: string = ''; // 页面来源
    isPulling: boolean = false; // 是否下拉刷新
    isShow: boolean = false; // 是否显示提现设置组件
    operationType: OperationType = OperationType.Add;

    // 打开提现模态框
    openWithdrawModal() {
        this.isShow = true;
        this.operationType = OperationType.Add;
    }

    // 处理提现模态框submit事件
    handleWithdrawModalSubmit() {
        this.fetchWithdrawAddresses(true);
    }

    // 选择提现地址
    chooseAddress(withdrawAddress: WithdrawAddressModel) {
        this.setStates({ selectedWithdrawAddress: withdrawAddress });
        this.$router.push('/withdraw/index');
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        (!this.withdrawAddresses || isRefresh) && (await this.fetchWithdrawAddresses(true));
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData(true);
        this.isPulling = false;
        Toast(i18n.tc('COMMON.REFRESH_SUCCESS'));
    }

    // 初始化数据
    initData() {
        let query: any = this.$route.query || {};
        this.from = query.from || '';
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchData(false);
    }
}
