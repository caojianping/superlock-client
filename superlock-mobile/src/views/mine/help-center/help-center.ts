import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Header from '@/components/common/header';

@Component({
    name: 'HelpCenter',
    components: { Header }
})
export default class HelpCenter extends Vue {}
