import Vue from 'vue';
import { Mutation } from 'vuex-class';
import { Component, Prop, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { Prompt, Token } from '@/ts/common';

@Component({
    name: 'SecondVerify',
    components: {}
})
export default class SecondVerify extends Vue {
    @Prop() readonly isShow!: boolean;
    @Prop() readonly title!: string;

    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;
    @Mutation(TYPES.CLEAR_STATES) clearRootStates!: () => any;

    isModalShow: boolean = false; // 是否显示模态框
    code: string = ''; // 谷歌验证码

    // 处理模态框cancel事件
    handleModalCancel() {
        this.setRootStates({ isSecondVerifyShow: false });
    }

    // 提交验证码
    async submit() {
        let code = this.code;
        if (!code) {
            Prompt.warning('谷歌验证码不可以为空');
            return;
        }

        Token.setCode(code);
        this.setRootStates({ isSecondVerifyShow: false });
        this.$emit('submit');
    }

    // 谷歌验证码获取焦点
    codeFocus() {
        let self = this;
        self.$nextTick(function() {
            let $code: any = self.$refs.code;
            if ($code) {
                $code.focus();
            }
        });
    }

    @Watch('isShow')
    watchIsShow(isShow: boolean) {
        console.log('二次验证 watchIsShow', isShow);
        this.isModalShow = isShow;
        if (isShow) {
            this.code = '';
            this.codeFocus();
        }
    }
}
