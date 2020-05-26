import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import Locales from '@/locales';
import TYPES from '@/store/types';
import { Prompt, Clipboard } from '@/ts/common';
import { UserInfoModel, DefaultRateStatsModel, DefaultRateFormModel } from '@/ts/models';

import { Button, Toast } from 'vant';
import Header from '@/components/common/header';
import InvitePrompt from '@/components/mine/invite-prompt';
import RateModal from '@/components/mine/rate-modal';

const i18n = Locales.buildLocale();
const userModule = namespace('user');
const childModule = namespace('child');

@Component({
    name: 'InviteFriend',
    components: { Button, Header, InvitePrompt, RateModal }
})
export default class InviteFriend extends Vue {
    @userModule.State('userInfo') userInfo?: UserInfoModel | null;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: (isLoading?: boolean) => any;

    @childModule.State('defaultRateStats') defaultRateStats?: DefaultRateStatsModel | null;
    @childModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @childModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @childModule.Action('fetchDefaultRateStats') fetchDefaultRateStats!: () => any;
    @childModule.Action('setDefaultRates') setDefaultRates!: () => any;

    isPromptShow: boolean = false; // 是否显示邀请提示模态框
    isRateShow: boolean = false; // 是否显示利率设置模态框

    // 处理邀请提示模态框confirm事件
    handleInvitePromptConfirm() {
        this.isPromptShow = true;
        this.isRateShow = true;
    }

    // 打开利率模态框
    openRateModal() {
        this.isRateShow = true;
    }

    // 处理利率设置模态框close事件
    handleRateModalClose() {
        let defaultRateStats = this.defaultRateStats;
        if (defaultRateStats && !defaultRateStats.existDefault) {
            this.$router.push('/mine/index');
        }
    }

    // 处理利率设置模态框submit事件
    async handleRateModalSubmit(defaultRateForms: Array<DefaultRateFormModel>) {
        try {
            this.setStates({ defaultRateForms });
            let result = await this.setDefaultRates();
            if (!result) Prompt.error(i18n.tc('MINE.RATE_SETTING_FAILURE'));
            else {
                Prompt.success(i18n.tc('MINE.RATE_SETTING_FAILURE'));
                await this.fetchDefaultRateStats();
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 获取数据
    async fetchData() {
        Toast.loading({ mask: true, duration: 0, message: i18n.tc('COMMON.LOADING') });
        !this.userInfo && (await this.fetchUserInfo());
        await this.fetchDefaultRateStats();

        let defaultRateStats = this.defaultRateStats;
        if (defaultRateStats) {
            this.isPromptShow = !defaultRateStats.existDefault;
            this.isRateShow = false;
        }
        Toast.clear();

        Clipboard.copy('inviteAddress', i18n.tc('MINE.INVITE_ADDRESS')); // id添加前缀，防止复制元素重复
    }

    mounted() {
        this.fetchData();
    }
}
