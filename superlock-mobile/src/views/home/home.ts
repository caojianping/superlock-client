import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Navs from '@/components/layout/navs';

@Component({
    name: 'Home',
    components: { Navs }
})
export default class Home extends Vue {}
