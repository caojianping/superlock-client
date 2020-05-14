import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { Button } from 'vant';
import Header from '@/components/common/header';

@Component({
    name: 'LoanRepayResult',
    components: { Button, Header }
})
export default class LoanRepayResult extends Vue {}
