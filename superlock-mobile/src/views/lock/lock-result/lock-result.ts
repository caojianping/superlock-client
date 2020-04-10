import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { SessionStorage } from 'jts-storage';
import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { LockResultModel } from '@/ts/models';

import { Popup, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const lockModule = namespace('lock');

@Component({
    name: 'LockResult',
    components: { Popup, CellGroup, Cell, Header }
})
export default class LockResult extends Vue {
    @State('unitTypes') unitTypes!: Array<string>;
    @lockModule.State('lockResult') lockResult?: LockResultModel | null;
    @lockModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @lockModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    // 初始化数据
    initData() {
        let lockResult = this.lockResult;
        if (!lockResult) {
            lockResult = SessionStorage.getItem<LockResultModel>(CONSTANTS.LOCK_RESULT);
        }
        this.setStates({ lockResult });
    }

    created() {
        this.initData();
    }
}
