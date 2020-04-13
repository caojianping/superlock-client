import Vue from 'vue';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';
import { ValidationResult } from 'jpts-validator';
import { OperationType } from '@/ts/config';
import { Utils, Prompt } from '@/ts/common';
import { RechargePoundageModel } from '@/ts/models';
import { RechargeService } from '@/ts/services';

@Component({
    name: 'PoundageModal',
    components: {}
})
export default class PoundageModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly type!: OperationType; // 操作类型
    @Prop() readonly poundage?: RechargePoundageModel; // 手续费数据

    isShow: boolean = this.value; // 是否显示模态框
    title: string = ''; // 标题
    rechargePoundage: RechargePoundageModel = new RechargePoundageModel(); // 手续费信息

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let rechargePoundage = Utils.duplicate(this.rechargePoundage);
        rechargePoundage[key] = value;
        this.rechargePoundage = rechargePoundage;
    }

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交手续费信息
    async submit() {
        let { type, rechargePoundage } = this,
            result: ValidationResult = RechargeService.validatePoundage(
                rechargePoundage,
                false,
                type
            );
        if (!result.status) {
            Prompt.error(Utils.getFirstValue(result.data));
            return;
        }

        this.$emit('close', false);
        this.$emit('submit', rechargePoundage);
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            let type = this.type,
                rechargePoundage = new RechargePoundageModel();
            rechargePoundage.code = undefined;
            this.title = ['新增手续费设置', '修改手续费设置'][type - 1];
            if (type === OperationType.Edit) {
                let poundage = this.poundage;
                if (poundage) {
                    rechargePoundage.tokenType = poundage.tokenType;
                    rechargePoundage.type = poundage.type;
                    rechargePoundage.feeToken = poundage.feeToken;
                    rechargePoundage.chargeRate =
                        Number(poundage.chargeRate) * 100;
                }
            }
            this.rechargePoundage = rechargePoundage;
        }
    }
}
