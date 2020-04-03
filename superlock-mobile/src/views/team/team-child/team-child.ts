import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import ClipboardJS from 'clipboard';

import Utils from '@/ts/utils';
import TYPES from '@/store/types';
import { Prompt } from '@/ts/common';
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
    @State('units') units!: Array<string>;
    @State('rateTypes') rateTypes!: Array<string>;

    @childModule.State('childs') childs?: Array<ChildModel>;
    @childModule.State('child') child!: ChildModel;

    @childModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @childModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    @childModule.Action('setChildRemark') setChildRemark!: (
        remark: string
    ) => any;
    @childModule.Action('setChildRates') setChildRates!: (
        childRateForms: Array<ChildRateFormModel>
    ) => any;

    childRateForms: Array<ChildRateFormModel> = []; // 下级利率表单列表

    isRemarkShow: boolean = false; // 是否显示备注模态框
    isRateShow: boolean = false; // 是否显示利率模态框

    remark: string = ''; // 备注
    currentIndex: number = 0; // 当前索引
    currentForm: ChildRateFormModel = new ChildRateFormModel(); // 当前表单

    // 复制UID
    copyUid() {
        let uid = document.getElementById('uid'),
            clipboard = new ClipboardJS(uid);
        clipboard.on('success', function(e) {
            Prompt.success('UID复制成功');
        });
        clipboard.on('error', function(e) {
            Prompt.error('UID复制失败');
        });
    }

    // 打开备注模态框
    openRemarkModal() {
        this.isRemarkShow = true;
        this.remark = this.child.nickName || '';
    }

    // 取消备注
    cancelRemark() {
        this.isRemarkShow = false;
    }

    // 提交备注
    async submitRemark() {
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
    openRateModal(index: number) {
        this.isRateShow = true;
        this.currentIndex = index;
        this.currentForm =
            this.childRateForms.filter(
                (form: any, cindex: number) => cindex === index
            )[0] || new ChildRateFormModel();
    }

    // 取消利率模态框
    cancelRate() {
        this.isRateShow = false;
    }

    // 提交利率模态框
    async submitRate() {
        try {
            let currentForm = this.currentForm,
                value = Number(currentForm.value);
            currentForm.value = value;
            currentForm.minAmount = value;
            currentForm.showValue = value;
            this.$set(this.childRateForms, this.currentIndex, currentForm);

            console.log('childRateForms:', this.childRateForms);
            let result = await this.setChildRates(this.childRateForms);
            if (!result) Prompt.error('设置失败');
            else {
                Prompt.success('设置成功');
                this.isRateShow = false;
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 初始化数据
    initData() {
        let uid = this.$route.params.uid,
            childs = this.childs || [],
            child =
                childs.filter(item => (item.uid = uid))[0] || new ChildModel();
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
        console.log('uid,child,childRateForms:', uid, child, childRateForms);
        this.childRateForms = childRateForms;
    }

    created() {
        this.initData();
    }

    mounted() {
        this.copyUid();
    }
}
