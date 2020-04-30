import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { Token } from '@/ts/common';
import { UserInfoModel } from '@/ts/models';

import { Icon, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

const userModule = namespace('user');

@Component({
    name: 'SecurityCenter',
    components: { Icon, CellGroup, Cell, Header }
})
export default class SecurityCenter extends Vue {
    @userModule.State('userInfo') userInfo!: UserInfoModel;
    @userModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @userModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: () => any;

    goFund() {
        Token.setFundFrom('/security/center');
        this.$router.push({
            path: '/security/fund/password',
            query: { from: '/security/center' }
        });
    }

    mounted() {
        this.fetchUserInfo();
    }
}
