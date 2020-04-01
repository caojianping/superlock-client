import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Header from '@/components/common/header';

@Component({
    name: 'TransferIndex',
    components: { Header }
})
export default class TransferIndex extends Vue {}
