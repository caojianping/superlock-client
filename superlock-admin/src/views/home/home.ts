import Vue from 'vue';
import { namespace, State, Mutation } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { HomeModel, InitInfoFormModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';
import InitModal from '@/components/modals/init-modal';

const homeModule = namespace('home');

@Component({
    name: 'Home',
    components: { SecondVerify, InitModal }
})
export default class Home extends Vue {
    @State('isFullLoading') isFullLoading!: boolean;
    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;
    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;

    @homeModule.State('homeData') homeData!: HomeModel;
    @homeModule.State('initInfoForm') initInfoForm!: InitInfoFormModel;

    @homeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;

    @homeModule.Action('fetchHomeData') fetchHomeData!: () => any;
    @homeModule.Action('fetchInitInfo') fetchInitInfo!: () => any;
    @homeModule.Action('setInitInfo') setInitInfo!: (isCode: boolean) => any;

    isShow: boolean = false; // 是否显示模态框

    // 打开初始信息模态框
    openInitModal() {
        this.isShow = true;
    }

    // 私有函数：提交初始信息
    async _submitInitInfo(initInfoForm: InitInfoFormModel, isCode: boolean) {
        try {
            this.setRootStates({ isFullLoading: true });
            this.setStates({ initInfoForm });
            let result = await this.setInitInfo(isCode);
            if (!result) {
                await this.fetchInitInfo(); // 设置接口出错时，为了模态框打开显示错误数据，重新调用刷新一次数据
                Prompt.error('初始化信息设置失败');
            } else {
                await this.fetchData(false);
            }
            this.setRootStates({ isFullLoading: false });
        } catch (error) {
            await this.fetchInitInfo(); // 设置接口出错时，为了模态框打开显示错误数据，重新调用刷新一次数据
            Prompt.error(error.message || error);
            this.setRootStates({ isFullLoading: false });
        }
    }

    // 处理初始信息模态框submit事件
    async handleInitSubmit(initInfoForm: InitInfoFormModel) {
        this._submitInitInfo(initInfoForm, false);
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit() {
        await this._submitInitInfo(this.initInfoForm, true);
    }

    // 获取数据
    async fetchData(isLoading: Boolean = true) {
        try {
            isLoading && this.setRootStates({ isFullLoading: true });
            await this.fetchHomeData();
            await this.fetchInitInfo();
            isLoading && this.setRootStates({ isFullLoading: false });
        } catch (error) {
            isLoading && this.setRootStates({ isFullLoading: false });
            Prompt.error(error.message || error);
        }
    }

    mounted() {
        Utils.jumpTop();
        this.fetchData();
    }
}
