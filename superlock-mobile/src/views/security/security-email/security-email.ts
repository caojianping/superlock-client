import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { VerifyType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { UserInfoModel, EmailFormModel } from '@/ts/models';

import { CellGroup, Field, Button } from 'vant';
import Header from '@/components/common/header';
import VerifyCode from '@/components/verify/verify-code';

const userModule = namespace('user');
const securityModule = namespace('security');

@Component({
    name: 'SecurityEmail',
    components: { CellGroup, Field, Button, Header, VerifyCode }
})
export default class SecurityEmail extends Vue {
    @userModule.State('userInfo') userInfo!: UserInfoModel;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: (isLoading?: boolean) => any;

    @securityModule.State('emailForm') emailForm!: EmailFormModel;
    @securityModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @securityModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @securityModule.Action('bindEmail') bindEmail!: () => any;

    from: string = ''; // 来源
    verifyType: VerifyType = VerifyType.EmailVerify;

    // 处理Field组件input事件
    handleFieldInput(key: string, value: string) {
        let emailForm = Utils.duplicate(this.emailForm);
        emailForm[key] = value;
        console.log('emailForm:', emailForm);
        this.setStates({ emailForm });
    }

    // 提交邮箱表单
    async submit() {
        try {
            let result = await this.bindEmail();
            if (!result) Prompt.error('邮箱绑定失败');
            else
                Prompt.success('邮箱绑定成功').then(() => {
                    if (!status) this.$router.push(this.from);
                    else this.$router.push('/security/center');
                });
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 初始化数据
    initData() {
        let query: any = this.$route.query || {};
        this.from = query.from || '';
    }

    created() {
        this.clearStates();
        this.initData();
    }

    mounted() {
        this.fetchUserInfo(true);
    }
}
