import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'BindGuide',
    components: {}
})
export default class BindGuide extends Vue {
    @Prop() path!: string;
}
