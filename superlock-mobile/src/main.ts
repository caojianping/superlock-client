import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Locales from './locales';

// 使用vue-qriously
import VueQriously from 'vue-qriously';
Vue.use(VueQriously);

// 扩展
import './extends/validator.extend';
import './extends/vue.extend';

import '@/less/vant.less';
import '@/less/reset.less';
import '@/less/common.less';
import '@/less/effect.less';
import '@/less/icon.less';

Vue.prototype.cancelRequest = function() {
    if ((window as any)['cancelAxios']) {
        (window as any)['cancelAxios']();
    }
};

Vue.config.productionTip = false;

const i18n = Locales.buildLocale();

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
