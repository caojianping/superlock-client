import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Header from '@/components/common/header';

@Component({
    name: 'MessageCenter',
    components: { Header }
})
export default class MessageCenter extends Vue {}
