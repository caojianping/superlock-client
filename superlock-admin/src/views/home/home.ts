import Vue from 'vue';
import { namespace, State, Mutation } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import TYPES from '@/store/types';
import { ResponseCode } from '@/ts/config';
import { Utils, Prompt } from '@/ts/common';
import { HomeModel, InitInfoForm, SecondVerifyResult } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';
import InitModal from '@/components/home/init-modal';

const homeModule = namespace('home');

@Component({
    name: 'Home',
    components: { SecondVerify, InitModal }
})
export default class Home extends Vue {
    @State('isFullLoading') isFullLoading!: boolean;
    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;

    @homeModule.State('homeData') homeData!: HomeModel;
    @homeModule.State('initInfoForm') initInfoForm!: InitInfoForm;

    @homeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;

    @homeModule.Action('fetchHomeData') fetchHomeData!: () => any;
    @homeModule.Action('fetchInitInfo') fetchInitInfo!: () => any;
    @homeModule.Action('setInitInfo') setInitInfo!: (isCode: boolean) => any;

    isShow: boolean = false; // 是否显示模态框
    isSecondVerifyShow: boolean = false; // 是否显示二次验证

    // 打开初始信息模态框
    openInitModal() {
        this.isShow = true;
    }

    // 私有函数：提交初始信息
    async _submitInitInfo(initInfoForm: InitInfoForm, isCode: boolean) {
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
            let code = error.code;
            if (code === ResponseCode.SecondVerify) {
                let data = error.data as SecondVerifyResult;
                if (data.verifyMethod === '001') {
                    this.isSecondVerifyShow = true;
                }
            } else {
                await this.fetchInitInfo(); // 设置接口出错时，为了模态框打开显示错误数据，重新调用刷新一次数据
                Prompt.error(error.message || error);
            }
            this.setRootStates({ isFullLoading: false });
        }
    }

    // 处理初始信息模态框submit事件
    async handleInitSubmit(initInfoForm: InitInfoForm) {
        this._submitInitInfo(initInfoForm, false);
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit(code: string) {
        let initInfoForm = Utils.duplicate(this.initInfoForm);
        initInfoForm.code = code;
        await this._submitInitInfo(initInfoForm, true);
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
