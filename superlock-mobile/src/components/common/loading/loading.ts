import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Loading as VantLoading } from 'vant';

@Component({
    name: 'Loading',
    components: { VantLoading }
})
export default class Loading extends Vue {
    @Prop() readonly isLoading!: boolean;
}
