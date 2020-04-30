import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Swipe, SwipeItem } from 'vant';

@Component({
    name: 'BindGuide',
    components: { Swipe, SwipeItem }
})
export default class BindGuide extends Vue {
    @Prop() isRateSet?: boolean; // 是否需要设置利率
    @Prop() isEmailBind?: boolean; // 是否需要绑定邮箱
    @Prop() path!: string;
}
