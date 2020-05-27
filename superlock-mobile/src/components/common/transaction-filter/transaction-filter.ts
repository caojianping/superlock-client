import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component, Model, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { TransactionTypeModel } from '@/ts/models';

import { Popup, Button } from 'vant';
import Spin from '@/components/common/spin';

const transactionModule = namespace('transaction');

@Component({
    name: 'TransactionFilter',
    components: { Popup, Button, Spin }
})
export default class TransactionFilter extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model

    @transactionModule.State('transactionTypes') transactionTypes!: Array<TransactionTypeModel>;
    @transactionModule.State('transactionType') transactionType!: TransactionTypeModel;
    @transactionModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @transactionModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @transactionModule.Action('fetchTransactionTypes') fetchTransactionTypes!: () => any;

    isShow: boolean = this.value;
    isSpinning: boolean = false;

    // 处理弹出框close事件
    handlePopupClose() {
        this.isShow = false;
        this.$emit('close', false);
    }

    // 选择类型
    chooseType(transactionType: TransactionTypeModel) {
        this.isShow = false;
        this.$emit('close', false);
        this.$emit('change', transactionType);
    }

    // 获取数据
    async fetchData() {
        let transactionTypes = this.transactionTypes;
        if (transactionTypes.length <= 0) {
            this.isSpinning = true;
            await this.fetchTransactionTypes();
            this.isSpinning = false;
        }
    }

    mounted() {
        this.fetchData();
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            this.fetchData();
        }
    }
}
