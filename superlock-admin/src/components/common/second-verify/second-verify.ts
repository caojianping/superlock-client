import Vue from 'vue';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';
import { Prompt } from '@/ts/common';

@Component({
    name: 'SecondVerify',
    components: {}
})
export default class SecondVerify extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly title!: string; // 标题

    isShow: boolean = this.value; // 是否显示模态框
    code: string = ''; // 验证码

    // 处理模态框cancel事件
    handleModalCancel() {
        this.$emit('close', false);
    }

    // 提交验证码
    async submit() {
        let code = this.code;
        if (!code) {
            Prompt.warning('验证码不可以为空');
            return;
        }

        this.$emit('close', false);
        this.$emit('submit', code);
    }

    codeFocus() {
        let self = this;
        self.$nextTick(function() {
            let $code: any = self.$refs.code;
            if ($code) {
                $code.focus();
            }
        });
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            this.code = '';
            this.codeFocus();
        }
    }
}
