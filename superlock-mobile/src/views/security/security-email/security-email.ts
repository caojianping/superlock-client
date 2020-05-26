import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import Locales from '@/locales';
import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { VerifyType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { UserInfoModel, EmailFormModel } from '@/ts/models';

import { Toast, PullRefresh, CellGroup, Field, Button } from 'vant';
import Header from '@/components/common/header';
import VerifyCode from '@/components/verify/verify-code';

const i18n = Locales.buildLocale();
const userModule = namespace('user');
const securityModule = namespace('security');

@Component({
    name: 'SecurityEmail',
    components: { PullRefresh, CellGroup, Field, Button, Header, VerifyCode }
})
export default class SecurityEmail extends Vue {
    @userModule.State('userInfo') userInfo?: UserInfoModel | null;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: (isLoading?: boolean) => any;

    @securityModule.State('emailForm') emailForm!: EmailFormModel;
    @securityModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @securityModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @securityModule.Action('bindEmail') bindEmail!: () => any;

    from: string = ''; // 来源
    isPulling: boolean = false; // 是否下拉刷新
    verifyType: VerifyType = VerifyType.EmailVerify;

    // 处理Field组件input事件
    handleFieldInput(key: string, value: string) {
        let emailForm = Utils.duplicate(this.emailForm);
        emailForm[key] = value;
        this.setStates({ emailForm });
    }

    // 提交邮箱表单
    async submit() {
        try {
            let result = await this.bindEmail();
            if (!result) Prompt.error(i18n.tc('SECURITY.EMAIL_BIND_FAILURE'));
            else {
                await this.fetchUserInfo(true);
                Prompt.success(i18n.tc('SECURITY.EMAIL_BIND_SUCCESS')).then(() => {
                    this.$router.push(this.from);
                });
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 获取数据
    async fetchData(isRefresh: boolean) {
        (!this.userInfo || isRefresh) && this.fetchUserInfo(true);
    }

    // 刷新数据
    async refreshData() {
        await this.fetchData(true);
        this.isPulling = false;
        Toast(i18n.tc('COMMON.REFRESH_SUCCESS'));
    }

    // 初始化数据
    initData() {
        let query: any = this.$route.query || {};
        this.from = query.from || '/security/index';
        this.setStates({ emailForm: new EmailFormModel() });
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchData(false);
    }
}
