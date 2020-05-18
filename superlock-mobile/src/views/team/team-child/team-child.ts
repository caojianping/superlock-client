import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { SessionStorage } from 'jts-storage';

import Utils from '@/ts/utils';
import TYPES from '@/store/types';
import { CONSTANTS } from '@/ts/config';
import { Prompt, Clipboard } from '@/ts/common';
import { ChildModel, ChildRateFormModel, ChildRateModel } from '@/ts/models';

import { CellGroup, Cell, Button } from 'vant';
import Header from '@/components/common/header';
import Modal from '@/components/common/modal';

const childModule = namespace('child');

@Component({
    name: 'TeamChild',
    components: { CellGroup, Cell, Button, Header, Modal }
})
export default class TeamChild extends Vue {
    @State('unitTypes') unitTypes!: Array<string>;
    @State('rateTypes') rateTypes!: Array<string>;

    @childModule.State('childs') childs?: Array<ChildModel>;
    @childModule.State('child') child?: ChildModel | null;
    @childModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @childModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @childModule.Action('setChildRemark') setChildRemark!: (remark: string) => any;
    @childModule.Action('setChildRates') setChildRates!: (childRateForms: Array<ChildRateFormModel>) => any;

    childRateForms: Array<ChildRateFormModel> = []; // 下级利率表单列表

    isRemarkShow: boolean = false; // 是否显示备注模态框
    isRateShow: boolean = false; // 是否显示利率模态框

    remark: string = ''; // 备注
    currentIndex: number = 0; // 当前索引
    currentForm: ChildRateFormModel = new ChildRateFormModel(); // 当前表单

    // 打开备注模态框
    openRemarkModal() {
        if (!this.child) return;

        this.isRemarkShow = true;

        let child = Utils.duplicate(this.child);
        this.remark = child.nickName || '';
    }

    // 取消备注
    cancelRemark() {
        this.isRemarkShow = false;
    }

    // 提交备注
    async submitRemark() {
        if (!this.child) return;

        try {
            let remark = this.remark,
                result = await this.setChildRemark(remark);
            if (!result) Prompt.error('下级备注设置失败');
            else {
                let child = Utils.duplicate(this.child);
                child.nickName = remark;
                this.setStates({ child });
                Prompt.success('下级备注设置成功');
                this.isRemarkShow = false;
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 打开利率模态框
    openRateModal(currentIndex: number) {
        this.isRateShow = true;
        this.currentIndex = currentIndex;

        let childRateForms = Utils.duplicate(this.childRateForms);
        this.currentForm =
            childRateForms.filter((childRateForm: ChildRateFormModel, index: number) => currentIndex === index)[0] || new ChildRateFormModel();
    }

    // 取消利率模态框
    cancelRate() {
        this.isRateShow = false;
    }

    // 提交利率模态框
    async submitRate() {
        try {
            // 设置表单对象的关联属性
            let currentForm = Utils.duplicate(this.currentForm),
                value = Number(currentForm.value);

            // 查找指定对象，更新相关数据
            let currentIndex = this.currentIndex,
                childRateForms = Utils.duplicate(this.childRateForms);
            childRateForms.forEach((childRateForm: ChildRateFormModel, index: number) => {
                if (currentIndex === index) {
                    childRateForm.value = value;
                }
            });

            let result = await this.setChildRates(childRateForms);
            if (!result) Prompt.error('设置失败');
            else {
                Prompt.success('设置成功');
                currentForm.value = value;
                currentForm.minAmount = value;
                currentForm.showValue = value;
                this.$set(this.childRateForms, currentIndex, currentForm);
                this.isRateShow = false;
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 初始化数据
    initData() {
        let params: any = this.$route.params || {},
            childs = Utils.duplicate(this.childs || []),
            child: any = childs.filter((child: ChildModel) => child.uid === params.uid)[0];
        if (!child) {
            child = SessionStorage.getItem<ChildModel>(CONSTANTS.CHILD);
        }
        this.setStates({ child });

        let childRateForms: Array<ChildRateFormModel> = [];
        (child.rates || []).forEach((rate: ChildRateModel) => {
            let childRateForm = new ChildRateFormModel();
            childRateForm.type = rate.type;
            childRateForm.length = rate.length;
            childRateForm.unit = rate.unit;
            childRateForm.suffix = rate.suffix;
            childRateForm.showValue = rate.childValue;
            childRateForm.minAmount = rate.childValue;
            childRateForm.maxAmount = rate.value;
            childRateForm.value = rate.childValue;
            childRateForms.push(childRateForm);
        });
        this.childRateForms = childRateForms;
    }

    created() {
        this.initData();
    }

    mounted() {
        Clipboard.copy('uid', 'UID');
    }
}
