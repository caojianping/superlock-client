import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Header from '@/components/common/header';

@Component({
    name: 'TeamMgmt',
    components: { Header }
})
export default class TeamMgmt extends Vue {}
