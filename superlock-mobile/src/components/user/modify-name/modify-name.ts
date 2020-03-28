import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component, Model, Watch, Prop } from 'vue-property-decorator';
import { Prompt } from '@/ts/common';

import { Popup, CellGroup, Field, Button } from 'vant';
import Header from '@/components/common/header';

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

    // 关闭弹出框
    closePopup() {
        this.isShow = false;
        this.$emit('close', false);
    }

    // 处理Field控件input事件
    handleFieldInput(value: string) {
        this.nickname = value;
    }

    // 提交用户昵称
    async submit() {
        try {
            let nickname = this.nickname;
            if (!nickname) return Prompt.error('用户昵称不可以为空');

            let result = await this.setNickname(nickname);
            if (result) {
                Prompt.success('用户昵称设置成功');
                this.$emit('close', false);
                this.$emit('submit', nickname);
            } else {
                Prompt.error('用户昵称设置失败');
            }
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
