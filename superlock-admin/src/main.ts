import Vue from 'vue';

import router from '@/router';
import store from '@/store';

// 使用vue-qriously
import VueQriously from 'vue-qriously';
Vue.use(VueQriously);

// 使用antd
import antd from './antd';
antd();

// 使用moment
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// 扩展
import './extends/validator.extend';
import './extends/vue.extend';

import App from '@/App.vue';
import 'ant-design-vue/dist/antd.less';
import '@/less/reset.less';
import '@/less/antd.less';
import '@/less/icon.less';
import '@/less/common.less';

Vue.prototype.moment = moment;
Vue.prototype.cancelRequest = function() {
    if (window['cancelAxios']) {
        window['cancelAxios']();
    }
};
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
