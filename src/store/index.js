import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        date: new Date(),
        imageUrl: 'https://i.ytimg.com/vi/Z3HvId-Ojp4/maxresdefault.jpg',
        title: 'Ponny',
        id: '1',
        location: 'new york',
        description: '12313',
      },
      {
        date: new Date(),
        imageUrl: 'http://img09.deviantart.net/985f/i/2012/344/e/e/look_at_da_pwetty_blue_ponny__by_beavernator-d5nla0j.png',
        title: 'Ponny2',
        id: '2',
        location: 'new york',
        description: '12313',
      },
    ],
    user: null,
    loading: null,
    error: null,
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },

    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    createMeetup({ commit }, payload) {
      const meetup = Object.assign({}, payload);
      commit('createMeetup', meetup);
    },
    signup({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
          };
          commit('setLoading', false);
          commit('setUser', newUser);
        })
        .catch((error) => {
          commit('setError', error);
          commit('setLoading', false);
        });
    },
    signin({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
          };
          commit('setUser', newUser);
          commit('setLoading', false);
          commit('setUser', newUser);
        })
        .catch((error) => {
          commit('setError', error);
          commit('setLoading', false);
        });
    },
    clearError({ commit }) {
      commit('clearError');
    },
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((a, b) => a.date > b.date);
    },
    loadedMeetup(state) {
      return meetupId => state.loadedMeetups.find(meetup => meetup.id === meetupId);
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
});
