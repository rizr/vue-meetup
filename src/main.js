import Vue from 'vue';
import Vuetify from 'vuetify';
import * as firebase from 'firebase';
import App from './App';
import router from './router';
import store from './store/';
import dateFilter from './filter/date';
import Alert from './components/Shared/Alert';
import EditMeetupDialog from './components/Meetup/Edit/EditMeetup';
import EditMeetupDate from './components/Meetup/Edit/EditMeetupDate';
import RegisterDialog from './components/Meetup/Register/Register';

Vue.filter('date', dateFilter);
Vue.component('edit-meetup-dialog', EditMeetupDialog);
Vue.component('edit-meetup-date', EditMeetupDate);
Vue.component('register-dialog', RegisterDialog);
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
      storageBucket: 'gs://meetup-43e23.appspot.com',
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
        this.$store.dispatch('fetchUserData');
      }
    });
    this.$store.dispatch('loadMeetups');
  },
});
