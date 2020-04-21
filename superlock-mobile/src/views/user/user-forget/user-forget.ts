import Vue from 'vue';
import { namespace, Action, State, Mutation } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { CONSTANTS, ForgetType } from '@/ts/config';
import { Prompt } from '@/ts/common';
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

    yunDun: any = null; // 云盾实例
    from: string = ''; // 来源
    isVerifyShow: boolean = false; // 是否显示验证列表组件
    isForgetShow: boolean = false; // 是否显示忘记表单组件

    // 处理Field组件input事件
    handleFieldInput(key: string, value: any) {
        let userForm = Utils.duplicate(this.userForm);
        userForm[key] = value;
        this.setStates({ userForm });
    }

    // 处理SmsCode组件stop事件
    handleSmsCodeStop() {
        this.yunDun && this.yunDun.refresh();
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
    async handleVerifyListSubmit(code: string) {
        let userForm = Utils.duplicate(this.userForm);
        userForm.code = code;
        this.setStates({ userForm });

        this.isForgetShow = true;
    }

    // 处理验证列表组件stop事件
    handleVerifyListStop() {
        this.yunDun && this.yunDun.refresh();
    }

    // 处理验证列表组件back事件
    handleVerifyListClose(isShow: boolean, isForm: boolean) {
        console.log('forget close:', isShow, isForm);
        if (!isForm) {
            // this.$router.push(this.from);
        }
    }

    // 初始化数据
    initData() {
        let params: any = this.$route.params || {},
            type = Number(params.type);
        this.setStates({ forgetType: isNaN(type) ? ForgetType.LoginPassword : type });

        let query: any = this.$route.query || {};
        this.from = query.from || '';

        let userForm = Utils.duplicate(this.userForm);
        userForm.areaCode = query.areaCode || '';
        userForm.mobile = query.mobile || '';
        this.setStates({ userForm });
    }

    // 初始化云盾
    initYunDun() {
        try {
            let self = this;
            if (window['initNECaptcha']) {
                window['initNECaptcha'](
                    CONSTANTS.CAPTCHA_OPTIONS,
                    function onload(instance) {
                        self.yunDun = instance;
                    },
                    function onerror() {}
                );
            }
        } catch (error) {}
    }

    // 获取数据
    async fetchData() {
        try {
            let userForm = Utils.duplicate(this.userForm);
            await this.fetchVerifyMethod({ areaCode: userForm.areaCode, mobile: userForm.mobile });

            let verifyResult = this.verifyResult;
            if (!verifyResult) return Prompt.error('验证方式获取失败');

            if (verifyResult.needVerify === 1) {
                // 需要验证
                this.isVerifyShow = true;
                userForm.verifyMode = verifyResult.verifyMode;
                this.setStates({ userForm });
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
        this.initYunDun();
        this.fetchData();
    }
}
