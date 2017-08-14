import Vue from 'vue';
import Vuetify from 'vuetify';
import * as firebase from 'firebase';
import App from './App';
import router from './router';
import store from './store/';
import dateFilter from './filter/date';
import Alert from './components/Shared/Alert';

Vue.filter('date', dateFilter);
Vue.component('app-alert', Alert);

Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBKL-zBbTRIucSg02-qpnuY1XYW7Hqurv0',
      authDomain: 'meetup-43e23.firebaseapp.com',
      databaseURL: 'https://meetup-43e23.firebaseio.com',
      projectId: 'meetup-43e23',
      storageBucket: 'meetup-43e23.appspot.com',
    });
  },
});
