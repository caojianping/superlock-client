import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Utils from '@/ts/utils';

@Component({ name: 'WechatPrompt' })
export default class WechatPrompt extends Vue {
    isWechat: boolean = Utils.isWechat();
}
