import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'RechargePrompt',
    components: {}
})
export default class RechargePrompt extends Vue {
    @Prop() readonly rechargeCoin!: string;
    @Prop() readonly minAmount!: number;
}
