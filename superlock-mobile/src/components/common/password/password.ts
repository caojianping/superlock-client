import Vue from 'vue';
import { Component, Model, Watch } from 'vue-property-decorator';
import { Prompt } from '@/ts/common';

import { Button } from 'vant';
import Modal from '@/components/common/modal';

@Component({
    name: 'Password',
    components: { Button, Modal }
})
export default class Password extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model

    isShow: boolean = false; // 是否显示模态框
    password: string = ''; // 密码

    // 关闭模态框
    closeModal() {
        this.isShow = false;
        this.$emit('close', false);
    }

    // 提交密码
    submit() {
        let password = this.password;
        if (!password) {
            Prompt.error('资金密码不可以为空');
            return;
        }

        this.$emit('close', false);
        this.$emit('submit', password);
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        if (value) {
            this.password = '';
        }
    }
}
