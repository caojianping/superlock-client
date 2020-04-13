import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import Header from '@/components/layout/header';
import Sider from '@/components/layout/sider';
import Footer from '@/components/layout/footer';

@Component({
    name: 'Layout',
    components: { Header, Sider, Footer }
})
export default class Layout extends Vue {}
