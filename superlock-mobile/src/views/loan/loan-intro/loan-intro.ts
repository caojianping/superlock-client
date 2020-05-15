import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import Header from '@/components/common/header';
import LoanBanner from '@/components/loan/loan-banner';

@Component({
    name: 'LoanIntro',
    components: { Header, LoanBanner }
})
export default class LoanIntro extends Vue {}
