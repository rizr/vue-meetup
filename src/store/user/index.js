import * as firebase from 'firebase';

export default {
  state: {
    user: null,
  },
  mutations: {
    registerUserForMeetup(state, payload) {
      const id = payload.id;
      if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
        return;
      }
      state.user.registeredMeetups.push(id);
      state.user.fbKeys[id] = payload.fbKey;
    },
    unregisterUserFromMeetup(state, payload) {
      const registeredMeetups = state.user.registeredMeetups;
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1);
      Reflect.deleteProperty(state.user.fbKeys, payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    registerUserForMeetup({ commit, getters }, payload) {
      commit('setLoading', true);
      const user = getters.user;
      firebase
        .database()
        .ref(`/users/${user.id}`)
        .child('/registrations/')
        .push(payload)
        .then((data) => {
          commit('setLoading', false);
          commit('registerUserForMeetup', { id: payload, fbKey: data.key });
        })
        .catch(console.log);
    },
    unregisterUserForMeetup({ commit, getters }, payload) {
      commit('setLoading', true);
      const user = getters.user;
      if (!user.fbKeys) {
        return;
      }
      const fbKey = user.fbKeys[payload];
      firebase
        .database()
        .ref(`/users/${user.id}/registrations/`)
        .child(fbKey)
        .remove()
        .then(() => {
          commit('setLoading', false);
          commit('unregisterUserFromMeetup', payload);
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
            fbKeys: {},
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
            fbKeys: {},
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
        fbKeys: {},
      });
    },
    fetchUserData({ commit, getters }) {
      commit('setLoading', true);
      firebase
        .database()
        .ref(`/users/${getters.user.id}/registrations/`)
        .once('value')
        .then((data) => {
          const dataPairs = data.val();
          const dataPairsKeys = Object.keys(dataPairs);
          const registeredMeetups = [];
          const swappedPairs = {};
          dataPairsKeys.forEach((key) => {
            registeredMeetups.push(dataPairs[key]);
            swappedPairs[dataPairs[key]] = key;
          });
          const updatedUser = {
            id: getters.user.id,
            registeredMeetups,
            fbKeys: swappedPairs,
          };
          commit('setLoading', false);
          commit('setUser', updatedUser);
        });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
