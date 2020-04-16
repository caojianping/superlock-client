import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';

import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { ISelectOption } from '@/ts/interfaces';
import { PointInfoModel, PointFormModel } from '@/ts/models';
import { PointService } from '@/ts/services';

const pointModule = namespace('point');

@Component({
    name: 'PointModal',
    components: {}
})
export default class PointModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly title!: string; // 标题

    @pointModule.State('pointInfos') pointInfos!: Array<PointInfoModel>;
    @pointModule.Action('fetchPointInfo') fetchPointInfo!: () => any;

    isShow: boolean = this.value; // 是否显示模态框
    coinOptions: Array<ISelectOption> = []; // 币种选项列表
    pointForm: PointFormModel = new PointFormModel(); // 上分表单
    currentPointInfo: PointInfoModel = new PointInfoModel(); // 当前上分信息

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let pointForm = Utils.duplicate(this.pointForm);
        pointForm[key] = value;
        this.pointForm = pointForm;
    }

    // 处理币种change事件
    handleCoinChange(coin: string) {
        let currentPointInfo = this.pointInfos.filter((pointInfo: PointInfoModel) => pointInfo.coin === coin)[0] || new PointInfoModel(),
            pointForm = Utils.duplicate(this.pointForm);
        pointForm.accountId = currentPointInfo.id;
        pointForm.coin = currentPointInfo.coin;
        this.pointForm = pointForm;
        this.currentPointInfo = currentPointInfo;
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交上分信息
    async submit() {
        let pointForm = this.pointForm,
            result: ValidationResult = PointService.validatePointInfo(pointForm);
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        this.$emit('close', false);
        this.$emit('submit', pointForm);
    }

    // 初始化数据
    async initData() {
        // 获取系统上分信息
        await this.fetchPointInfo();
        let pointInfos = this.pointInfos;

        // 构建币种选项列表
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
            this.pointForm = pointForm;
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
