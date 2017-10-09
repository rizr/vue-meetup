import Vue from 'vue';
import Vuex from 'vuex';
import meetup from './meetup';
import user from './user';
import shared from './shared';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    meetup,
    shared,
  },
});
