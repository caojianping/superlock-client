import Vue from 'vue';
import { namespace, Action, State, Mutation } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { ForgetType, VerifyType } from '@/ts/config';
import { Prompt, Captcha } from '@/ts/common';
import { UserFormModel, VerifyResult } from '@/ts/models';

import { CellGroup, Cell, Field, Button } from 'vant';
import VerifyList from '@/components/verify/verify-list';
import ForgetForm from '@/components/user/forget-form';

const userModule = namespace('user');

@Component({
    name: 'UserForget',
    components: { CellGroup, Cell, Field, Button, VerifyList, ForgetForm }
})
export default class UserForget extends Vue {
    @State('verifyResult') verifyResult?: VerifyResult | null;
    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;
    @Mutation(TYPES.CLEAR_STATES) clearRootStates!: () => any;
    @Action('fetchVerifyMethod') fetchVerifyMethod!: (payload: { areaCode: string; mobile: string }) => any;

    @userModule.State('userForm') userForm!: UserFormModel;
    @userModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @userModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;

    captcha: any = null; // 云盾短信验证码实例
    from: string = ''; // 来源
    isVerifyShow: boolean = false; // 是否显示验证列表组件
    isForgetShow: boolean = false; // 是否显示忘记表单组件

    // 处理Field组件input事件
    handleFieldInput(key: string, value: any) {
        let userForm = Utils.duplicate(this.userForm);
        userForm[key] = value;
        this.setStates({ userForm });
    }

    // 处理ForgetForm组件submit事件
    handleForgetFormSubmit() {
        this.$router.push(this.from);
    }

    // 处理ForgetForm组件close事件
    handleForgetFormClose() {
        let userForm = Utils.duplicate(this.userForm);
        userForm.code = '';
        this.setStates({ userForm });
    }

    // 处理验证列表组件submit事件
    async handleVerifyListSubmit(verifyType: VerifyType, code: string) {
        let userForm = Utils.duplicate(this.userForm);
        userForm.verifyMode = ['100', '010', '001'][verifyType - 1];
        userForm.code = code;
        this.setStates({ userForm });

        this.isForgetShow = true;
    }

    // 处理验证列表组件stop事件
    handleVerifyListStop() {
        this.captcha && this.captcha.refresh();
    }

    // 初始化数据
    initData() {
        let params: any = this.$route.params || {},
            type = Utils.digitConvert(params.type);
        this.setStates({ forgetType: type || ForgetType.LoginPassword });

        let query: any = this.$route.query || {};
        this.from = query.from || '';

        let userForm = Utils.duplicate(this.userForm);
        userForm.areaCode = query.areaCode || '';
        userForm.mobile = query.mobile || '';
        this.setStates({ userForm });
    }

    // 初始化云盾短信验证码
    async initCaptcha() {
        try {
            let captcha = await Captcha.initCaptcha();
            this.captcha = captcha;
        } catch (error) {
            this.captcha = null;
        }
    }

    // 获取数据
    async fetchData() {
        try {
            let userForm = Utils.duplicate(this.userForm);
            await this.fetchVerifyMethod({ areaCode: userForm.areaCode, mobile: userForm.mobile });

            let verifyResult = this.verifyResult;
            if (!verifyResult) return Prompt.error('验证方式获取失败');

            if (verifyResult.needVerify === 1) {
                this.isVerifyShow = true;
            } else {
                this.isForgetShow = true;
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    created() {
        this.clearStates();
        this.initData();
    }

    mounted() {
        this.initCaptcha();
        this.fetchData();
    }
}
