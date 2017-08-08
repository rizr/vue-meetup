import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App';
import router from './router';
import store from './store/';
import dateFilter from './filter/date';

Vue.filter('date', dateFilter);

Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
