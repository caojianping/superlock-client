import Vue from 'vue';
import { State, Mutation } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

import TYPES from '@/store/types';
import { Token } from '@/ts/common';
import { TokenInfo } from '@/ts/models';

@Component({ name: 'App' })
export default class App extends Vue {
    @State('tokenInfo') tokenInfo!: TokenInfo;
    @State('isFullLoading') isFullLoading!: boolean;
    @Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;

    locale: string = zh_CN;

    created() {
        let tokenInfo = Token.getTokenInfo();
        this.setStates({ tokenInfo });
    }
}
