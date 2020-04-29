import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { VirtualType } from '@/ts/config';
import { HomeModel } from '@/ts/models';

import InitModal from '@/components/home/init-modal';
import VirtualModal from '@/components/home/virtual-modal';

const homeModule = namespace('home');

@Component({
    name: 'Home',
    components: { InitModal, VirtualModal }
})
export default class Home extends Vue {
    @homeModule.State('home') home!: HomeModel;
    @homeModule.State('type') type!: VirtualType;
    @homeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @homeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: (payload: any) => any;
    @homeModule.Action('fetchHomeData') fetchHomeData!: () => any;

    isInitShow: boolean = false;
    isVirtualShow: boolean = false;

    // 打开模态框
    openModal(key: string, type?: VirtualType) {
        this[key] = true;
        if (type) {
            this.setStates({ type });
        }
    }

    // 处理模态框submit事件
    handleModalSubmit() {
        this.fetchHomeData();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchHomeData();
    }
}
