import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component, Model, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { ISelectOption } from '@/ts/interfaces';
import { PointInfoModel, PointFormModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';

const pointModule = namespace('point');

@Component({
    name: 'PointModal',
    components: { SecondVerify }
})
export default class PointModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model

    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;

    @pointModule.State('pointInfos') pointInfos!: Array<PointInfoModel>;
    @pointModule.State('pointForm') pointForm!: PointFormModel;
    @pointModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @pointModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @pointModule.Action('fetchPointInfo') fetchPointInfo!: () => any;
    @pointModule.Action('setPointInfo') setPointInfo!: (isCode?: boolean) => any;

    isShow: boolean = this.value; // 是否显示模态框
    coinOptions: Array<ISelectOption> = []; // 币种选项列表
    currentPointInfo: PointInfoModel = new PointInfoModel(); // 当前上分信息

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let pointForm = Utils.duplicate(this.pointForm);
        pointForm[key] = value;
        this.setStates({ pointForm });
    }

    // 处理币种change事件
    handleCoinChange(coin: string) {
        let currentPointInfo = this.pointInfos.filter((pointInfo: PointInfoModel) => pointInfo.coin === coin)[0] || new PointInfoModel(),
            pointForm = Utils.duplicate(this.pointForm);
        pointForm.accountId = currentPointInfo.id;
        pointForm.coin = currentPointInfo.coin;
        this.setStates({ pointForm });
        this.currentPointInfo = currentPointInfo;
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交上分表单
    async submit(isCode?: boolean) {
        try {
            let result = await this.setPointInfo(isCode);
            if (!result) Prompt.error('上分失败');
            else {
                Prompt.success('上分成功');
                this.$emit('close', false);
                this.$emit('submit');
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 初始化数据
    async initData() {
        // 获取系统上分信息
        await this.fetchPointInfo();

        // 构建币种选项列表
        let pointInfos = this.pointInfos;
        this.coinOptions = pointInfos.map((pointInfo: PointInfoModel) => ({
            label: pointInfo.coin,
            value: pointInfo.coin
        }));

        // 设置第一个系统上分数据为默认数据
        let firstPointInfo = pointInfos[0];
        if (firstPointInfo) {
            let pointForm = new PointFormModel();
            pointForm.accountId = firstPointInfo.id;
            pointForm.coin = firstPointInfo.coin;
            this.setStates({ pointForm });
            this.currentPointInfo = firstPointInfo;
        }
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            this.initData();
        }
    }
}
