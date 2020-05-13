import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Header from '@/components/common/header';

@Component({
    name: 'LoanIntro',
    components: { Header }
})
export default class LoanIntro extends Vue {}
