import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import ClipboardJS from 'clipboard';

import TYPES from '@/store/types';
import { Prompt } from '@/ts/common';
import {
    UserInfoModel,
    DefaultRateStatsModel,
    DefaultRateFormModel,
} from '@/ts/models';

import { Button } from 'vant';
import Header from '@/components/common/header';
import InvitePrompt from '@/components/mine/invite-prompt';
import RateModal from '@/components/mine/rate-modal';

const userModule = namespace('user');
const childModule = namespace('child');

@Component({
    name: 'InviteFriend',
    components: { Button, Header, InvitePrompt, RateModal },
})
export default class InviteFriend extends Vue {
    @userModule.State('userInfo') userInfo!: UserInfoModel;
    @userModule.Action('fetchUserInfo') fetchUserInfo!: () => any;

    @childModule.State('defaultRateStats')
    defaultRateStats?: DefaultRateStatsModel | null;
    @childModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @childModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @childModule.Action('fetchDefaultRateStats')
    fetchDefaultRateStats!: () => any;
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
            if (!result) Prompt.error('利率设置失败');
            else {
                Prompt.success('利率设置成功');
                this.fetchDefaultRateStats();
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 复制地址
    copyAddress() {
        let copy = document.getElementById('copy'),
            clipboard = new ClipboardJS(copy);

        clipboard.on('success', function(e) {
            Prompt.success('邀请地址复制成功');
        });

        clipboard.on('error', function(e) {
            Prompt.error('邀请地址复制失败');
        });
    }

    // 获取数据
    async fetchData() {
        await this.fetchUserInfo();
        await this.fetchDefaultRateStats();
        let defaultRateStats = this.defaultRateStats;
        if (defaultRateStats) {
            this.isPromptShow = !defaultRateStats.existDefault;
            this.isRateShow = false;
        }
    }

    mounted() {
        this.copyAddress();
        this.fetchData();
    }
}
