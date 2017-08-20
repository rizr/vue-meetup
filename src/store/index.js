import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [],
    user: null,
    loading: null,
    error: null,
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
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
    loadMeetups({ commit }) {
      commit('setLoading', true);
      firebase
        .database()
        .ref('meetups')
        .once('value')
        .then((response) => {
          commit('setLoading', false);
          const data = response.val();
          if (data) {
            const meetups = Object.keys(data).map(elem => data[elem]);
            commit('setLoadedMeetups', meetups);
          }
        });
    },
    createMeetup({ commit }, payload) {
      const meetup = Object.assign({}, payload);
      firebase
        .database()
        .ref('meetups')
        .push(meetup)
        .then((data) => {
          commit('createMeetup', {
            ...meetup,
            id: data.key,
          });
        });
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
