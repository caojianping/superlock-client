import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Utils } from '@/ts/common';

@Component({
    name: 'SystemGoogle',
    components: {}
})
export default class SystemGoogle extends Vue {
    mounted() {
        Utils.jumpTop();
    }
}
