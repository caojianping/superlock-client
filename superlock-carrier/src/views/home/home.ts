import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import Utils from '@/ts/utils';
import { HomeModel } from '@/ts/models';

const homeModule = namespace('home');

@Component({
    name: 'Home',
    components: {}
})
export default class Home extends Vue {
    @homeModule.State('homeData') homeData!: HomeModel;
    @homeModule.Action('fetchHomeData') fetchHomeData!: () => any;

    mounted() {
        Utils.jumpTop();
        this.fetchHomeData();
    }
}
