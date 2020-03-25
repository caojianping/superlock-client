import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import Navs from '@/components/layout/navs';

@Component({
    name: 'MineIndex',
    components: { Navs }
})
export default class MineIndex extends Vue {}
