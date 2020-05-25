import Vue from 'vue';
import { Component, Model, Watch } from 'vue-property-decorator';

import Locales from '@/locales';
import { Prompt } from '@/ts/common';

import { Button } from 'vant';
import Modal from '@/components/common/modal';

const i18n = Locales.buildLocale();

@Component({
    name: 'PasswordModal',
    components: { Button, Modal }
})
export default class PasswordModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model

    isShow: boolean = false; // 是否显示模态框
    password: string = ''; // 密码

    // 处理模态框close事件
    handleModalClose() {
        this.isShow = false;
        this.$emit('close', false);
    }

    // 提交密码
    submit() {
        let password = this.password;
        if (!password) return Prompt.error(i18n.tc('VALIDATES.FUND_PASSWORD_NOT_NULL'));

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
