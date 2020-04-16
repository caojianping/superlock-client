import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import Header from '@/components/common/header';
import Sider from '@/components/common/sider';
import Footer from '@/components/common/footer';

@Component({
    name: 'Layout',
    components: { Header, Sider, Footer }
})
export default class Layout extends Vue {}
