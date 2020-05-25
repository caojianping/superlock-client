import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { CONSTANTS } from '@/ts/config';

@Component({
    name: 'ContactService',
    components: {}
})
export default class ContactService extends Vue {
    @Prop({ type: Number, default: 0.75 }) readonly top!: number;

    // 跳转至客服页面
    goCustomerService() {
        window.location.href = CONSTANTS.CUSTOMER_SERVICE;
    }
}
