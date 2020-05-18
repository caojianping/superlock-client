import Vue from 'vue';
import { State, namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { SessionStorage } from 'jts-storage';

import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { Clipboard } from '@/ts/common';
import { LockModel } from '@/ts/models';

import { CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const lockModule = namespace('lock');

@Component({
    name: 'LockDetail',
    components: { CellGroup, Cell, Header }
})
export default class LockDetail extends Vue {
    @State('unitTypes') unitTypes!: Array<string>;

    @lockModule.State('lockStatuses') lockStatuses!: Map<number, string>;
    @lockModule.State('lockColors') lockColors!: Map<number, string>;
    @lockModule.State('lock') lock?: LockModel | null;
    @lockModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @lockModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    // 初始化数据
    initData() {
        let lock = this.lock;
        if (!lock) {
            lock = SessionStorage.getItem<LockModel>(CONSTANTS.LOCK);
        }
        this.setStates({ lock });
    }

    created() {
        this.initData();
    }

    mounted() {
        Clipboard.copy('orderId', '锁仓订单号');
    }
}
