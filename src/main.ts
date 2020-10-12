import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import http from '@/plugins/http.ts';
import './plugins/element.js';
import './plugins/repairRouter.js';
import '@css/resetElement.less';
import isMock from '@sys/isMock';

if (isMock) {
  require('@/mock');
}

Vue.use(http.install);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
