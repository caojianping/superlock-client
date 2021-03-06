import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component, Model, Watch } from 'vue-property-decorator';

import Locales from '@/locales';
import TYPES from '@/store/types';
import { EarningsStatsModel } from '@/ts/models';

import { Popup, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const i18n = Locales.buildLocale();
const projectModule = namespace('project');

@Component({
    name: 'EarningsInfo',
    components: { Popup, CellGroup, Cell, Header }
})
export default class EarningsInfo extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model

    @projectModule.State('earningsStats') earningsStats?: EarningsStatsModel | null;
    @projectModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @projectModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @projectModule.Action('fetchEarningsStats') fetchEarningsStats!: () => any;

    isShow: boolean = this.value; // 是否显示弹出框
    earningsTypes: Array<string> = [
        i18n.tc('ARRAY.EARNINGS_TYPES.0'),
        i18n.tc('ARRAY.EARNINGS_TYPES.1'),
        i18n.tc('ARRAY.EARNINGS_TYPES.2'),
        i18n.tc('ARRAY.EARNINGS_TYPES.3'),
        i18n.tc('ARRAY.EARNINGS_TYPES.4')
    ];

    // 处理弹出框close事件
    handlePopupClose() {
        this.isShow = false;
        this.$emit('close', false);
    }

    // 获取数据
    async fetchData() {
        let earningsStats = this.earningsStats;
        if (!earningsStats) {
            await this.fetchEarningsStats();
        }
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            this.fetchData();
        }
    }
}
