import Vue from 'vue';
import { Component, Model, Watch } from 'vue-property-decorator';

import { Button } from 'vant';
import Modal from '@/components/common/modal';

@Component({
    name: 'InvitePrompt',
    components: { Button, Modal }
})
export default class InvitePrompt extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model

    isShow: boolean = this.value; // 是否显示模态框

    // 确认
    confirm() {
        this.$emit('close', false);
        this.$emit('confirm');
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
    }
}
