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
    updateMeetup(state, payload) {
      // eslint-disable-next-line
      let meetup = state.loadedMeetups.find(elem => elem.id === payload.id);
      meetup = Object.assign(meetup, payload);
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
            const meetups = Object.keys(data).map(objectId =>
              ({ ...data[objectId], id: objectId }));
            commit('setLoadedMeetups', meetups);
          }
        });
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = Object.assign({}, payload);
      let id;
      let imageUrl;
      firebase
        .database()
        .ref('meetups')
        .push(meetup)
        .then(data => data.key)
        .then((key) => {
          id = key;
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf('.'));
          return firebase
            .storage()
            .ref(`meetups/${key}.${ext}`)
            .put(payload.image);
        })
        .then((fileData) => {
          imageUrl = fileData.metadata.downloadURLs[0];
          return firebase.database()
            .ref('meetups')
            .child(id)
            .update({ imageUrl });
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl,
            id,
            creatorId: getters.user.id,
          });
        });
    },
    updateMeetup({ commit }, payload) {
      commit('setLoading', true);
      firebase
        .database()
        .ref('/meetups')
        .child(payload.id)
        .update(payload)
        .then(() => {
          commit('setLoading', false);
          commit('updateMeetup', payload);
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
    autoSignIn({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredMeetups: [],
      });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
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
