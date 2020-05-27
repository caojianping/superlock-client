import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component, Model, Watch, Prop } from 'vue-property-decorator';

import Locales from '@/locales';
import { Prompt } from '@/ts/common';

import { Popup, CellGroup, Field, Button } from 'vant';
import Header from '@/components/common/header';

const i18n = Locales.buildLocale();
const userModule = namespace('user');

@Component({
    name: 'ModifyName',
    components: { Popup, CellGroup, Field, Button, Header }
})
export default class ModifyName extends Vue {
    @Model('close', { type: Boolean }) value!: boolean; // v-model
    @Prop() readonly name!: string; // 用户名称

    @userModule.Action('setNickname') setNickname!: (nickname: string) => any;

    isShow: boolean = this.value; // 是否显示弹出框
    nickname: string = this.name; // 用户昵称

    // 处理弹出框close事件
    handlePopupClose() {
        this.isShow = false;
        this.$emit('close', false);
    }

    // 处理Field组件input事件
    handleFieldInput(value: string) {
        this.nickname = value;
    }

    // 提交用户昵称
    async submit() {
        try {
            let nickname = this.nickname;
            if (!nickname) return Prompt.error(i18n.tc('VALIDATES.NICKNAME_NOT_NULL'));

            let result = await this.setNickname(nickname);
            if (!result) return Prompt.error(i18n.tc('MINE.NICKNAME_SETTING_FAILURE'));

            Prompt.success(i18n.tc('MINE.NICKNAME_SETTING_SUCCESS'));
            this.$emit('close', false);
            this.$emit('submit');
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
        this.nickname = this.name;
    }
}
